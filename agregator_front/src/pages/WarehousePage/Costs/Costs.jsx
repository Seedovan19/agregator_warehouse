import React from 'react'
import useStyles from './styles'
import { Grid, Typography } from '@material-ui/core';
import Stack from '@mui/material/Stack';


const Costs = ({warehouse}) => {
    const classes = useStyles();

    return (
        <div>
            <Grid container>
                {warehouse?.storage_conditions.pallet_storage_cost === 0 && (
                    <Stack className={classes.cost_stack}>
                        <Typography className={classes.cost_text}>Стоимость хранения от</Typography>
                        <Typography className={classes.highlighted_cost_text}>{warehouse.storage_conditions.pallet_storage_cost}</Typography>
                        <Typography className={classes.cost_text}>за палету в месяц</Typography>
                    </Stack>
                )}

                {warehouse?.storage_conditions.pallet_handling_cost === 0 && (
                    <Stack className={classes.cost_stack}>
                        <Typography className={classes.cost_text}>Прием/отгрузка от</Typography>
                        <Typography className={classes.highlighted_cost_text}>{warehouse?.storage_conditions.pallet_handling_cost}</Typography>
                        <Typography className={classes.cost_text}>за палету</Typography>
                    </Stack>
                )}

                {warehouse?.storage_conditions.pallet_storage_capacity === 0 && (
                <Stack className={classes.cost_stack}>
                    <Typography className={classes.cost_text}>Вместимость</Typography>
                    <Typography className={classes.highlighted_cost_text}>{warehouse?.storage_conditions.pallet_storage_capacity}</Typography>
                </Stack>
                )}

                {warehouse?.warehouse_class && (
                <Stack className={classes.cost_stack}>
                    <Typography className={classes.cost_text}>Класс</Typography>
                    <Typography className={classes.highlighted_cost_text}>{warehouse?.warehouse_class}</Typography>
                </Stack>
                )}
            </Grid>
        </div>
    )
}

export {Costs}