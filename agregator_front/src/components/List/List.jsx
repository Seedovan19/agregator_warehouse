import React, { useState, useEffect, createRef } from 'react'
import { CircularProgress, Grid, Typography } from '@mui/material';
import WarehouseDetails from '../WarehouseDetails/WarehouseDetails'

const List = ({ warehouses, childClicked, isLoading }) => {
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
            <Grid 
              ref={elRefs[i]} 
              item key={i} 
              xs={12}

            >
              <WarehouseDetails 
                selected={childClicked?.lng === warehouse?.wh_longitude && childClicked?.lat === warehouse?.wh_latitude} //TODO: WAT? исправить где-то местами все перепутал
                refProp={elRefs[i]}
                warehouse={warehouse}
              />
            </Grid>
          ))) }
        </Grid>
      </>
      )}
    </div>
  );
}

export default List;