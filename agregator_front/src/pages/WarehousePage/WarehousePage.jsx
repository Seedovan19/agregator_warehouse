import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Slideshow from '../../components/Slideshow/Slideshow'
import Header from '../../components/Header/Header'
import { Grid, CircularProgress } from '@material-ui/core';
import useStyles from './styles'


const WarehousePage = () => {
    const { id } = useParams();
    const [ warehouse, setWarehouse ] = useState(null);
    const [ warehouseImages, setWarehouseImages ] = useState(null);
    const classes = useStyles();


    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/warehouses/warehouse-detail/${id}`)
        .then(res => res.json())
        .then(function(data) {
                setWarehouse(data)
                if (data.image != null) {         
                    fetch(`http://127.0.0.1:8000/api/warehouses/warehouse-detail/images/${id}`)
                    .then(res => res.json())
                    .then(data => setWarehouseImages(data))
                };
            })
    }, [id]);

    return (
    <div>
        <Header/>
        <Grid container className={classes.page_content}>
            <Grid item>
            {warehouse ? (
                <>
                <Slideshow warehouse = {warehouse} warehouseImages={warehouseImages}/>
                <h1>{warehouse.adress}</h1>
                </>
            ) : (
                <>
                <div className={classes.loading}>
                <CircularProgress size="5rem"/>
                </div>
                </>
            )}
            </Grid>
        </Grid>
    </div>
  )
}

export {WarehousePage}