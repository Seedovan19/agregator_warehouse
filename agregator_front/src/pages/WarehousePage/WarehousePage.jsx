import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Slideshow from '../../components/Slideshow/Slideshow'
import Header from '../../components/Header/Header'
import { Grid, CircularProgress, Card } from '@material-ui/core';
import useStyles from './styles'
import { getWarehouseImagesData } from '../../api'



const WarehousePage = () => {
    const { id } = useParams();
    const [ warehouse, setWarehouse ] = useState(null);
    const [ warehouseImages, setWarehouseImages ] = useState(null);
    const classes = useStyles();


    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/warehouses/warehouse-detail/${id}`)
        .then(res => res.json())
        .then(data => setWarehouse(data))

        getWarehouseImagesData(id)
        .then(data => setWarehouseImages(data))
        
    }, [id]);
    
    return (
    <div>
        <Header/>
        <div container className={classes.page_content}>
            <div className={classes.slideshow_div}>
            {warehouse ? (
                <>
                <Slideshow warehouseImages={warehouseImages}/>
                <h1>{warehouse.adress}</h1>

                </>
            ) : (
                <>
                <div className={classes.loading}>
                <CircularProgress size="5rem"/>
                </div>
                </>
            )}
            </div>
            <div className={classes.apply_card_div}>
                <Card variant="outlined" className={classes.apply_card}/>
            </div>
        </div>
    </div>
  )
}

export {WarehousePage}