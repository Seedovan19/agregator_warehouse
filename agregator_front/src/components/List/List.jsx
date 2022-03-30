import React, { useState, useEffect, createRef } from 'react'
import { CircularProgress, Grid } from '@material-ui/core';
import WarehouseDetails from '../WarehouseDetails/WarehouseDetails'
import Filter from '../Filter/Filter'
import useStyles from './styles'

const List = ({ warehouses, childClicked, isLoading, type, setType, alco, setAlco }) => {
  const classes = useStyles();


  const [ elRefs, setElRefs ]= useState([]);

  useEffect(() => {
    setElRefs((refs) => Array(warehouses?.length).fill().map((_, i) => refs[i] || createRef()));
  }, [warehouses]);

  return (
    <div className={ classes.container }>
      <Filter
          type = {type}
          setType = {setType}
          alco = {alco}
          setAlco = {setAlco}
      />
      { isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem"/>
        </div>
      ) : (
        <>
        <Grid container spacing={3} className={classes.list}>
          { warehouses?.map((warehouse, i) => (
            <Grid ref={elRefs[i]} item key={i} xs={12}>
              <WarehouseDetails 
                selected={childClicked?.lng === warehouse?.wh_lat && childClicked?.lat === warehouse?.wh_lon} //TODO: WAT? исправить где-то местами все перепутал
                refProp={elRefs[i]}
                warehouse={warehouse}
              />
            </Grid>
          )) }
        </Grid>
      </>
      )}
    </div>
  );
}

export default List;