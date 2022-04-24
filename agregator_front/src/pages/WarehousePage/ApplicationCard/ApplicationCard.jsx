import React from 'react'
import useStyles from './styles'
import { Card, Grid, Typography, Button } from '@material-ui/core';
import Stack from '@mui/material/Stack';


const ApplicationCard = () => {
    const classes = useStyles();

    return (
        <Card variant="outlined" className={classes.apply_card}>
            <Stack alignItems='center'>
                <Button variant="outlined" color="primary">Оставьте заявку</Button>
                <Typography>Либо звоните по любым вопросам:</Typography>
                <Typography className={classes.phone_number}>+7(904)613-94-60</Typography>
            </Stack>
        </Card>
    )
}

export {ApplicationCard}