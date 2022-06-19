import React, { useState, useEffect, createRef } from 'react'
import { CircularProgress, Grid, Typography } from '@mui/material';
import WarehouseDetails from '../WarehouseDetails/WarehouseDetails'


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

const List = ({ warehouses, childClicked, isLoading, regionPosition, setResultsCount, noRegionFlag }) => {
  const [ elRefs, setElRefs ]= useState([]);

  useEffect(() => {
    setElRefs((refs) => Array(warehouses?.length).fill().map((_, i) => refs[i] || createRef()));
  }, [warehouses]);

  
  return (
    <div>
      { isLoading ? (
        <div>
          <CircularProgress 
            sx = {{
              height: '100%', 
              marginTop: '15rem',
              marginLeft: '15rem',
              // display: 'flex',
              justifyContent: 'center', 
              alignItems: 'center',
            }}
            size="5rem"
          />
        </div>
      ) : (
        <>
        <Grid container 
          spacing={2} 
          sx ={{ 
            overflow: 'auto',
            zIndex: 0,
            position: 'relative',
            top: 227,
            paddingRight: '1rem',
            paddingLeft: '1.5rem',
          }}
        >
          { warehouses.length === 0 ? (
            <Typography>
              К сожалению склады не найдены...
            </Typography>
          ) : (warehouses?.map((warehouse, i) => (
            <>
            {noRegionFlag ? (
              <Grid 
                ref={elRefs[i]} 
                item key={i} 
                xs={12}
              >
                <WarehouseDetails 
                  selected={childClicked?.lng === warehouse?.wh_longitude && childClicked?.lat === warehouse?.wh_latitude} //TODO: WAT? исправить где-то местами все перепутал
                  refProp={elRefs[i]}
                  warehouse={warehouse}
                  setResultsCount = {setResultsCount}
                />
              </Grid>
            ) : (
              haversineDistance(regionPosition,[warehouse.wh_latitude,warehouse.wh_longitude]) < 250 &&
              <Grid 
                ref={elRefs[i]} 
                item key={i} 
                xs={12}
              >
                <WarehouseDetails 
                  selected={childClicked?.lng === warehouse?.wh_longitude && childClicked?.lat === warehouse?.wh_latitude}
                  refProp={elRefs[i]}
                  warehouse={warehouse}
                  setResultsCount = {setResultsCount}
                />
              </Grid>
            )}
            </>
          ))) }
        </Grid>
      </>
      )}
    </div>
  );
}

export default List;