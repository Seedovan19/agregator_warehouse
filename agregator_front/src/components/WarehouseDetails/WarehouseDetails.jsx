import React from 'react'
import { Typography, Card, CardMedia, CardContent, CardActions, Grid } from '@material-ui/core';
import Stack from '@mui/material/Stack';
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
              <Grid container>
                <Grid item md={4}>
                  <Typography className = {classes.cost_text}>Стоимость хранения палеты</Typography>
                </Grid>
                <Grid item md={4}>
                  <Typography className = {classes.cost_text}>Приемка/отгрузка палеты</Typography>
                </Grid>
                <Grid item md={4}>
                  <Typography className = {classes.cost_text}>Вместимость</Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item md={4}>
                  <Typography className = {classes.cost_text}>
                    от <span className = {classes.highlighted_cost_text}> 
                        { warehouse.storage_conditions.pallet_storage_cost } 
                      </span>
                    руб/сутки
                  </Typography>
                </Grid>
                <Grid item md={4}>
                  <Typography className = {classes.cost_text}>
                    от <span className = {classes.highlighted_cost_text}> 
                        { warehouse.storage_conditions.pallet_handling_cost } 
                      </span>
                    руб
                  </Typography>
                </Grid>
                <Grid item md={4}>
                  <Typography className = {classes.cost_text}>
                    <span className = {classes.highlighted_cost_text}> 
                      { warehouse.storage_conditions.pallet_storage_capacity } 
                    </span>
                    палет
                  </Typography>
                </Grid>
              </Grid>
                    
          </CardContent>
          <CardActions>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

export default WarehouseDetails;