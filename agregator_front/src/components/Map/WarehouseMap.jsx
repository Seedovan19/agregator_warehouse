import React from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMediaQuery } from '@material-ui/core';
import useStyles from './styles'
import L from 'leaflet';

const iconMarker = new L.Icon({
    iconUrl: require('./markerWithShadow.png'),
    iconRetinaUrl: require('./markerWithShadow.png'),
    popupAnchor:  [-1, -5],
    iconSize: new L.Point(33, 33)
});

const iconMarkerSelected = new L.Icon({
    iconUrl: require('./markerSelectedWithShadow.png'),
    iconRetinaUrl: require('./markerSelectedWithShadow.png'),
    popupAnchor:  [-1, -5],
    iconSize: new L.Point(33, 33)
});

const WarehouseMap = ({ warehouses, setChildClicked }) => {
    const classes = useStyles();
    const isMobile = useMediaQuery('(min-width:600px)')


    return  (
        <div className={classes.mapContainer}>
            <LeafletMap 
                style={{height: "100%", width: "100%", borderRadius: "10px", zIndex: 0}} 
                center={[59.9386, 30.3141]} 
                zoom={13}
            >
                { warehouses?.map((warehouse, i) => (
                    warehouse.wh_latitude !== 0 &&
                        <Marker
                            icon={iconMarker}
                            key={i}
                            position={[Number(warehouse.wh_latitude), Number(warehouse.wh_longitude)]}
                            eventHandlers={{
                                click: (child) => {
                                    setChildClicked(child.latlng)
                                    child.target.openPopup();
                                },
                                mouseover: (child) => {
                                    child.target.setIcon(iconMarkerSelected)

                                },
                                mouseout: (child) => {
                                    child.target.setIcon(iconMarker)
                                }
                            }}
                        > 
                        <Popup>
                            {warehouse.adress}
                        </Popup>
                        </Marker>
                )) }
                
                <TileLayer

                    url="https://api.mapbox.com/styles/v1/seedovan/cl418ry37003e14rihe9tdrxa/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2VlZG92YW4iLCJhIjoiY2wwY3M5MDJtMDI4aTNjcDkyem9hdnI4YiJ9.G7t_vQ3A7RlXG6zMx__-mg"
                    attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>"
                />
            </LeafletMap>
        </div>
    )
}

export default WarehouseMap;