import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Slideshow from '../../components/Slideshow/Slideshow'
import Header from '../../components/Header/Header'
import { Grid, Link, CircularProgress, Card } from '@material-ui/core';
import useStyles from './styles'
import { getWarehouseImagesData } from '../../api'
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


const WarehousePage = () => {
    const { id } = useParams();
    const [ warehouse, setWarehouse ] = useState(null);
    const [ warehouseImages, setWarehouseImages ] = useState(null);
    const classes = useStyles();
    const navigate = useNavigate();


    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/warehouses/warehouse-detail/${id}`)
        .then(res => res.json())
        .then(data => setWarehouse(data))

        getWarehouseImagesData(id)
        .then(data => setWarehouseImages(data))
        
    }, [id]);

    const handleLinkClick = (event) => {
        let path = `/`; 
        navigate(path);
    }

    return (
    <div>
        <Header/>
        <Grid container className={classes.page_content}>
        <Grid item md={10}>
        <div className={classes.go_back_link} onClick={handleLinkClick}>
            <ArrowBackIosIcon
            sx={{
                position: 'relative',
                top: 2,
                height: '15px',
            }}
            />
            <Link
            component="button" 
            underline="always"
            className={classes.go_back_link_text}
            >
                Вернуться к поиску
            </Link>
        </div>
        </Grid>
        </Grid>
        <Grid container className={classes.page_content}>

        <Grid item md ={7} sm={12}>
            <div>
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
        </Grid>
        <Grid item md ={3} sm={12}>
            <div className={classes.apply_card_div}>
                <Card variant="outlined" className={classes.apply_card}/>
            </div>
        </Grid>
        </Grid>
    </div>
  )
}

export {WarehousePage}