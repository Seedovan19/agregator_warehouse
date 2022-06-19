from flask import *
import json, time
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import pairwise_distances
from sklearn import preprocessing
import math
from math import cos, asin, sqrt, pi
from urllib.request import urlopen
from flask_cors import CORS, cross_origin

import geojson as gj
import geopy.distance
import networkx as nx
import osmnx as ox
import shapely.geometry as geometry
from scipy.spatial import Delaunay
from shapely.ops import unary_union, polygonize

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
    # 'office_premises', #TODO: этого нет в опроснике
    # 'domestic_premises',
    
    'long_term_commitment', # не критично
    'features.freezer', # средней критичности
    'features.refrigerator', # средней критичности
    # 'features.alcohol', # КРИТИЧНО
    # 'features.pharmacy', # КРИТИЧНО
    'features.food', # не критично
    # 'features.dangerous', # КРИТИЧНО
    'services.transport_services', # не критично
    'services.custom', # не критично
    'services.crossdock', # не критично
    'services.palletization', # не критично
    'services.box_pick', # не критично
    'logistics.leveling_platform', # не критично
    'logistics.railways', # средней критичности

    # 'logistics.parking',
    # 'logistics.parking_security',
    # 'integrated',
]


def get_warehouses(url, object_hook=None):
    with urlopen(url) as resource:  # 'with' is important to close the resource after use
        return json.load(resource, object_hook=object_hook)


def distance(lat1, lon1, lat2, lon2):
    p = pi / 180
    a = 0.5 - cos((lat2 - lat1) * p) / 2 + cos(lat1 * p) * cos(lat2 * p) * (1 - cos((lon2 - lon1) * p)) / 2
    return 12742 * asin(sqrt(a))


