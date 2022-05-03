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


def get_warehouses(url, object_hook=None):
    with urlopen(url) as resource:  # 'with' is important to close the resource after use
        return json.load(resource, object_hook=object_hook)


def parse_survey_results():
    i = 0


def computePositionSimilarity(position1, position2):
    diff_lon = abs(position1.wh_lon - position2.wh_lon)
    diff_lat = abs(position1.wh_lat - position2.wh_lat)
    sim_lon = math.exp(-diff_lon / 1.0)
    sim_lat = math.exp(-diff_lat / 1.0)
    sim = sim_lon * sim_lat
    return sim


def computeClassSimilarity(class1, class2):
    diff = abs(class1["warehouse_class"] - class2["warehouse_class"])
    sim = math.exp(-diff / 5.0)
    return sim


def computeConditionSimilarity(condition1, condition2):
    diff = abs(condition1["features.condition"] - condition2["features.condition"])
    sim = math.exp(-diff / 5.0)
    return sim


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
    
    # сортируем по возрастанию эвклидовых расстояний, отсекаем значения и берем только индексы полученных значений
    k = similarities[similarities[:, 1].argsort()]
    k = k[:n_after_bool]
    bool_closest_indexes = k[:,0].tolist()
    
    exp_survey = pd.Series(data = {"wh_lon": 59.992402, "wh_lat": 30.402915, "features.condition": 2, "warehouse_class": 1}, index = ['wh_lon', 'wh_lat', 'features.condition', 'warehouse_class'])
    exp_similarity = np.zeros(shape=(data["count"], 2))

    df_warehouses_class_cond_pos = pd.DataFrame(dataset, columns=["wh_lon", "wh_lat", "features.condition", "warehouse_class"], index=dataset.id-1)

    i = 0
    for index, row in df_warehouses_class_cond_pos.iterrows():
        if index in bool_closest_indexes:
            # сравниваем местоположение самых похожих по всем остальным значениям объектов
            # TODO: проработать этот момент с регулируемой температурой
            if row["features.condition"] == 'Regulated':
                row["features.condition"] = 0 
            if row["features.condition"] == 'Heated':
                row["features.condition"] = 1
            if row["features.condition"] == 'Warmed':
                row["features.condition"] = 2
            if row["features.condition"] == 'Non-heated':
                row["features.condition"] = 3
            if row["features.condition"] == 'Cold-WH':
                row["features.condition"] = 4
            if row["features.condition"] == 'Freezer-WH':
                row["features.condition"] = 5
            if row["features.condition"] == 'No value':
                row["features.condition"] = 10
            
            if row["warehouse_class"] == 'A+':
                row["warehouse_class"] = 1
            elif row["warehouse_class"]== 'A':
                row["warehouse_class"] = 2
            elif row["warehouse_class"] == 'B':
                row["warehouse_class"] = 3
            elif row["warehouse_class"] == 'C':
                row["warehouse_class"] = 4
            elif row["warehouse_class"] == 'D':
                row["warehouse_class"] = 5
            else:
                row["warehouse_class"] = 10

            exp_similarity[i][0] = index
            exp_similarity[i][1] = computeConditionSimilarity(row, exp_survey) * computeClassSimilarity(row, exp_survey) * computePositionSimilarity(row, exp_survey)
            i = i+1

    
    # сортируем по убыванию
    k_pos = exp_similarity[(-exp_similarity)[:, 1].argsort()]
    k_pos = k_pos[:5]
    top_recs_indexes = k_pos[:,0].tolist()
    top_recs_sim = k_pos[:,1].tolist()
    
    data_set = {'Indexes': f'{top_recs_indexes}', 'Message': f'Successfully got the request for {user_query}: {top_recs_sim}', 'Timestamp': time.time()}
    json_dump = json.dumps(data_set)

    print(k_pos)
    return json_dump
    

if __name__ == ' __main__':
    app.run(port=7777)
