import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import { getWarehousesData } from './api'
import WarehouseMap from './components/Map/WarehouseMap';
import Header from './components/Header/Header';
import List from './components/List/List';
import Filter from './components/Filter/Filter';
import Modal from './components/Modal/Modal';

import { Routes, Route, Link } from 'react-router-dom'
import { AgregatorPage } from './pages/AgregatorPage'
import { LoginPage } from './pages/LoginPage'



const App = () => {

  return (
    <div>
    <>
    <CssBaseline />
    <Header />
    <Routes>
      <Route path='/' element={<AgregatorPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
    </Routes>
    </>
    </div>
  )
}

export default App;
