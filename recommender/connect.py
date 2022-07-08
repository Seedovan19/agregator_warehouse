from dis import dis
from flask import *
import json
from flask_cors import CORS, cross_origin

# для рекомендательной системы
import os
import tensorflow as tf
import pandas as pd
from math import cos, asin, sqrt, pi
from urllib.request import urlopen

# для изохроны покрытия
import numpy as np
import math
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
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
warehouse_url = 'http://127.0.0.1:8000/api/warehouses/warehouse-list' # API для получения данных о всех складах в формате JSON 

def get_api(url, object_hook=None):
    with urlopen(url) as resource:  # 'with' is important to close the resource after use
        return json.load(resource, object_hook=object_hook)


# &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

# Рекомендательная система для JuniorML Contest. В данной функции с фронта принимаются все параметры запроса.
# Параметры приводятся в вид, который принимает рекомендательная модель.
# Затем производится загрузка обученной, сохраненной заранее модели и она выдает значения "релевантности" пяти складов запросу.

# расстояние между двумя координатами по формуле гаверсинуса
def distance(lat1, lon1, lat2, lon2):
    p = pi/180
    a = 0.5 - cos((lat2-lat1)*p)/2 + cos(lat1*p) * cos(lat2*p) * (1-cos((lon2-lon1)*p))/2
    return 12742 * asin(sqrt(a))

@app.route('/', methods=['GET'])
@cross_origin()
def get_recommendations():
    # получаем данные о всех складах в формате JSON
    data_warehouses = get_api(warehouse_url)

    data_warehouses = pd.json_normalize(data_warehouses)

    # загружаем обученную модель
    loaded = tf.saved_model.load("export")

    # для начала все параметры запроса собираются в общую строку для передачи ее в рекомендательную модель
    query_features = ''
    long_term_commitment_query = str(request.args.get('long_term_commitment'))
    if long_term_commitment_query == 'true':
        query_features += 'long_term, '

    freezer_query = str(request.args.get('freezer'))
    if freezer_query == 'true':
        query_features += 'freezer, '

    refrigerator_query = str(request.args.get('refrigerator'))
    if refrigerator_query == 'true':
        query_features += 'refrigerator, '

    alcohol_query = str(request.args.get('alcohol'))
    if alcohol_query == 'true':
        query_features += 'alcohol, '

    pharmaceuticals_query = str(request.args.get('pharmaceuticals'))
    if pharmaceuticals_query == 'true':
        query_features += 'pharmacy, '

    food_query = str(request.args.get('food'))
    if food_query == 'true':
        query_features += 'food, '

    dangerous_query = str(request.args.get('dangerous'))
    if dangerous_query == 'true':
        query_features += 'dangerous, '

    transport_services_query = str(request.args.get('transport_services'))
    if transport_services_query == 'true':
        query_features += 'transport_services, '

    custom_query = str(request.args.get('custom'))
    if custom_query == 'true':
        query_features += 'custom, '

    crossdock_query = str(request.args.get('crossdock'))
    if crossdock_query == 'true':
        query_features += 'crossdock, '
        
    palletization_query = str(request.args.get('palletization'))
    if palletization_query == 'true':
        query_features += 'palletization, '

    box_pick_query = str(request.args.get('box_pick'))
    if box_pick_query == 'true':
        query_features += 'box_pick, '

    leveling_platform_query = str(request.args.get('leveling_platform'))
    if leveling_platform_query == 'true':
        query_features += 'leveling_platform, '

    railways_query = str(request.args.get('railways'))
    if railways_query == 'true':
        query_features += 'railways, '

    # Температурный режим
    condition_query = str(request.args.get('condition'))
    if condition_query == 'Freezer-WH':
        query_features += 'freezerWH, '
    elif condition_query == 'Cold-WH':
        query_features += 'coldWH, '
    elif condition_query == 'Regulated':
        query_features += 'regulated, '
    elif condition_query == 'Heated':
        query_features += 'heated, '
    elif condition_query == 'Warmed':
        query_features += 'warmed, '
    elif condition_query == 'Non-heated':
        query_features += 'nonHeated, '
    elif condition_query == 'No value':
        query_features += 'noTemperature, '

    # Класс склада
    warehouse_class_query = str(request.args.get('warehouse_class'))
    if warehouse_class_query == 'A+':
        query_features += 'classAplus, '
    elif warehouse_class_query == 'A':
        query_features += 'classA, '
    elif warehouse_class_query == 'B+':
        query_features += 'classBplus, '
    elif warehouse_class_query == 'B':
        query_features += 'classB, '
    elif warehouse_class_query == 'C':
        query_features += 'classC, '
    else:
        warehouse_class_query = 10
        query_features += 'noClass, '

    # Координаты
    wh_lat_query = str(request.args.get('wh_lat'))
    wh_lat_query = np.array([wh_lat_query]).astype(np.float32),

    wh_lon_query = str(request.args.get('wh_lon'))
    wh_lon_query = np.array([wh_lon_query]).astype(np.float32),

    wh_lat_query_arg = wh_lat_query * 100000 # приводим координаты в тот вид, который принимается рекомендательной моделью
    wh_lon_query_arg = wh_lon_query * 100000

    # В модель для получения релевантности склада запросу будут отправлены склады, 
    # которые находятся на расстоянии ближе 300 км к желаемой точке
    warehouse_ids = []
    for _, row_wh in data_warehouses.iterrows():
        # расстояние рассчитывается по формуле гаверсинуса 
        if distance(row_wh["wh_latitude"],row_wh["wh_longitude"], wh_lat_query[0], wh_lon_query[0]) < 300:
            warehouse_ids.append(row_wh["id"])

    results = np.zeros(shape=(len(warehouse_ids), 2))
    i = 0
    for wh_id in warehouse_ids:
        results[i][0] = wh_id
        results[i][1] = loaded({
            "query_features": np.array([query_features]), 
            # "wh_latitude": np.array([5991142.2]).astype(np.float32),
            "wh_latitude": wh_lat_query_arg[0],
            "wh_longitude": wh_lon_query_arg[0],
            "warehouse_id": np.array([wh_id]).astype(str),
        })[0][0]
        i+=1
    print(results)
    json_dump = json.dumps(str(results))
    return json_dump


# &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

if __name__ == ' __main__':
    app.run(port=7777)


# Построение изохроны покрытия склада для доставки транспортом (другой проект)
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

