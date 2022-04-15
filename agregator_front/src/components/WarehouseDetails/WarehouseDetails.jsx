import React from 'react'
import cx from 'clsx';
import { Typography, Card, CardMedia, CardContent, Grid } from '@material-ui/core';
import useStyles from './styles.js';
import WarehouseVariant from './WarehouseVariant/WarehouseVariant.jsx';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { Row, Column, Item } from '@mui-treasury/components/flex';




const WarehouseDetails = ({ warehouse, selected, refProp }) => {
  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const classes = useStyles();
  const shadowStyles = useOverShadowStyles();


  return (
    <Row className={classes.card} >
      <Grid container alignItems='center'>
        <Grid item md = {3} className={classes.picture_item} >
          <CardMedia
            className={ classes.card_picture }
            image={ warehouse.image ? warehouse.image : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}

          />
        </Grid>
        <Grid item md = {9}>
          <Column>
              <Typography className = {classes.card_top_text}>{ warehouse.adress }</Typography>
              <WarehouseVariant className = {classes.tag} warehouse_variant = {warehouse.warehouse_variant} is_long_term = {warehouse.long_term_commitment}/>
              <Grid container spacing={3} alignItems='center'>
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
              <Grid container spacing={3}>
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
                    
          </Column>
        </Grid>
      </Grid>
      </Row>
  );
};

export default WarehouseDetails;