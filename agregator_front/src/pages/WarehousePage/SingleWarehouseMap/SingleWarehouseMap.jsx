import React from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Tooltip, Popup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMediaQuery } from '@material-ui/core';
import L from 'leaflet';
import useStyles from './styles'


const iconMarker = new L.Icon({
    iconUrl: require('../../../components/Map/markerWithShadow.png'),
    iconRetinaUrl: require('../../../components/Map/markerWithShadow.png'),
    popupAnchor:  [-1, -5],
    iconSize: new L.Point(33, 33)
});

const iconMarkerSelected = new L.Icon({
    iconUrl: require('../../../components/Map/markerSelectedWithShadow.png'),
    iconRetinaUrl: require('../../../components/Map/markerSelectedWithShadow.png'),
    popupAnchor:  [-1, -5],
    iconSize: new L.Point(33, 33)
});

const SingleWarehouseMap = ({ warehouse, isoData }) => {
    const classes = useStyles();
    const isMobile = useMediaQuery('(min-width:600px)')

    return  (
        <div className={classes.mapContainer}>
            <LeafletMap
                style={{height: "50vh", width: "100%"}} 
                center={[Number(warehouse.wh_latitude), Number(warehouse.wh_longitude)]} 
                zoom={13}
            >
                <TileLayer
                    url="https://api.mapbox.com/styles/v1/seedovan/cl418ry37003e14rihe9tdrxa/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2VlZG92YW4iLCJhIjoiY2wwY3M5MDJtMDI4aTNjcDkyem9hdnI4YiJ9.G7t_vQ3A7RlXG6zMx__-mg"
                    attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>"
                />

                <Polygon
                    color = "purple"
                    positions={isoData}
                />
                <Marker
                    icon={iconMarker}
                    eventHandlers={{
                        click: (child) => {
                            child.target.openPopup();
                        },
                        mouseover: (child) => {
                            child.target.setIcon(iconMarkerSelected)
                        },
                        mouseout: (child) => {
                            child.target.setIcon(iconMarker)
                        }
                    }}
                    position={[Number(warehouse.wh_latitude),Number(warehouse.wh_longitude)]}
                >
                    <Popup>{warehouse.adress}</Popup>
                </Marker>
                
            </LeafletMap>
        </div>
    )
}

export default SingleWarehouseMap;
export { iconMarker };