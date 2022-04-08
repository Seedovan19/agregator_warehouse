import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import { getWarehousesData } from './api'
import WarehouseMap from './components/Map/WarehouseMap';
import Header from './components/Header/Header';
import List from './components/List/List';
import Filter from './components/Filter/Filter';
import Modal from './components/Modal/Modal';



const App = () => {
  const [ warehouses, setWarehouses ] = useState([]);
  const [ childClicked, setChildClicked ] = useState(null);

  const [ modalActive, setModalActive ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ type, setType ] = useState('');
  const [ alco, setAlco ] = useState(false);
  const [ transport, setTransportation ] = useState(false);
  const [activeFilter, setActiveFilter] = React.useState([]);

  useEffect(() => {
    setIsLoading(true);

    getWarehousesData(type, alco, transport)
      .then((data) => {
        setWarehouses(data)
        console.log(data)
        setIsLoading(false)
      })
  },[type, alco, transport]);

  return (
    <div>
    <>
    <CssBaseline />
    <Header />

    <Grid container spacing = {1} style = {{ width: '100%'}}>
      <Grid item xs={12} md={4}>
        <Filter
            type = {type}
            setType = {setType}
            setModalActive = {setModalActive}
        />
        <List 
          warehouses = {warehouses} 
          childClicked = {childClicked}
          isLoading = {isLoading}
          type = {type}
          setType = {setType}
        />
      </Grid>
      <Grid item xs={12} md={5}>
        <WarehouseMap
          warehouses = {warehouses}
          setChildClicked = {setChildClicked}
        />
      </Grid>
      
    </Grid>
    <Modal
      modalActive = {modalActive}
      setModalActive = {setModalActive}
      alco = {alco}
      setAlco = {setAlco}
      transport = {transport}
      setTransportation = {setTransportation}
      activeFilter = {activeFilter}
      setActiveFilter = {setActiveFilter}
    />
    </>
    </div>
  )
}

export default App;