# Сравниваем класс и условия хранения
def computeClassConditionSimilarity(warehouse, query):
    q1 = abs(warehouse["warehouse_class"] - query["warehouse_class"].astype(int))
    q2 = abs(warehouse["features.condition"] - query["features.condition"].astype(int))
    w1 = 1
    w2 = 1.2
    return np.sqrt((w1 * q1 * q1) + (w2 * q2 * q2))


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
    data_warehouses = get_warehouses(api_url)
    data_warehouses = pd.json_normalize(data_warehouses)
    data_warehouses = data_warehouses.dropna(subset=['features.pharmacy'])
    n = len(data_warehouses)
    
    print('#############################################')
    print('Number of rows')
    print(n)
    print('#############################################\n')

    df_survey = pd.DataFrame([[long_term_commitment_query, freezer_query, refrigerator_query,
                               food_query, transport_services_query,
                               custom_query, crossdock_query, palletization_query, box_pick_query,
                               leveling_platform_query, railways_query]], columns=columns_bool, index=["survey"])
    exp_survey = pd.Series(
        data={"wh_latitude": wh_lat_query, "wh_longitude": wh_lon_query, "features.condition": condition_query,
              "warehouse_class": warehouse_class_query},
        index=['wh_latitude', 'wh_longitude', 'features.condition', 'warehouse_class'])

    similarities = np.zeros(shape=(n, 5))

    for index, row in data_warehouses.iterrows():
        # сравниваем местоположение самых похожих по всем остальным значениям объектов
        if row["features.condition"] == 'Freezer-WH':
            row["features.condition"] = 0
        elif row["features.condition"] == 'Cold-WH':
            row["features.condition"] = 1
        elif row["features.condition"] == 'Regulated':
            row["features.condition"] = 2
        elif row["features.condition"] == 'Heated':
            row["features.condition"] = 3
        elif row["features.condition"] == 'Warmed':
            row["features.condition"] = 4
        elif row["features.condition"] == 'Non-heated':
            row["features.condition"] = 5
        elif row["features.condition"] == 'No value':
            row["features.condition"] = 10

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
        
        df_warehouse = pd.DataFrame([[row['long_term_commitment'], row['features.freezer'],
                                      row['features.refrigerator'], row['features.food'],
                                      row['services.transport_services'], row['services.custom'],
                                      row['services.crossdock'], row['services.palletization'],
                                      row['services.box_pick'], row['logistics.leveling_platform'],
                                      row['logistics.railways']]], columns=columns_bool, index=[index])


        if (alcohol_query == True and row['features.alcohol'] == True):
            alcohol_coefficient = 1.25
        elif (alcohol_query == True and row['features.alcohol'] == False): 
            alcohol_coefficient = 0.4
        elif (alcohol_query == False and row['features.alcohol'] == False or alcohol_query == False and row['features.alcohol'] == True):
            alcohol_coefficient = 1
        
        if (pharmaceuticals_query == True and row['features.pharmacy'] == True):
            pharma_coefficient = 1.25
        elif (pharmaceuticals_query == True and row['features.pharmacy'] == False): 
            pharma_coefficient = 0.4
        elif (pharmaceuticals_query == False and row['features.pharmacy'] == False or pharmaceuticals_query == False and row['features.pharmacy'] == True):
            pharma_coefficient = 1

        if (dangerous_query == True and row['features.dangerous'] == True):
            dangerous_coefficient = 1.25
        elif (dangerous_query == True and row['features.dangerous'] == False): 
            dangerous_coefficient = 0.4
        elif (dangerous_query == False and row['features.dangerous'] == False or dangerous_query == False and row['features.dangerous'] == True):
            dangerous_coefficient = 1
        
        print(pharma_coefficient)

        jaccard_similarity = 1 - pairwise_distances(df_warehouse, df_survey,
                                                    metric="hamming")  # https://stackoverflow.com/questions/37003272/how-to-compute-jaccard-similarity-from-a-pandas-dataframe
        similarities[index][0] = row["id"]
        similarities[index][1] = computeClassConditionSimilarity(row, exp_survey)  # euclidean weighted
        similarities[index][2] = jaccard_similarity[0][0]
        similarities[index][3] = distance(row["wh_latitude"], row["wh_longitude"], exp_survey["wh_latitude"],
                                          exp_survey["wh_longitude"])  # haversine
        similarities[index][4] = alcohol_coefficient * pharma_coefficient * dangerous_coefficient

    similarities = similarities[~np.all(similarities == 0, axis=1)]  # удаляем строки, где только нули
    similarities = np.delete(similarities, np.where(similarities[:, 3] > 250),
                             axis=0)  # удаляем строки, где расстояние больше 250 км от заданной в запросе точки
    similarities[:, 1] = [i / max(similarities[:, 1]) for i in
                          similarities[:, 1]]  # нормализуем столбец с классом и условиями хранения
    similarities[:, 1] = ((1.2 * similarities[:, 1] + similarities[:, 2]) / 2)*similarities[:,4]  # общая похожесть
    similarities = np.delete(similarities, -1, axis=1)  # удаляем столбец с коэффициентами
    similarities = np.delete(similarities, -1, axis=1)  # удаляем столбец с расстояниями в киллометрах
    similarities = np.delete(similarities, -1,
                             axis=1)  # удаляем столбец с метрикой похожести jaccard, оставляем только общую

    df_result = pd.DataFrame(similarities, columns=['warehouse_id', 'similarity'])
    df_result = df_result.astype({'warehouse_id': 'int64', 'similarity': 'float64'})

    # сортируем по убыванию
    k_pos = similarities[(-similarities)[:, 1].argsort()]

    k_pos = k_pos[0:5]  # берем первые 5 элементов

    print('#############################################')
    print('Sorted similarities\n')
    print(k_pos)
    print('#############################################\n')

    top_recs_indexes = k_pos[:, 0].tolist()
    top_recs_sim = k_pos[:, 1].tolist()

    data_set = {'Indexes': f'{top_recs_indexes}', 'Top_recs': f'{top_recs_sim}', 'Timestamp': time.time()}
    json_dump = json.dumps(data_set)

    return json_dump


if __name__ == ' __main__':
    app.run(port=7777)


@app.route('/isochrone', methods=['GET', 'POST'])
@cross_origin()
def get_isochrone():
    vehicle_query = str(request.args.get('vehicle'))
    lon_query = np.float32(request.args.get('lon'))
    lat_query = np.float32(request.args.get('lat'))
    month_query = int(request.args.get('month'))
    time_query = int(request.args.get('time'))
    time_day_query = int(request.args.get('time_day'))
    speed = 10
    if month_query == 1 :
        speed = speed/1.2
    elif month_query == 2:
        speed = speed/1.3
    elif month_query == 3:
        speed = speed/1.25
    elif month_query == 4:
        speed = speed/1.2
    elif month_query == 5:
        speed = speed
    elif month_query == 6:
        speed = speed/0.94
    elif month_query == 7:
        speed = speed/0.82
    elif month_query == 8:
        speed = speed/0.84
    elif month_query == 9:
        speed = speed/1.04
    elif month_query == 10:
        speed = speed/1.12
    elif month_query == 11:
        speed = speed/1.08
    elif month_query == 12:
        speed = speed/1.4

    if time_day_query > 0 and time_day_query <= 60:
        speed = speed*1.2
    elif time_day_query > 60 and time_day_query <= 300:
        speed = speed*1.5
    elif time_day_query > 300 and time_day_query <= 420:
        speed = speed*1.3
    elif time_day_query > 420 and time_day_query <= 480:
        speed = speed*1.1
    elif time_day_query > 480 and time_day_query <= 600:
        speed = speed*0.7
    elif time_day_query > 600 and time_day_query <= 720:
        speed = speed*0.8
    elif time_day_query > 720 and time_day_query <= 900:
        speed = speed*0.9
    elif time_day_query > 900 and time_day_query <= 1020:
        speed = speed*1
    elif time_day_query > 1020 and time_day_query <= 1230:
        speed = speed*0.7
    elif time_day_query > 1230 and time_day_query <= 1290:
        speed = speed*0.9
    elif time_day_query > 1290 and time_day_query <= 1350:
        speed = speed*1
    elif time_day_query > 1350 and time_day_query <= 1410:
        speed = speed*1.
    elif time_day_query > 1020 and time_day_query <= 1230:
        speed = speed*1.2

    a = Create_isochrone(lat_query, lon_query, time_query, vehicle_query, speed)
    print("УРА")
    json_dump = json.dumps(a)
    return json_dump


