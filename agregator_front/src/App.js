import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { Routes, Route } from 'react-router-dom'
import { AgregatorPage } from './pages/AgregatorPage'
import { WarehousePage } from './pages/WarehousePage/WarehousePage'
import { RecommendationsPage } from './pages/RecommendationsPage/RecommendationsPage'


const App = () => {

  return (
    <div>
    <>
    <CssBaseline />
    <Routes>
      <Route path='/' element={<AgregatorPage/>}/>
      <Route path='/recommendations' element={<RecommendationsPage/>}/>
      <Route path='/warehouse/:id' element={<WarehousePage/>}/>
    </Routes>
    </>
    </div>
  )
}

export default App;
