import React, { useState, useEffect, createRef } from 'react'
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import WarehouseDetails from '../WarehouseDetails/WarehouseDetails'
import useStyles from './styles'

const List = ({ warehouses, childClicked, isLoading }) => {
  const classes = useStyles();
  const [ elRefs, setElRefs ]= useState([]);

  useEffect(() => {
    setElRefs((refs) => Array(warehouses?.length).fill().map((_, i) => refs[i] || createRef()));
  }, [warehouses]);

  return (
    <div className={ classes.container }>
      { isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem"/>
        </div>
      ) : (
        <>
        <Grid container spacing={2} className={classes.list}>
          { warehouses.length === 0 ? (
            <Typography>
              К сожалению склады не найдены...
            </Typography>
          ) : (warehouses?.map((warehouse, i) => (
            <Grid ref={elRefs[i]} item key={i} xs={12}>
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