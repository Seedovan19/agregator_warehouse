import React from 'react'
import { Typography, Button, Card, CardMedia, CardContent, CardActions, Grid } from '@material-ui/core';

import useStyles from './styles.js';
import WarehouseVariant from './WarehouseVariant/WarehouseVariant.jsx';


const WarehouseDetails = ({ warehouse, selected, refProp }) => {
  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const classes = useStyles();

  return (
    <Card elevation={6}>
      <Grid container className={classes.card_container}>
        <Grid item md = {4} className={classes.picture_item} >
          <CardMedia
            className={ classes.card_picture }
            image={ warehouse.image ? warehouse.image : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
            title={ warehouse.adress }
          />
        </Grid>
        <Grid item md = {8}>
          <CardContent>
              <Typography gutterBottom className = {classes.card_top_text}>{ warehouse.adress }</Typography>
              <WarehouseVariant warehouse_variant = {warehouse.warehouse_variant} is_long_term = {warehouse.long_term_commitment}/>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" onClick={() => window.open('/', '_blank')}>
              Подробнее
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

export default WarehouseDetails;