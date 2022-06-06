import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { getWarehousesData } from '../api'
import Header from '../components/Header/Header';
import WarehouseMap from '../components/Map/WarehouseMap';
import List from '../components/List/List';
import Feedback from '../components/Feedback/Feedback';
import Filter from '../components/Filter/Filter';
import ModalFilter from '../components/ModalFilter/ModalFilter';
import ModalFeedback from '../components/Feedback/ModalFeedback/ModalFeedback';


const AgregatorPage = () => {

    const [ warehouses, setWarehouses ] = useState([]);
    const [ childClicked, setChildClicked ] = useState(null);
    const [ resultsCount, setResultsCount ] = useState(0);

    // Загрузка
    const [ isLoading, setIsLoading ] = useState(false);

    // Фильтры
    const [ type, setType ] = useState('');
    const [ palletQuantity, setPalletQuantity ] = useState('');

    // Всплывающий фильтр
    const [ modalActive, setModalActive ] = useState(false);
    const [ modalFeedbackActive, setModalFeedbackActive ] = useState(false);
    const [ activeFilter, setActiveFilter] = useState([]);

    // Галочки во всплывающем фильтре
    const [ refrigerator, setRefrigerator ] = useState(false);
    const [ freezer, setFreezer ] = useState(false);
    const [ alco, setAlco ] = useState(false);
    const [ pharma, setPharma ] = useState(false);
    const [ food, setFood ] = useState(false);
    const [ dangerous, setDangerous ] = useState(false);
    const [ palletization, setPalletization ] = useState(false);
    const [ boxPicking, setBoxPicking ] = useState(false);
    const [ transport, setTransportation ] = useState(false);
    const [ crossdocking, setCrossdocking ] = useState(false);
    const [ customs, setCustoms ] = useState(false);

    const menuHeight = 70;

    useEffect(() => {
        setIsLoading(true);
    
        getWarehousesData(type, palletQuantity, freezer, refrigerator, alco, pharma, food, dangerous, palletization, boxPicking, transport, crossdocking, customs)
          .then((data) => {
            setWarehouses(data)
            setResultsCount(data.length)
            setIsLoading(false)
          })
    },[type, palletQuantity, freezer, refrigerator, alco, pharma, food, dangerous, palletization, boxPicking, transport, crossdocking, customs]);
    

    return (
    <div>
    <Header 
      height = {menuHeight}
    />
    <Grid 
      container 
      justifyContent="center"
    >
      <Grid 
        item 
        xs={12} md={5} 
        sx = {{
          paddingLeft: '1rem',
        }}
        >
        <Box sx = {{position:'fixed', zIndex: 10, backgroundColor:'#fafafa', width: '100%'}}>
        <Feedback
          modalFeedbackActive = {modalFeedbackActive}
          setModalFeedbackActive = {setModalFeedbackActive}
        />
        <Filter
            type = {type}
            setType = {setType}
            palletQuantity = {palletQuantity}
            setPalletQuantity = {setPalletQuantity}
            setModalActive = {setModalActive}
            resultsCount = {resultsCount}
        />
        </Box>
        
        <List 
          warehouses = {warehouses} 
          childClicked = {childClicked}
          isLoading = {isLoading}
          type = {type}
          setType = {setType}
        />
      </Grid>
      
      <Grid item md={7}>
        <WarehouseMap
          warehouses = {warehouses}
          setChildClicked = {setChildClicked}
        />
      </Grid>
      
    </Grid>
    
    <ModalFilter
      modalActive = {modalActive}
      setModalActive = {setModalActive}
      activeFilter = {activeFilter}
      setActiveFilter = {setActiveFilter}
      refrigerator = {refrigerator}
      setRefrigerator = {setRefrigerator}
      freezer = {freezer}
      setFreezer = {setFreezer}
      alco = {alco}
      setAlco = {setAlco}
      pharma = {pharma}
      setPharma = {setPharma}
      food = {food} 
      setFood = {setFood}
      dangerous = {dangerous}
      setDangerous = {setDangerous}
      transport = {transport}
      setTransportation = {setTransportation}
      palletization = {palletization}
      setPalletization = {setPalletization}
      boxPicking = {boxPicking}
      setBoxPicking = {setBoxPicking}
      crossdocking = {crossdocking}
      setCrossdocking = {setCrossdocking}
      customs = {customs}
      setCustoms = {setCustoms}
    />
    <ModalFeedback
      modalFeedbackActive = {modalFeedbackActive}
      setModalFeedbackActive = {setModalFeedbackActive}
    />
    </div>
    )
}
export {AgregatorPage}