from flask import *
import json, time
import numpy as np
import pandas as pd
import scipy
import scipy.spatial
import math
from urllib.request import urlopen

app = Flask(__name__)


api_url = 'http://127.0.0.1:8000/api/warehouses/warehouse-list'
columns_bool = [
    'long_term_commitment',  #TODO: возможно, долгосрочное хранение надо считать по-другому
    'features.freezer', 
    'features.refrigerator', 
    'features.alcohol', 
    'features.pharmacy', 
    'features.food', 
    'features.dangerous',
    'services.transport_services',
    'services.custom',
    'services.crossdock',
    'services.palletization',
    'services.box_pick',
    'logistics.leveling_platform',
    'logistics.railways',
]
columns_position = [
    'wh_lon', 
    'wh_lat', 
]


def get_warehouses(url, object_hook=None):
    with urlopen(url) as resource:  # 'with' is important to close the resource after use
        return json.load(resource, object_hook=object_hook)


# exp similarity
def computePositionSimilarity(position1, position2):
    diff_lon = abs(position1.wh_lon - position2.wh_lon)
    diff_lat = abs(position1.wh_lat - position2.wh_lat)
    sim_lon = math.exp(-diff_lon / 1.0)
    sim_lat = math.exp(-diff_lat / 1.0)
    sim = sim_lon * sim_lat
    return sim


#TODO: exp similarity + перевести классы в цифры
def computeClassSimilarity (class1, class2):
    diff = abs(class1.warehouse_class - class2.warehouse_class)
    sim = math.exp(-diff / 5.0)
    return sim


def computeGenreSimilarity(warehouse1, warehouse2, genres):
    genres1 = genres[warehouse1]
    genres2 = genres[warehouse2]
    sumxx, sumxy, sumyy = 0, 0, 0
    for i in range(len(genres1)):
        x = genres1[i]
        y = genres2[i]
        sumxx += x * x
        sumyy += y * y
        sumxy += x * y
    
    return sumxy/math.sqrt(sumxx*sumyy)


@app.route('/', methods=['GET'])
def home_page():
    data_set = {'Page': 'Home', 'Message': 'Success home page', 'Timestamp': time.time()}
    json_dump = json.dumps(data_set)

    return json_dump


@app.route('/recommendations/', methods=['GET'])
def get_recommendations():
    user_query = str(request.args.get('user')) #/recommendations/?user=USER_NAME

    # Получаю данные всех складов
    data = get_warehouses(api_url)
    dataset = pd.json_normalize(data["results"])
    n = data["count"]
    df_warehouses_bool = pd.DataFrame(dataset, columns=columns_bool, index=dataset.id-1)

    # Создаю искусственые данные из опросника
    # TODO: сделать получение и расшифровку данных опросника
    df_survey = pd.DataFrame([[True, True, True, True, True, True, True, True, True, True, True, True, True, True]], columns=columns_bool, index=["survey"])
    
    similarities = np.zeros(shape=(data["count"], 2))


    # Записываю эвклидовое расстояние между каждым объектом и опросником
    for index, _ in df_warehouses_bool.iterrows():
        row = pd.DataFrame(df_warehouses_bool, columns=columns_bool, index=[index])
        euclidean = scipy.spatial.distance.cdist(row, df_survey, metric='euclidean')
        similarities[index][0] = index
        similarities[index][1] = euclidean[0][0]
    
    # отсекает 50% значений (от 5 элементов)
    if data["count"] <= 5:
        n_after_bool = n
    elif (data["count"] > 5 and data["count"] <= 10):
        n_after_bool = data["count"]
    else:
        n_after_bool = round(n*0.5)
    
    # сортируем по возрастанию эвклидовых расстояний
    k = similarities[similarities[:, 1].argsort()]
    k = k[:n_after_bool]

    bool_closest_indexes = k[:,0].tolist()
    
    ser_survey = pd.Series(data = {"wh_lon": 59.992402, "wh_lat": 30.402915}, index = ['wh_lon', 'wh_lat'])
    position_similarity = np.zeros(shape=(data["count"], 2))

    df_warehouses_position = pd.DataFrame(dataset, columns=columns_position, index=dataset.id-1)
    i = 0
    for index, row in df_warehouses_position.iterrows():
        if index in bool_closest_indexes:
            # сравниваем местоположение самых похожих по всем остальным значениям объектов
            position_similarity[i][0] = index
            position_similarity[i][1] = computePositionSimilarity(row, ser_survey)
            i = i+1
    
    # отсекает 50% значений (от 5 элементов)
    if len(bool_closest_indexes) <= 5:
        n_after_pos = n_after_bool
    elif (len(bool_closest_indexes) > 5 and len(bool_closest_indexes) <= 10):
        n_after_pos = len(bool_closest_indexes)
    else:
        n_after_pos = round(n*0.5)
    
    # сортируем по убыванию
    k_pos = position_similarity[(-position_similarity)[:, 1].argsort()]
    k_pos = k_pos[:n_after_pos]
    
    
    exp_survey = pd.Series(data = {"warehouse_class": 1}, index = ['warehouse_class'])
    class_similarity = np.zeros(shape=(data["count"], 2))
    i = 0

    df_warehouses_class = pd.DataFrame(dataset, columns=["warehouse_class"], index=dataset.id-1)
    for index, _ in df_warehouses_position.iterrows():
        if df_warehouses_class.loc[index].warehouse_class == 'A+':
            df_warehouses_class.loc[index].warehouse_class = 1
        elif df_warehouses_class.loc[index].warehouse_class == 'A':
            df_warehouses_class.loc[index].warehouse_class = 2
        elif df_warehouses_class.loc[index].warehouse_class == 'B':
            df_warehouses_class.loc[index].warehouse_class = 3
        elif df_warehouses_class.loc[index].warehouse_class == 'C':
            df_warehouses_class.loc[index].warehouse_class = 4
        elif df_warehouses_class.loc[index].warehouse_class == 'D':
            df_warehouses_class.loc[index].warehouse_class = 5
        else:
            df_warehouses_class.loc[index].warehouse_class = 10
        
        class_similarity[i][0] = index
        class_similarity[i][1] = computeClassSimilarity(df_warehouses_class.loc[index], exp_survey)
        i+=1


    # перевести в цифры и посчитать exp расстояния
    df_warehouses_condition = pd.DataFrame(dataset, columns=["features.condition"], index=dataset.id-1)
    for index, row in df_warehouses_condition.iterrows():
        if row["features.condition"] == 'Heated':
            row["features.condition"] = 1
    

    data_set = {'Page': 'Home', 'Message': f'Successfully got the request for {user_query}: {k_pos}', 'Timestamp': time.time()}
    json_dump = json.dumps(data_set)

    print(df_warehouses_condition)
    return json_dump
    

if __name__ == ' __main__':
    app.run(port=7777)
    