from flask import *
import json, time
import numpy as np
import pandas as pd
import scipy
import scipy.spatial
from sklearn.metrics.pairwise import pairwise_distances
import math
from urllib.request import urlopen
from flask_cors import CORS, cross_origin



app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


api_url = 'http://127.0.0.1:8000/api/warehouses/warehouse-list'
columns_bool = [
    # 'security.security_post',
    # 'security.all_day_security',
    # 'security.video_control',
    # 'security.magnetic_access_locks',
    # 'security.generator',
    # 'security.alarm_system',
    # 'security.fire_system_type',
    #'office_premises', #TODO: этого нет в опроснике
    #'domestic_premises', 
    'long_term_commitment', 
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
    # 'logistics.parking',
    # 'logistics.parking_security',
    # 'integrated',
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
    
    # boolean values
    # office_premises_query = str(request.args.get('office_premises')) TODO: Добавить
    # office_premises_query = False if office_premises_query == 'false' else True

    long_term_commitment_query = str(request.args.get('long_term_commitment')) 
    long_term_commitment_query = False if long_term_commitment_query == 'false' else True

    freezer_query = str(request.args.get('freezer')) 
    freezer_query = False if freezer_query == 'false' else True

    refrigerator_query = str(request.args.get('refrigerator')) 
    refrigerator_query = False if refrigerator_query == 'false' else True

    alcohol_query = str(request.args.get('alcohol')) 
    alcohol_query = False if alcohol_query == 'false' else True
        
    pharmaceuticals_query = str(request.args.get('pharmaceuticals')) 
    pharmaceuticals_query = False if pharmaceuticals_query == 'false' else True
        
    food_query = str(request.args.get('food')) 
    food_query = False if food_query == 'false' else True
    
    dangerous_query = str(request.args.get('dangerous')) 
    dangerous_query = False if dangerous_query == 'false' else True

    transport_services_query = str(request.args.get('transport_services')) 
    transport_services_query = False if transport_services_query == 'false' else True

    custom_query = str(request.args.get('custom')) 
    custom_query = False if custom_query == 'false' else True

    crossdock_query = str(request.args.get('crossdock')) 
    crossdock_query = False if crossdock_query == 'false' else True

    palletization_query = str(request.args.get('palletization')) 
    palletization_query = False if palletization_query == 'false' else True

    box_pick_query = str(request.args.get('box_pick')) 
    box_pick_query = False if box_pick_query == 'false' else True

    leveling_platform_query = str(request.args.get('leveling_platform')) 
    leveling_platform_query = False if leveling_platform_query == 'false' else True
        
    railways_query = str(request.args.get('railways')) 
    railways_query = False if railways_query == 'false' else True

    
    # Температурный режим
    condition_query = str(request.args.get('condition')) 
    if condition_query == 'Freezer-WH':
        condition_query = 0
    elif condition_query == 'Cold-WH':
        condition_query = 1
    elif condition_query == 'Regulated':
        condition_query = 2 
    elif condition_query == 'Heated':
        condition_query = 3
    elif condition_query == 'Warmed':
        condition_query = 4
    elif condition_query == 'Non-heated':
        condition_query = 5
    elif condition_query == 'No value':
        condition_query = 10
    
    # Класс склада
    warehouse_class_query = str(request.args.get('warehouse_class')) 
    if warehouse_class_query == 'A+':
        warehouse_class_query = 1
    elif warehouse_class_query == 'A':
        warehouse_class_query = 2
    elif warehouse_class_query == 'B+':
        warehouse_class_query = 3
    elif warehouse_class_query == 'B':
        warehouse_class_query = 4
    elif warehouse_class_query == 'C':
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
    dataset = pd.json_normalize(data)
    n = len(data)
    df_warehouses_bool = pd.DataFrame(dataset, columns=columns_bool, index=dataset.id)
    df_warehouses_bool = df_warehouses_bool.dropna()
    df_survey = pd.DataFrame([[long_term_commitment_query, freezer_query, refrigerator_query, alcohol_query, pharmaceuticals_query, food_query, dangerous_query, transport_services_query, custom_query, crossdock_query, palletization_query, box_pick_query, leveling_platform_query, railways_query]], columns=columns_bool, index=["survey"])
    similarities = np.zeros(shape=(n, 2))

    # Записываю jaccard расстояние между каждым объектом и опросником
    for index, _ in df_warehouses_bool.iterrows():
        row = pd.DataFrame(df_warehouses_bool, columns=columns_bool, index=[index])
        jaccard_similarity = 1 - pairwise_distances(row, df_survey, metric = "hamming") #https://stackoverflow.com/questions/37003272/how-to-compute-jaccard-similarity-from-a-pandas-dataframe
        similarities[index][0] = index
        similarities[index][1] = jaccard_similarity[0][0]

    similarities = similarities[~np.all(similarities == 0, axis=1)] #удаляем строки, где только нули

    # сортируем по возрастанию эвклидовых расстояний и берем только индексы полученных значений
    k = similarities[similarities[:, 1].argsort()]
    # bool_closest_indexes = k[:,0].tolist()
    print(k)
    
    exp_survey = pd.Series(data = {"wh_lon": wh_lon_query, "wh_lat": wh_lat_query, "features.condition": condition_query, "warehouse_class": warehouse_class_query}, index = ['wh_lon', 'wh_lat', 'features.condition', 'warehouse_class'])
    exp_similarity = np.zeros(shape=(n, 2))

    df_warehouses_class_cond_pos = pd.DataFrame(dataset, columns=["wh_lon", "wh_lat", "features.condition", "warehouse_class"], index=dataset.id)
    df_warehouses_class_cond_pos = df_warehouses_class_cond_pos.dropna()

    i = 0
    for index, row in df_warehouses_class_cond_pos.iterrows():
        # сравниваем местоположение самых похожих по всем остальным значениям объектов
        # TODO: проработать этот момент с регулируемой температурой
        if condition_query == 'Freezer-WH':
            condition_query = 0
        elif condition_query == 'Cold-WH':
            condition_query = 1
        elif condition_query == 'Regulated':
            condition_query = 2 
        elif condition_query == 'Heated':
            condition_query = 3
        elif condition_query == 'Warmed':
            condition_query = 4
        elif condition_query == 'Non-heated':
            condition_query = 5
        elif condition_query == 'No value':
            condition_query = 10
            
        if warehouse_class_query == 'A+':
            warehouse_class_query = 1
        elif warehouse_class_query == 'A':
            warehouse_class_query = 2
        elif warehouse_class_query == 'B+':
            warehouse_class_query = 3
        elif warehouse_class_query == 'B':
            warehouse_class_query = 4
        elif warehouse_class_query == 'C':
            warehouse_class_query = 5
        else:
            warehouse_class_query = 10

        exp_similarity[i][0] = index
        exp_similarity[i][1] = computeConditionSimilarity(row, exp_survey) * computeClassSimilarity(row, exp_survey) * computePositionSimilarity(row, exp_survey)
        i = i+1
    
    # сортируем по убыванию
    k_pos = exp_similarity[(-exp_similarity)[:, 1].argsort()]
    # top_recs_indexes = k_pos[:,0].tolist()
    # top_recs_indexes = [x+1 for x in top_recs_indexes]

    top_recs_sim = k_pos[:,1].tolist()
    
    data_set = {'Indexes': f'{top_recs_indexes}', 'Top_recs': f'{top_recs_sim}', 'Timestamp': time.time()}
    json_dump = json.dumps(data_set)

    return json_dump
    

if __name__ == ' __main__':
    app.run(port=7777)

@app.route('/isochrone', methods=['GET', 'POST'])
@cross_origin()
def get_isochrone():
    vehicle_query = str(request.args.get('vehicle')) #/isochrone/?vehicle=truck
    a = f'{vehicle_query}'
    json_dump = json.dumps(a)
    return json_dump