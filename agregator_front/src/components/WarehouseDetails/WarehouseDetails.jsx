import React from 'react'
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import useStyles from './styles.js';


const WarehouseDetails = ({ warehouse, selected, refProp }) => {
  console.log(selected)
  console.log(refProp.current)
  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const classes = useStyles();

  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 300 }}
        image={ warehouse.photo ? warehouse.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        title={ warehouse.adress }
      />
      <CardContent>
        <Typography gutterBottom variant="h5">{ warehouse.adress }</Typography>
        { warehouse?.adress && (
          <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
            <LocationOnIcon />{warehouse.adress}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => window.open('/', '_blank')}>
          Подробнее
        </Button>
      </CardActions>
    </Card>
  );
};

export default WarehouseDetails;