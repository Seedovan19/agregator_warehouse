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

  // Загрузка
  const [ isLoading, setIsLoading ] = useState(false);

  // Фильтры
  const [ type, setType ] = useState('');
  const [ palletQuantity, setPalletQuantity ] = useState('');

  // Всплывающий фильтр
  const [ modalActive, setModalActive ] = useState(false);
  const [ activeFilter, setActiveFilter] = useState([]);

  // Галочки во всплывающем фильтре
  const [ alco, setAlco ] = useState(false);
  const [ transport, setTransportation ] = useState(false);
  const [ refrigerator, setRefrigerator ] = useState(false);
  const [ freezer, setFreezer ] = useState(false);



  useEffect(() => {
    setIsLoading(true);

    getWarehousesData(type, palletQuantity, freezer, refrigerator, alco, transport)
      .then((data) => {
        setWarehouses(data)
        console.log(data)
        setIsLoading(false)
      })
  },[type, palletQuantity, freezer, refrigerator, alco, transport]);

  return (
    <div>
    <>
    <CssBaseline />
    <Header />

    <Grid container>
      <Grid item xs={12} md={5}>
        <Filter
            type = {type}
            setType = {setType}
            palletQuantity = {palletQuantity}
            setPalletQuantity = {setPalletQuantity}
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
      <Grid item xs={12} md={7}>
        <WarehouseMap
          warehouses = {warehouses}
          setChildClicked = {setChildClicked}
        />
      </Grid>
      
    </Grid>
    <Modal
      modalActive = {modalActive}
      setModalActive = {setModalActive}
      activeFilter = {activeFilter}
      setActiveFilter = {setActiveFilter}
      alco = {alco}
      setAlco = {setAlco}
      transport = {transport}
      setTransportation = {setTransportation}
      refrigerator = {refrigerator}
      setRefrigerator = {setRefrigerator}
      freezer = {freezer}
      setFreezer = {setFreezer}
    />
    </>
    </div>
  )
}

export default App;
