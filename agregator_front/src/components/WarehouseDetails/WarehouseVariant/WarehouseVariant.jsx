import React from 'react'
import { Chip } from '@material-ui/core';
import useStyles from './styles.js';



const WarehouseVariant = ({ warehouse_variant, is_long_term }) => {
    const classes = useStyles();

    if (warehouse_variant === 'Sharing') {
        return (
            <div>
                
                <Chip className={`${classes.label} ${classes.from_company}`}  label="Склад от компании" variant="outlined" />
                {is_long_term ? (
                <Chip className={`${classes.label} ${classes.long_term_storage}`} label="Долгосрочное хранение" variant="outlined" />
                 ) : (<></>) }
            </div>
        )
    } else if (warehouse_variant === 'Storage_only_wh') {
        return (
            <div>
                <Chip className={`${classes.label} ${classes.only_storage}`} label="Склад ответхранения" variant="outlined" />
                {is_long_term ? (
                <Chip className={`${classes.label} ${classes.long_term_storage}`} label="Долгосрочное хранение" variant="outlined" />
                 ) : (<></>) }
            </div>
        )
    } else if (warehouse_variant === '3pl') { 
        return (
            <div>
                <Chip className={`${classes.label} ${classes.three_pl}`} label="3pl-оператор" variant="outlined" />
                {is_long_term ? (
                    <Chip className={`${classes.label} ${classes.long_term_storage}`} label="Долгосрочное хранение" variant="outlined" />
                ) : (<></>) }
            </div>
        )
    } else {
        return(
            <div>
                {is_long_term ? (
                    <Chip className={`${classes.label} ${classes.long_term_storage}`} label="Долгосрочное хранение" variant="outlined" />
                ) : (<></>) }
            </div>
        )
    }
}

export default WarehouseVariant;