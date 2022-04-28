import React from 'react'
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import WarehouseVariant from './WarehouseVariant/WarehouseVariant.jsx';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import useStyles from './styles.js';

const theme = createTheme({
  card: {
    card_height: 150,
    pic_width: 150,
    margin_inside: '5px',
  },
});

const MontTypography = styled(Typography)({
  fontFamily: 'Montserrat-medium',
  color: 'black',
});
const HighlightedCostText = styled('span')({
  fontSize: '150%',
  color: '#0C4284',
  paddingRight: '3px',
  paddingLeft: '3px',
});


const WarehouseDetails = ({ warehouse, selected, refProp }) => {
  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const navigate = useNavigate();
  const shadowStyles = useOverShadowStyles();

  const handleCardClick = (event) => {
    let path = `/warehouse/${warehouse.id}`; 
    navigate(path);
  }


  return (
    <div onClick={handleCardClick}>
      <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        overflow: 'hidden',
        border: '1px solid',
        borderColor: '#E7EDF3',
        borderRadius: '7px',
        transition: '0.4s',
        '&:hover': {
          boxShadow: '1px 10px 12px #32274414,0px 0px 1px #32274452,8px 8px 16px 8px #32274405',
        },
      }}
      >
        <Box
          component="img"
          sx={{
            height: theme.card.card_height,
            width: theme.card.pic_width,
            maxHeight: { xs: 233, md: theme.card.card_height },
            maxWidth: { xs: 500, md: theme.card.pic_width },
            
            m: 1,
            display: 'block',
            borderRadius: '7px',
          }}
          alt="The house from the offer."
          src={warehouse.image ? warehouse.image : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'space-evenly',
            alignItems: { xs: 'center', md: 'flex-start' },
            height: theme.card.card_height,
            width: { md: '100%', xs: '100%' },
            borderRadius: '20px',
          }}
        >
          <MontTypography sx = {{
            marginBottom: theme.card.margin_inside,
            alignItems: 'top'
          }}>
            { warehouse.adress }
          </MontTypography>
          <WarehouseVariant
            warehouse_variant = {warehouse.warehouse_variant} 
            is_long_term = {warehouse.long_term_commitment}
          />
          
          
          <Grid container spacing={3} alignItems='center' >
            <Grid item md={4}>
              <MontTypography sx={{ 
                fontSize: '10px',
                alignItems: 'flex-end',
              }}>
                Стоимость хранения палеты
              </MontTypography>
            </Grid>
            <Grid item md={4}>
              <MontTypography sx={{ 
                fontSize: '10px',
                alignItems: 'flex-end',
              }}>
                Приемка/отгрузка палеты
              </MontTypography>
            </Grid>
            <Grid item md={4}>
              <MontTypography sx={{ 
                fontSize: '10px',
                alignItems: 'flex-end',
              }}>
                Вместимость
              </MontTypography>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={4}>
              <MontTypography sx={{ 
                fontSize: '10px',
                alignItems: 'flex-end',
              }}>
                от <HighlightedCostText > 
                    { warehouse.storage_conditions.pallet_storage_cost } 
                  </HighlightedCostText>
                руб/сутки
              </MontTypography>
            </Grid>
            <Grid item md={4}>
              <MontTypography sx={{ 
                fontSize: '10px',
                alignItems: 'flex-end',
              }}>
                от <HighlightedCostText > 
                    { warehouse.storage_conditions.pallet_handling_cost } 
                  </HighlightedCostText>
                руб
              </MontTypography>
            </Grid>
            <Grid item md={4}>
              <MontTypography sx={{ 
                fontSize: '10px',
                alignItems: 'flex-end',
              }}>
                <HighlightedCostText > 
                  { warehouse.storage_conditions.pallet_storage_capacity } 
                </HighlightedCostText>
                палет
              </MontTypography>
            </Grid>
          </Grid>
          </Box>
        </Box>

    </div>
  );
};

export default WarehouseDetails;