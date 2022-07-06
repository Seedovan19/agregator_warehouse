from flask import *
import json
from flask_cors import CORS, cross_origin

# для рекомендательной системы
import os
import tensorflow as tf
import tensorflow_recommenders as tfrs

# для изохроны покрытия
import numpy as np
from urllib.request import urlopen
import math
from math import cos, asin, sqrt, pi
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


@app.route('/', methods=['GET'])
@cross_origin()
def get_recommendations():
    loaded = tf.saved_model.load("export")
    arr = loaded({"query_features": np.array(["palletization"]), "warehouse_id": np.array(["10"])}).numpy()
    json_dump = json.dumps(str(arr[0][0]))
    return json_dump

if __name__ == ' __main__':
    app.run(port=7777)

# Построение изохроны покрытия склада для доставки транспортом
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

