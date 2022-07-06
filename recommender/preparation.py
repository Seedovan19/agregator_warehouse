import json
import numpy as np
import pandas as pd
from math import cos, asin, sqrt, pi
from sklearn.metrics.pairwise import pairwise_distances
from urllib.request import urlopen



warehouse_url = 'http://127.0.0.1:8000/api/warehouses/warehouse-list' # API для получения данных о всех складах в формате JSON 
survey_url = 'http://127.0.0.1:8000/api/warehouses/surveyresult-list' # API для получения данных о всех запросах в формате JSON 

all_warehouse_columns = [
    'storage_conditions.pallet_storage_capacity',
    'storage_conditions.pallet_storage_cost',
    'storage_conditions.pallet_handling_cost',
    'storage_conditions.max_storage_weight',
    'storage_conditions.max_storage_height',
    'storage_conditions.bulky_cargo_storage',
    'features.condition',
    'features.freezer', 
    'features.freezer_size', 
    'features.refrigerator', 
    'features.refrigerator_size', 
    'features.alcohol', 
    'features.pharmacy', 
    'features.food', 
    'features.dangerous',
    'security.security_post',
    'security.all_day_security',
    'security.video_control',
    'security.magnetic_access_locks',
    'security.generator',
    'security.alarm_system',
    'security.fire_system_type',
    'services.transport_services',
    'services.custom',
    'services.crossdock',
    'services.palletization',
    'services.box_pick',
    'working_hours.time_from',
    'working_hours.time_to',
    'working_hours.weekday',
    'working_hours.friday_time_from',
    'working_hours.friday_time_to',
    'working_hours.saturday_time_from',
    'working_hours.saturday_time_to',
    'working_hours.sunday_time_from',
    'working_hours.sunday_time_to',
    'working_hours.break_flag',
    'working_hours.break_from',
    'working_hours.break_to',
    'logistics.leveling_platform',
    'logistics.railways',
    'logistics.parking',
    'logistics.parking_security',
    'logistics.parking_cost',
    'logistics.comment',
    'name',
    'adress',
    'description',
    'warehouse_class',
    'warehouse_variant',
    'long_term_commitment',
    'office_premises',
    'office_premises_square',
    'domestic_premises',
    'integrated',
    'wh_latitude',
    'wh_longitude',
    'owner',
]


columns_bool = [
    #'long_term_commitment', 
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
    #'logistics.leveling_platform',
    #'logistics.railways',
]

warehouse_columns = [
    'wh_latitude', 
    'wh_longitude', 
    'features.condition', 
    'warehouse_class',
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
    #'logistics.leveling_platform',
    #'logistics.railways',
]

columns_class_condition = [
    'warehouse_class',
    'condition',
]

def get_api(url, object_hook=None):
    with urlopen(url) as resource:  # 'with' is important to close the resource after use
        return json.load(resource, object_hook=object_hook)

def download_into_csv():
    data_warehouses = get_api(warehouse_url)
    
    data_warehouses = pd.json_normalize(data_warehouses)
    
    df_warehouses = pd.DataFrame(data_warehouses, columns=all_warehouse_columns, index=data_warehouses.id)
    df_warehouses = df_warehouses.dropna(subset = ['features.pharmacy'])

    df_warehouses.to_csv('csvfile.csv',encoding='utf-8-sig')
    
    return df_warehouses

# расстояние между двумя координатами по формуле гаверсинуса
def distance(lat1, lon1, lat2, lon2):
    p = pi/180
    a = 0.5 - cos((lat2-lat1)*p)/2 + cos(lat1*p) * cos(lat2*p) * (1-cos((lon2-lon1)*p))/2
    return 12742 * asin(sqrt(a))

# Сравниваем класс и условия хранения
def computeClassConditionSimilarity(warehouse, query):
    q1 = abs(warehouse["warehouse_class"] - query["warehouse_class"])
    q2 = abs(warehouse["features.condition"] - query["condition"])
    w1 = 1.2
    w2 = 1
    return np.sqrt((w1*q1*q1)+(w2*q2*q2))

