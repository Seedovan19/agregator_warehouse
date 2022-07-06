import tensorflow as tf
import numpy as np
import os

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

loaded = tf.saved_model.load("export")

test_ratings = {}
test_warehouse_ids = ["1", "2", "3"]
for warehouse_id in test_warehouse_ids:
  test_ratings[warehouse_id] = loaded({
      "query_id": np.array(["63"]),
      "warehouse_id": np.array([warehouse_id])
  })

print("Ratings:")
for title, score in sorted(test_ratings.items(), key=lambda x: x[1], reverse=True):
  print(f"{title}: {score}")