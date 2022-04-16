import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { Routes, Route } from 'react-router-dom'
import { AgregatorPage } from './pages/AgregatorPage'

const App = () => {

  return (
    <div>
    <>
    <CssBaseline />
    <Routes>
      <Route path='/' element={<AgregatorPage/>}/>
    </Routes>
    </>
    </div>
  )
}

export default App;
