from flask import *
import json, time
import numpy as np
import pandas as pd
import scipy
import scipy.spatial
import math
from urllib.request import urlopen
from flask_cors import CORS, cross_origin


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


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
@cross_origin()
def get_recommendations():
    user_query = str(request.args.get('user')) #/recommendations/?user=USER_NAME


    # boolean values
    long_term_commitment_query = str(request.args.get('long_term_commitment')) 
    if (long_term_commitment_query == 'false'):
        long_term_commitment_query = False
    elif (long_term_commitment_query == 'true'):
        long_term_commitment_query = True
    
    freezer_query = str(request.args.get('freezer')) 
    if (freezer_query == 'false'):
        freezer_query = False
    elif (freezer_query == 'true'):
        freezer_query = True

    refrigerator_query = str(request.args.get('refrigerator')) 
    if (refrigerator_query == 'false'):
        refrigerator_query = False
    elif (refrigerator_query == 'true'):
        refrigerator_query = True

    alcohol_query = str(request.args.get('alcohol')) 
    if (alcohol_query == 'false'):
        alcohol_query = False
    elif (alcohol_query == 'true'):
        alcohol_query = True
        
    pharmaceuticals_query = str(request.args.get('pharmaceuticals')) 
    if (pharmaceuticals_query == 'false'):
        pharmaceuticals_query = False
    elif (pharmaceuticals_query == 'true'):
        pharmaceuticals_query = True
        
    food_query = str(request.args.get('food')) 
    if (food_query == 'false'):
        food_query = False
    elif (food_query == 'true'):
        food_query = True

    dangerous_query = str(request.args.get('dangerous')) 
    if (dangerous_query == 'false'):
        dangerous_query = False
    elif (dangerous_query == 'true'):
        dangerous_query = True

    transport_services_query = str(request.args.get('transport_services')) 
    if (transport_services_query == 'false'):
        transport_services_query = False
    elif (transport_services_query == 'true'):
        transport_services_query = True

    custom_query = str(request.args.get('custom')) 
    if (custom_query == 'false'):
        custom_query = False
    elif (custom_query == 'true'):
        custom_query = True

    crossdock_query = str(request.args.get('crossdock')) 
    if (crossdock_query == 'false'):
        crossdock_query = False
    elif (crossdock_query == 'true'):
        crossdock_query = True

    palletization_query = str(request.args.get('palletization')) 
    if (palletization_query == 'false'):
        palletization_query = False
    elif (palletization_query == 'true'):
        palletization_query = True

    box_pick_query = str(request.args.get('box_pick')) 
    if (box_pick_query == 'false'):
        box_pick_query = False
    elif (box_pick_query == 'true'):
        box_pick_query = True

    leveling_platform_query = str(request.args.get('leveling_platform')) 
    if (leveling_platform_query == 'false'):
        leveling_platform_query = False
    elif (leveling_platform_query == 'true'):
        leveling_platform_query = True
        
    railways_query = str(request.args.get('railways')) 
    if (railways_query == 'false'):
        railways_query = False
    elif (railways_query == 'true'):
        railways_query = True

    
    # Температурный режим
    condition_query = str(request.args.get('condition')) 
    if condition_query == 'Regulated':
        condition_query = 0 
    elif condition_query == 'Heated':
        condition_query = 1
    elif condition_query == 'Warmed':
        condition_query = 2
    elif condition_query == 'Non-heated':
        condition_query = 3
    elif condition_query == 'Cold-WH':
        condition_query = 4
    elif condition_query == 'Freezer-WH':
        condition_query = 5
    elif condition_query == 'No value':
        condition_query = 10
    
    # Класс склада
    warehouse_class_query = str(request.args.get('warehouse_class')) 
    if warehouse_class_query == 'A+':
        warehouse_class_query = 1
    elif warehouse_class_query == 'A':
        warehouse_class_query = 2
    elif warehouse_class_query == 'B':
        warehouse_class_query = 3
    elif warehouse_class_query == 'C':
        warehouse_class_query = 4
    elif warehouse_class_query == 'D':
        warehouse_class_query = 5
    else:
        warehouse_class_query = 10

    # Координаты
    wh_lat_query = str(request.args.get('wh_lat')) 
    wh_lat_query = float(wh_lat_query)

    wh_lon_query = str(request.args.get('wh_lon')) 
    wh_lon_query = float(wh_lon_query)


    product_type_query = str(request.args.get('product_type')) 
    palletQuantity_query = str(request.args.get('palletQuantity')) 


    # Получаю данные всех складов
    data = get_warehouses(api_url)
    dataset = pd.json_normalize(data["results"])
    n = data["count"]
    df_warehouses_bool = pd.DataFrame(dataset, columns=columns_bool, index=dataset.id-1)

    df_survey = pd.DataFrame([[long_term_commitment_query, freezer_query, refrigerator_query, alcohol_query, pharmaceuticals_query, food_query, dangerous_query, transport_services_query, custom_query, crossdock_query, palletization_query, box_pick_query, leveling_platform_query, railways_query]], columns=columns_bool, index=["survey"])

    similarities = np.zeros(shape=(data["count"], 2))


    # Записываю эвклидово расстояние между каждым объектом и опросником
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
    

    exp_survey = pd.Series(data = {"wh_lon": wh_lon_query, "wh_lat": wh_lat_query, "features.condition": condition_query, "warehouse_class": warehouse_class_query}, index = ['wh_lon', 'wh_lat', 'features.condition', 'warehouse_class'])
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
    top_recs_indexes = [x+1 for x in top_recs_indexes]


    top_recs_sim = k_pos[:,1].tolist()
    
    data_set = {'Indexes': f'{top_recs_indexes}', 'Top_recs': f'{top_recs_sim}', 'Timestamp': time.time()}
    json_dump = json.dumps(data_set)

    return json_dump
    

if __name__ == ' __main__':
    app.run(port=7777)