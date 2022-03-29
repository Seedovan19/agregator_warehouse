import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import { getWarehousesData } from './api'
import WarehouseMap from './components/Map/WarehouseMap';
import Header from './components/Header/Header';
import List from './components/List/List';


const App = () => {
  const [ warehouses, setWarehouses ] = useState([]);
  const [ childClicked, setChildClicked ] = useState(null);

  const [ isLoading, setIsLoading ] = useState(false);
  const [ type, setType ] = useState('');
  const [ palletQuantity, setPalletQuantity ] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getWarehousesData(type)
      .then((data) => {
        setWarehouses(data)
        console.log(data)
        setIsLoading(false)
      })
  },[type]);
  return (
    <>
    <CssBaseline />
    <Header />
    <Grid container spacing = {3} style = {{ width: '100%'}}>
      <Grid item xs={12} md={4}>
        <List 
          warehouses = {warehouses} 
          childClicked = {childClicked}
          isLoading = {isLoading}
          type = {type}
          setType = {setType}
          palletQuantity = {palletQuantity}
          setPalletQuantity = {setPalletQuantity}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <WarehouseMap
          warehouses = {warehouses}
          setChildClicked = {setChildClicked}
        />
      </Grid>
    </Grid>
    </>
  )
}

export default App;
