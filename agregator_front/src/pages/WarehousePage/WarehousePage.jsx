import React, { useState, useEffect } from 'react'
import {Link, CircularProgress, Typography } from '@material-ui/core';
import Grid from '@mui/material/Grid'
import Slideshow from '../../components/Slideshow/Slideshow'
import WarehousePageHeader from './WarehousePageHeader'
import WarehouseVariant from '../../components/WarehouseDetails/WarehouseVariant/WarehouseVariant'
import {Costs} from './Costs/Costs'
import {ApplicationCard} from './ApplicationCard/ApplicationCard'
import {WarehouseInfo} from './WarehouseInfo/WarehouseInfo'
import { getWarehouseImagesData } from '../../api'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import useStyles from './styles'

const WarehousePage = () => {
    const { id } = useParams();
    const [ warehouse, setWarehouse ] = useState(null);
    const [ warehouseImages, setWarehouseImages ] = useState(null);
    const [ conditionValue, setConditionValue ] = useState('No value');
    const [ fireSysTypeValue, setFireSysType ] = useState('No value');

    const classes = useStyles();
    const navigate = useNavigate();


    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/warehouses/warehouse-detail/${id}`)
        .then(res => res.json())

        .then((data) => {
            if (data.features.condition === "Regulated") {
                setConditionValue('Регулируемый температурный режим')
            } else if (data.features.condition === "Heated") {
                setConditionValue('Отапливаемый')
            } else if (data.features.condition === "Warmed") {
                setConditionValue('Утепленный')
            } else if (data.features.condition === "Non-heated") {
                setConditionValue('Неотапливаемый')
            } else if (data.features.condition === "Freezer-WH") {
                setConditionValue('Морозильный')
            } else if (data.features.condition === "Cold-WH") {
                setConditionValue('Холодильный')
            }

            if (data.security.fire_system_type === "Alarm") {
                setFireSysType('Сигнализация')
            } else if (data.security.fire_system_type === "Sprinkler") {
                setFireSysType('Спринклерная')
            } else if (data.security.fire_system_type === "Powder") {
                setFireSysType('Порошковая')
            } else if (data.security.fire_system_type === "Gaz") {
                setFireSysType('Газовая')
            } else if (data.security.fire_system_type === "Hydrant") {
                setFireSysType('Гидрантная')
            } else if (data.security.fire_system_type === "None") {
                setFireSysType('Нет')
            }
            setWarehouse(data)
        })

        getWarehouseImagesData(id)
        .then(data => setWarehouseImages(data))
        
    }, [id]);

    const handleLinkClick = (event) => {
        let path = `/`; 
        navigate(path);
    }

    return (
    <div>
        <WarehousePageHeader
            height={70}
        />
        <Grid container sx ={{
            display: 'flex',
            justifyContent: 'center',
        }}>
        <Grid item md={10}>
        <div className={classes.go_back_link} onClick={handleLinkClick}>
            <ArrowBackIosIcon
            sx={{
                position: 'relative',
                top: 1,
                height: '15px',
                zIndex: 1000,
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
        
        <Typography className={classes.title}>{warehouse?.adress}</Typography>
        
        <Grid container>
            <Typography className={classes.warehouse_id}>ID склада: {warehouse?.id}</Typography>
        </Grid>
        </Grid>
        </Grid>
        <Grid sx ={{
            display: 'flex',
            justifyContent: 'center',
        }}>
        
        <Grid item md={7} sm={12}>
            <div>
            {warehouse ? (
                <>

                <Slideshow warehouseImages={warehouseImages}/>
                <div className={classes.warehouse_variant}>
                <WarehouseVariant 
                    warehouse_variant = {warehouse?.warehouse_variant}
                    is_long_term = {warehouse?.long_term_commitment}
                />
                </div>
                <Costs warehouse = {warehouse} />
                <WarehouseInfo 
                    warehouse = {warehouse} 
                    conditionValue = {conditionValue}
                    fireSysTypeValue = {fireSysTypeValue}
                />
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
        {warehouse ? (
        <Grid item md ={3} sm={12}>
            <div className={classes.apply_card_div}>
                <ApplicationCard/>
            </div>
        </Grid>
        ) : (<></>)}
        </Grid>
    </div>
  )
}

export {WarehousePage}