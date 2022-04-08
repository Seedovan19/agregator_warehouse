import React from 'react'
import { Chip } from '@material-ui/core';



const WarehouseVariant = ({ warehouse_variant, is_long_term }) => {
    if (warehouse_variant === 'Sharing') {
        return (
            <div>
                <Chip label="Склад от компании" variant="outlined" />
                {is_long_term ? (
                <Chip label="Долгосрочное хранение" variant="outlined" />
                 ) : (<></>) }
            </div>
        )
    } else if (warehouse_variant === 'Storage_only_wh') {
        return (
            <div>
                <Chip label="Склад ответхранения" variant="outlined" />
                {is_long_term ? (
                <Chip label="Долгосрочное хранение" variant="outlined" />
                 ) : (<></>) }
            </div>
        )
    } else if (warehouse_variant === '3pl') { 
        return (
            <div>
                <Chip label="3pl-оператор" variant="outlined" />
                {is_long_term ? (
                    <Chip label="Долгосрочное хранение" variant="outlined" />
                ) : (<></>) }
            </div>
        )
    } else {
        return(
            <div>
                {is_long_term ? (
                    <Chip label="Долгосрочное хранение" variant="outlined" />
                ) : (<></>) }
            </div>
        )
    }
}

export default WarehouseVariant;