def compare_query_warehouse():
    # Получаем данные всех складов и запросов
    data_warehouses = get_api(warehouse_url)
    data_query = get_api(survey_url)
    
    
    data_warehouses = pd.json_normalize(data_warehouses)
    data_query = pd.json_normalize(data_query)

    n = len(data_warehouses) * len(data_query)
    print('#############################################')
    print('Number of rows')
    print(n)
    print('#############################################\n')
    
    print('#############################################')
    print('Query DataFrame')
    print(data_query)
    print('#############################################\n')
    
    data_warehouses = data_warehouses.dropna(subset = ['features.pharmacy'])
    
    similarity = np.zeros(shape=(n, 7))
    similarity = similarity.astype('object')
    similarity[:,2] = similarity[:,2].astype('str')
    similarity[:,3] = similarity[:,3].astype('str')
    
    i = 0

    for index, row in data_query.iterrows():
        if row["condition"] == 'Freezer-WH':
            row["condition"] = 0
        elif row["condition"] == 'Cold-WH':
            row["condition"] = 1
        elif row["condition"] == 'Regulated':
            row["condition"] = 2 
        elif row["condition"]== 'Heated':
            row["condition"] = 3
        elif row["condition"] == 'Warmed':
            row["condition"] = 4
        elif row["condition"] == 'Non-heated':
            row["condition"] = 5
        elif row["condition"] == 'No value':
            row["condition"] = 10
            
        if row["warehouse_class"] == 'A+':
            row["warehouse_class"] = 1
        elif row["warehouse_class"] == 'A':
            row["warehouse_class"] = 2
        elif row["warehouse_class"] == 'B+':
            row["warehouse_class"] = 3
        elif row["warehouse_class"] == 'B':
            row["warehouse_class"] = 4
        elif row["warehouse_class"] == 'C':
            row["warehouse_class"] = 5
        else:
            row["warehouse_class"] = 10

        for index_wh, row_wh in data_warehouses.iterrows():
            if row_wh["features.condition"] == 'Freezer-WH':
                row_wh["features.condition"] = 0
            elif row_wh["features.condition"] == 'Cold-WH':
                row_wh["features.condition"] = 1
            elif row_wh["features.condition"] == 'Regulated':
                row_wh["features.condition"] = 2 
            elif row_wh["features.condition"]== 'Heated':
                row_wh["features.condition"] = 3
            elif row_wh["features.condition"] == 'Warmed':
                row_wh["features.condition"] = 4
            elif row_wh["features.condition"] == 'Non-heated':
                row_wh["features.condition"] = 5
            elif row_wh["features.condition"] == 'No value':
                row_wh["features.condition"] = 10
                
            if row_wh["warehouse_class"] == 'A+':
                row_wh["warehouse_class"] = 1
            elif row_wh["warehouse_class"] == 'A':
                row_wh["warehouse_class"] = 2
            elif row_wh["warehouse_class"] == 'B+':
                row_wh["warehouse_class"] = 3
            elif row_wh["warehouse_class"] == 'B':
                row_wh["warehouse_class"] = 4
            elif row_wh["warehouse_class"] == 'C':
                row_wh["warehouse_class"] = 5
            else:
                row_wh["warehouse_class"] = 10
            
            
            similarity[i][2] = ''
            similarity[i][3] = ''
            # токенизируем атрибуты запроса и склада
            if row['freezer']:
                similarity[i][2]+='freezer, '
            if row['refrigerator']:
                similarity[i][2]+='refrigerator, '
            if row['alcohol']:
                similarity[i][2]+='alcohol, '
            if row['pharmacy']:
                similarity[i][2]+='pharmacy, '
            if row['food']:
                similarity[i][2]+='food, '
            if row['dangerous']:
                similarity[i][2]+='dangerous, '
            if row['transport_services']:
                similarity[i][2]+='transport_services, '
            if row['custom']:
                similarity[i][2]+='custom, '
            if row['crossdock']:
                similarity[i][2]+='crossdock, '
            if row['palletization']:
                similarity[i][2]+='palletization, '
            if row['box_pick']:
                similarity[i][2]+='box_pick, '
            
            if row_wh['features.freezer']:
                similarity[i][3]+='freezer, '
            if row_wh['features.refrigerator']:
                similarity[i][3]+='refrigerator, '
            if row_wh['features.alcohol']:
                similarity[i][3]+='alcohol, '
            if row_wh['features.pharmacy']:
                similarity[i][3]+='pharmacy, '
            if row_wh['features.food']:
                similarity[i][3]+='food, '
            if row_wh['features.dangerous']:
                similarity[i][3]+='dangerous, '
            if row_wh['services.transport_services']:
                similarity[i][3]+='transport_services, '
            if row_wh['services.custom']:
                similarity[i][3]+='custom, '
            if row_wh['services.crossdock']:
                similarity[i][3]+='crossdock, '
            if row_wh['services.palletization']:
                similarity[i][3]+='palletization, '
            if row_wh['services.box_pick']:
                similarity[i][3]+='box_pick, '
    
            
            # Сравниваем boolean-поля
            
            # row['long_term_commitment'] row_wh['long_term_commitment'] row_wh['logistics.leveling_platform'], row_wh['logistics.railways'] , row['leveling_platform'], row['railways']
            df_survey = pd.DataFrame([[ row['freezer'], row['refrigerator'], row['alcohol'], row['pharmacy'], row['food'], row['dangerous'], row['transport_services'], row['custom'], row['crossdock'], row['palletization'], row['box_pick']]], columns=columns_bool, index=[index])
            df_warehouse = pd.DataFrame([[row_wh['features.freezer'], row_wh['features.refrigerator'], row_wh['features.alcohol'], row_wh['features.pharmacy'], row_wh['features.food'], row_wh['features.dangerous'], row_wh['services.transport_services'], row_wh['services.custom'], row_wh['services.crossdock'], row_wh['services.palletization'], row_wh['services.box_pick']]], columns=columns_bool, index=[index_wh])
            jaccard_similarity = 1 - pairwise_distances(df_warehouse, df_survey, metric = "hamming") #https://stackoverflow.com/questions/37003272/how-to-compute-jaccard-similarity-from-a-pandas-dataframe
            
            similarity[i][0] = row["id"]
            similarity[i][1] = row_wh["id"] # ИЗМЕНЕНО
            similarity[i][4] = computeClassConditionSimilarity(row_wh, row) # euclidean weighted
            similarity[i][5] = jaccard_similarity[0][0] #jaccard
            similarity[i][6] = distance(row_wh["wh_latitude"],row_wh["wh_longitude"], row["wh_lat"], row["wh_lon"]) #haversine
            i+=1
   
    similarity = similarity[~np.all(similarity == 0, axis=1)] # удаляем строки, где только нули
    similarity = np.delete(similarity, np.where(similarity[:,6] > 250), axis=0) # удаляем строки, где расстояние больше 250 км от заданной в запросе точки
    similarity[:,4] = [i/max(similarity[:,4]) for i in similarity[:,4]] # нормализуем столбец с классом и условиями хранения
    similarity[:,4] = (1.2*similarity[:,4] + similarity[:,5]) / 2  # общая похожесть
    similarity = np.delete(similarity, -1, axis=1) # удаляем столбец с расстояниями в киллометрах
    similarity = np.delete(similarity, -1, axis=1) # удаляем столбец с метрикой похожести jaccard, оставляем только общую
    print(similarity[:,2])
    df_result = pd.DataFrame(similarity, columns=['query_id', 'warehouse_id', 'query_features', 'warehouse_features', 'similarity'])
    df_result = df_result.astype({'query_id':'int64', 'warehouse_id':'int64','query_features': 'str', 'warehouse_features': 'str', 'similarity':'float64'})


    print('#############################################')
    print('Similarities')
    print(df_result)
    print('#############################################\n')
    
    df_result.to_csv('ratings.csv',encoding='utf-8-sig', index=False)


    
    #wh_lat_query = str(request.args.get('wh_lat')) 
    #wh_lon_query = str(request.args.get('wh_lon')) 
    #product_type_query = str(request.args.get('product_type')) 
    #fullName_query = str(request.args.get('fullName')) 
    #email_query = str(request.args.get('email')) 
    #mobile_query = str(request.args.get('mobile')) 
    #company_query = str(request.args.get('company')) 
    #palletQuantity_query = str(request.args.get('palletQuantity')) 


    return df_result


compare_query_warehouse()