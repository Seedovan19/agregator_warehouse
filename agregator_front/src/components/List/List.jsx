import React, { useState, useEffect, createRef } from 'react'
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import WarehouseDetails from '../WarehouseDetails/WarehouseDetails'
import useStyles from './styles'

const List = ({ warehouses, childClicked, isLoading, type, setType, palletQuantity, setPalletQuantity }) => {
  const classes = useStyles();


  const [ elRefs, setElRefs ]= useState([]);

  useEffect(() => {
    // const { lat, lng } = childClicked;
    setElRefs((refs) => Array(warehouses?.length).fill().map((_, i) => refs[i] || createRef()));
  }, [warehouses]);

  return (
    <div className={ classes.container }>
      <Typography variant="h4">
        Склады в заданной местности
      </Typography>
      { isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem"/>
        </div>
      ) : (
        <>
        <FormControl className={ classes.formControl }>
          <InputLabel>Класс</InputLabel>
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <MenuItem value="A+">A+</MenuItem>
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="B">B</MenuItem>
            <MenuItem value="B+">B+</MenuItem>
            <MenuItem value="C">C</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={ classes.formControl }>
          <InputLabel>Количество паллет</InputLabel>
          <Select value={palletQuantity} onChange={(e) => setPalletQuantity(e.target.value)}>
            <MenuItem value="<50">меньше 50</MenuItem>
            <MenuItem value="50-250">50-250</MenuItem>
            <MenuItem value="250-500">250-500</MenuItem>
            <MenuItem value="500-1000">500-1000</MenuItem>
            <MenuItem value="1000+">больше 1000</MenuItem>
          </Select>
        </FormControl>
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