def Create_isochrone(lat, lon, time, route, speed, output='geojson'):
    '''
    Main module function. Takes:
        lat, lon of point to build isochrone from,
        time of travel to limit isochrone,
        speed of travel (default is 4.5),
        output format - geojson or shape,
        route type - walk, drive, bike;
    Returns isochrone polygon in geojson or shape.
    '''

    def GenerateIsoPoints(lat, lon, time, speed):

        '''
        Function generates points cloud of isochrone from OSM
        depending on route type.

        Returns list of points.
        '''

        distance = speed * 1000 / 60 * time * 1.5

        streets_graph = ox.graph_from_point((lat, lon), dist=distance, network_type=route, simplify=False)

        center_node = ox.distance.get_nearest_node(streets_graph, (lat, lon), method='euclidean')

        streets_graph.add_node('dummy', osmid=999999999, x=lat, y=lon)
        dummy_length = geopy.distance.geodesic((streets_graph.nodes['dummy']['y'], streets_graph.nodes['dummy']['x']),
                                               (streets_graph.nodes[center_node]['y'],
                                                streets_graph.nodes[center_node]['x'])).m
        streets_graph.add_edge('dummy', center_node, length=dummy_length)

        projected_graph = ox.project_graph(streets_graph)

        travel_speed = speed

        meters_per_minute = travel_speed * 1000 / 60
        for u, v, k, data in projected_graph.edges(data=True, keys=True):
            data['time'] = data['length'] / meters_per_minute

        subgraph = nx.ego_graph(projected_graph, center_node, radius=time, distance='time')
        node_points = [[data['lat'], data['lon']] for node, data in subgraph.nodes(data=True)]
        points = np.array(node_points)
        return points

    def alpha_shape(points, alpha):

        '''
        Function optimizes ishorhone with alpha-shape algorythm and returns polgon
        '''

        if len(points) < 4:
            return geometry.MultiPoint(list(points)).convex_hull

        def add_edge(edges, edge_points, coords, i, j):

            if (i, j) in edges or (j, i) in edges:
                return
            edges.add((i, j))
            edge_points.append(coords[[i, j]])

        coords = np.array([point for point in points])
        tri = Delaunay(coords)
        edges = set()
        edge_points = []

        for ia, ib, ic in tri.simplices:
            pa = coords[ia]
            pb = coords[ib]
            pc = coords[ic]
            a = math.sqrt((pa[0] - pb[0]) ** 2 + (pa[1] - pb[1]) ** 2)
            b = math.sqrt((pb[0] - pc[0]) ** 2 + (pb[1] - pc[1]) ** 2)
            c = math.sqrt((pc[0] - pa[0]) ** 2 + (pc[1] - pa[1]) ** 2)
            s = (a + b + c) / 2.0
            try:
                area = math.sqrt(s * (s - a) * (s - b) * (s - c))
            except ValueError:
                area = 0.0001
            if area == 0:
                area = 0.0001

            circum_r = a * b * c / (4.0 * area)
            if circum_r < 1.0 / alpha:
                add_edge(edges, edge_points, coords, ia, ib)
                add_edge(edges, edge_points, coords, ib, ic)
                add_edge(edges, edge_points, coords, ic, ia)
        m = geometry.MultiLineString(edge_points)
        triangles = list(polygonize(m))
        return unary_union(triangles), edge_points

    iso_points = GenerateIsoPoints(lat, lon, time, speed)
    isochrone = None
    for alpha in range(751, -1, -50):
        try:
            concave_hull, edge_points = alpha_shape(iso_points, alpha=alpha)

            if concave_hull.geom_type == 'MultiPolygon':
                continue

            else:
                if output == 'geojson':
                    isochrone = geometry.polygon.orient(concave_hull, sign=1)
                    return gj.loads(gj.dumps(isochrone))
                elif output == 'shape':
                    return isochrone
        except:
            continue

