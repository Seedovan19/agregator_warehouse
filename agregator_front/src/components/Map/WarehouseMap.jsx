import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import WarehouseVariant from '../WarehouseDetails/WarehouseVariant/WarehouseVariant';
import "leaflet/dist/leaflet.css";
import { useMediaQuery } from '@material-ui/core';
import L from 'leaflet';
import { styled } from '@mui/material/styles';
import useStyles from './styles'


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

function MyComponent({regionPosition}) {
    const map = useMap()
    useEffect(() => {
        if (map) map.flyTo(regionPosition)
    }, [regionPosition])

    return null
}


function haversineDistance(coords1, coords2) {
    function toRad(x) {
      return x * Math.PI / 180;
    }
  
    var lon1 = coords1[0];
    var lat1 = coords1[1];
  
    var lon2 = coords2[0];
    var lat2 = coords2[1];
  
    var R = 6371; // km
  
    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2)
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    
    return d;
}


const WarehouseMap = ({ warehouses, setChildClicked, regionPosition, noRegionFlag }) => {
    const classes = useStyles();
    const isMobile = useMediaQuery('(min-width:600px)')
    
    const navigate = useNavigate();
  

    const handleMarkerCardClick = (event, warehouse) => {
        let path = `/warehouse/${warehouse.id}`; 
        navigate(path);
    }

    return  (
        <Box sx ={ {
            height: '88vh', 
            width: '57vw',
            borderRadius: '10px',
            position:'fixed',
            zIndex: 100,
        }}>
            <LeafletMap 
                style={{height: "100%", width: "55.5vw", borderRadius: "10px", zIndex: 100}} 
                center={{ lat: 59.9386, lng: 30.3141 }}
                zoom={13}
            >
                { warehouses?.map((warehouse, i) => (
                    <>
                    {noRegionFlag ? (
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
                        <Popup 
                            className={classes.popup}
                            onClick={() => {
                                handleMarkerCardClick(warehouse)
                            }}
                        >
                            <Stack
                                sx = {{ 
                                    height: "14rem",
                                    maxWidth: "15rem",
                                    cursor: "grab"
                                }}
                            >
                            <img
                                className = {classes.popup_image}
                                height = "150rem"
                                src={
                                    warehouse.image ? warehouse.image : require('../WarehouseDetails/profile_pic.png')
                                }
                            />
                            <Typography
                                sx = {{
                                    fontSize: '11px',
                                    fontFamily: 'Montserrat-medium',
                                    
                                }}
                            >
                                {warehouse.adress}
                            </Typography>
                            <WarehouseVariant
                                warehouse_variant = {warehouse.warehouse_variant} 
                                is_long_term = {warehouse.long_term_commitment}
                            />
                            </Stack>
                            
                        </Popup>
                        </Marker>
                    ) : (
                        haversineDistance(regionPosition,[warehouse.wh_latitude,warehouse.wh_longitude]) < 250 &&
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
                        <Popup 
                            className={classes.popup}
                            onClick={() => {
                                handleMarkerCardClick(warehouse)
                            }}
                        >
                            <Stack
                                sx = {{ 
                                    height: "14rem",
                                    maxWidth: "15rem",
                                    cursor: "grab"
                                }}
                            >
                            <img
                                className = {classes.popup_image}
                                height = "150rem"
                                src={
                                    warehouse.image ? warehouse.image : require('../WarehouseDetails/profile_pic.png')
                                }
                            />
                            <Typography
                                sx = {{
                                    fontSize: '11px',
                                    fontFamily: 'Montserrat-medium',
                                    
                                }}
                            >
                                {warehouse.adress}
                            </Typography>
                            <WarehouseVariant
                                warehouse_variant = {warehouse.warehouse_variant} 
                                is_long_term = {warehouse.long_term_commitment}
                            />
                            </Stack>
                            
                        </Popup>
                        </Marker>
                    )}
                    </>
                )) }
                <TileLayer
                    url="https://api.mapbox.com/styles/v1/seedovan/cl418ry37003e14rihe9tdrxa/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2VlZG92YW4iLCJhIjoiY2wwY3M5MDJtMDI4aTNjcDkyem9hdnI4YiJ9.G7t_vQ3A7RlXG6zMx__-mg"
                    attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>"
                />
                <MyComponent regionPosition= {regionPosition}/>
            </LeafletMap>
        </Box>
    )
}

export default WarehouseMap;