# TensorFlow Recommender
import os


import numpy as np
import pandas as pd
import tensorflow as tf
import tensorflow_recommenders as tfrs
from matplotlib import pyplot as plt


epochs = 16
learning_rate = 0.000001
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'


# Получаем подготовленный набор данных
df = pd.read_csv('./ratings.csv')
df['query_id'] = df['query_id'].astype(bytes)
df['warehouse_id'] = df['warehouse_id'].astype(bytes)

# Замена NaN значений на пустую строку
df.fillna(value='', inplace=True)


ratings = tf.data.Dataset.from_tensor_slices(dict(df)).\
    map(lambda x:{
    "query_features": x["query_features"],
    "warehouse_id": x["warehouse_id"],
    "similarity": x["similarity"]
})

query_features = ratings.map(lambda x: x["query_features"])

tf.random.set_seed(42)
shuffled = ratings.shuffle(100, seed=42, reshuffle_each_iteration=False)

train = shuffled.take(10)
test = shuffled.skip(10).take(20)

warehouse_id_lookup = tf.keras.layers.StringLookup()
warehouse_id_lookup.adapt(ratings.map(lambda x: x["warehouse_id"]))

class QueryModel(tf.keras.Model):
  
  def __init__(self):
    super().__init__()

    max_tokens = 10_000

    self.query_features_vectorizer = tf.keras.layers.TextVectorization(
        max_tokens=max_tokens)

    self.query_features_embedding = tf.keras.Sequential([
      self.query_features_vectorizer,
      tf.keras.layers.Embedding(max_tokens, 32, mask_zero=True),
      tf.keras.layers.GlobalAveragePooling1D(),
    ])

    self.query_features_vectorizer.adapt(query_features)

  def call(self, inputs):
    # Take the input dictionary, pass it through each input layer,
    # and concatenate the result.
    return tf.concat([
        self.query_features_embedding(inputs["query_features"]),
    ], axis=1)


query_model = QueryModel()

query_model.query_features_embedding.layers[0].adapt(
    ratings.map(lambda x: x["query_features"]))


class WarehouseModel(tf.keras.Model):
  
  def __init__(self):
    super().__init__()

    self.warehouse_id_embedding = tf.keras.Sequential([
      warehouse_id_lookup,
      tf.keras.layers.Embedding(warehouse_id_lookup.vocabulary_size(), 32)
    ])

  def call(self, inputs):
    return tf.concat([
        self.warehouse_id_embedding(inputs["warehouse_id"]),
    ], axis=1)

warehouse_model = WarehouseModel()

warehouse_model.warehouse_id_embedding.layers[0].adapt(
    ratings.map(lambda x: x["warehouse_id"]))


class RatingsModel(tfrs.models.Model):

  def __init__(self, deep_layer_sizes):
    super().__init__()

    # Модели запросов и складов
    self.query_model = tf.keras.Sequential([
      QueryModel(),
      tf.keras.layers.Dense(32)
    ])
    self.candidate_model = tf.keras.Sequential([
      WarehouseModel(),
      tf.keras.layers.Dense(32)
    ])

    # В модель передается количество нейронов в слоях и количество слоев
    self._deep_layers = [tf.keras.layers.Dense(layer_size, activation="relu")
        for layer_size in deep_layer_sizes]

    # Слой, который выдает результат
    self._logit_layer = tf.keras.layers.Dense(1)

    # Задаем задание модели, функцию потерь
    self.task = tfrs.tasks.Ranking(
      loss=tf.keras.losses.MeanSquaredError(),
      metrics=[tf.keras.metrics.RootMeanSquaredError("RMSE")]
    )

  def call(self, features):
    # Берем параметры запроса и передаем их в модель запросов.
    query_embeddings = self.query_model({
        "query_features": features["query_features"],
    })

    # Берем параметры складов и передаем их в модель складов.
    warehouse_embeddings = self.candidate_model({
        "warehouse_id": features["warehouse_id"],
    })

    x = tf.concat([
        query_embeddings,
        warehouse_embeddings
    ], axis=1)
    
    # Построение нейронной сети для глубокого обучения
    for deep_layer in self._deep_layers:
      x = deep_layer(x)

    return (
        # Применяем многослойную модель для выдачи рейтингов для слоев параметров запроса и склада
        self._logit_layer(x)
    )

  def compute_loss(self, features, training=False):
    labels = features.pop("similarity")
    
    rating_predictions = self(features)

    # We compute the loss for each task.
    rating_loss = self.task(
        labels=labels,
        predictions=rating_predictions,
    )
    return rating_loss


cached_train = train.shuffle(10).batch(5).cache()
cached_test = test.batch(5).cache()
print(cached_test.__len__())


def run_models(deep_layer_sizes, num_runs=1):
  models = []
  rmses = []

  for i in range(num_runs):
    model = RatingsModel(deep_layer_sizes=deep_layer_sizes)

    model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate))
    models.append(model)

    history = model.fit(cached_train, epochs=epochs, verbose=False)
    pd.DataFrame(history.history).plot(figsize=(8,5))
    plt.show()
    metrics = model.evaluate(cached_test, return_dict=True)
    print(metrics)
    rmses.append(metrics["RMSE"])

  mean, stdv = np.average(rmses), np.std(rmses)

  return {"model": models, "mean": mean, "stdv": stdv}

dcn_result = run_models(deep_layer_sizes=[256, 64, 32])


print("DCN RMSE mean: {:.4f}, stdv: {:.4f}".format(
    dcn_result["mean"], dcn_result["stdv"]))


model = dcn_result["model"][0]

tf.saved_model.save(model, "export")