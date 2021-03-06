import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import WarehouseVariant from './WarehouseVariant/WarehouseVariant.jsx';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const theme = createTheme({
  card: {
    card_height: 130,
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

const HighlightedPalletText = styled('span')({
  fontSize: '150%',
  color: '#0C4284',
  paddingRight: '3px',
});

let instancesCount = 0


const WarehouseDetails = ({ warehouse, selected, refProp, setResultsCount }) => {
  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  
  useEffect(() => {
    instancesCount += 1
    setResultsCount(instancesCount)
    return () => {
      instancesCount -= 1
      setResultsCount(instancesCount)
    }
  }, [])

  const navigate = useNavigate();
  

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
        backgroundColor: '#ffffff',
        cursor:"pointer",
        '&:hover': {
          boxShadow: '1px 10px 12px #32274414,0px 0px 1px #32274452,8px 8px 16px 8px #32274405',
        },
      }}
      >
        <Box
          component="img"
          sx={{
            height: '100%',
            minHeight: theme.card.card_height,
            width: theme.card.pic_width,
            maxHeight: { xs: 250, md: theme.card.card_height + 30 },
            maxWidth: { xs: 500, md: theme.card.pic_width },
            m: 1,
            objectFit:  'cover',
            display: 'block',
            borderRadius: '7px',
          }}
          alt="The house from the offer."
          src={warehouse.image ? warehouse.image : require('./profile_pic.png')}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' },
            height: theme.card.card_height,
            width: { md: '100%', xs: '100%' },
            borderRadius: '20px',
          }}
        >
          <MontTypography sx = {{
            marginBottom: theme.card.margin_inside,
            alignItems: 'top',
            fontSize: '15px',
            maxHeight: '3rem',
            overflow: 'hidden',
          }}>
            { warehouse.adress }
          </MontTypography>
          <WarehouseVariant
            warehouse_variant = {warehouse.warehouse_variant} 
            is_long_term = {warehouse.long_term_commitment}
          />
          
          
          <Grid container spacing={3} alignItems='center' sx ={{paddingBottom: '0.1rem', paddingTop: '0.4rem'}}>
            <Grid item md={4}>
              <MontTypography sx={{ 
                fontSize: '10px',
                alignItems: 'flex-end',
              }}>
                ?????????????????? ???????????????? ????????????
              </MontTypography>
            </Grid>
            <Grid item md={4}>
              <MontTypography sx={{ 
                fontSize: '10px',
                alignItems: 'flex-end',
              }}>
                ??????????????/???????????????? ????????????
              </MontTypography>
            </Grid>
            <Grid item md={4}>
              <MontTypography sx={{ 
                fontSize: '10px',
                alignItems: 'flex-end',
              }}>
                ??????????????????????
              </MontTypography>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            {warehouse?.storage_conditions.pallet_storage_cost !== 0 ? ( 
              <Grid item md={4}>
                <MontTypography sx={{ 
                  fontSize: '10px',
                  alignItems: 'flex-end',
                }}>
                  ???? <HighlightedCostText > 
                      { warehouse.storage_conditions.pallet_storage_cost } 
                    </HighlightedCostText>
                  ??????/??????????
                </MontTypography>
              </Grid>
            ) : (
              <Grid item md={4}>
                <MontTypography sx={{ 
                  fontSize: '12px',
                  alignItems: 'flex-end',
                  color: '#0C4284',
                }}>
                  ???? ??????????????
                </MontTypography>
              </Grid>
            )}
            {warehouse?.storage_conditions.pallet_handling_cost !== 0 ? ( 
              <Grid item md={4}>
                <MontTypography sx={{ 
                  fontSize: '10px',
                  alignItems: 'flex-end',
                }}>
                  ???? <HighlightedCostText > 
                      { warehouse.storage_conditions.pallet_handling_cost } 
                    </HighlightedCostText>
                  ??????
                </MontTypography>
              </Grid>
            ) : (
              <Grid item md={4}>
                <MontTypography sx={{ 
                  fontSize: '12px',
                  alignItems: 'flex-end',
                  color: '#0C4284',
                }}>
                  ???? ??????????????
                </MontTypography>
              </Grid>
            )}
            {warehouse?.storage_conditions.pallet_storage_capacity !== 0 ? (
              <>
              {warehouse.storage_conditions.pallet_storage_capacity === 1 && (
                <Grid item md={4}>
                  <MontTypography sx={{ 
                    fontSize: '10px',
                    alignItems: 'flex-end',
                  }}>
                    ????????????
                    <HighlightedPalletText> 
                    &nbsp;50 
                    </HighlightedPalletText>
                    ??????????
                  </MontTypography>
                </Grid>
              )}
              {warehouse.storage_conditions.pallet_storage_capacity === 2 && (
                <Grid item md={4}>
                  <MontTypography sx={{ 
                    fontSize: '10px',
                    alignItems: 'flex-end',
                  }}>
                    <HighlightedPalletText> 
                      50-250
                    </HighlightedPalletText>
                    ??????????
                  </MontTypography>
                </Grid>
              )}
              {warehouse.storage_conditions.pallet_storage_capacity === 3 && (
                <Grid item md={4}>
                  <MontTypography sx={{ 
                    fontSize: '10px',
                    alignItems: 'flex-end',
                  }}>
                    <HighlightedPalletText> 
                      250-500
                    </HighlightedPalletText>
                    ??????????
                  </MontTypography>
                </Grid>
              )}
              {warehouse.storage_conditions.pallet_storage_capacity === 4 && (
                <Grid item md={4}>
                  <MontTypography sx={{ 
                    fontSize: '10px',
                    alignItems: 'flex-end',
                  }}>
                    <HighlightedPalletText> 
                      500-1000
                    </HighlightedPalletText>
                    ??????????
                  </MontTypography>
                </Grid>
              )}
              {warehouse.storage_conditions.pallet_storage_capacity === 5 && (
                <Grid item md={4}>
                  <MontTypography sx={{ 
                    fontSize: '10px',
                    alignItems: 'flex-end',
                  }}>
                    <HighlightedPalletText> 
                      1000+
                    </HighlightedPalletText>
                    ??????????
                  </MontTypography>
                </Grid>
              )}
              {warehouse.storage_conditions.pallet_storage_capacity !== 1 && warehouse.storage_conditions.pallet_storage_capacity !== 2 && warehouse.storage_conditions.pallet_storage_capacity !== 3 && warehouse.storage_conditions.pallet_storage_capacity !== 4 && warehouse.storage_conditions.pallet_storage_capacity !== 5 && (
                <Grid item md={4}>
                  <MontTypography sx={{ 
                    fontSize: '10px',
                    alignItems: 'flex-end',
                  }}>
                    <HighlightedPalletText> 
                      {warehouse.storage_conditions.pallet_storage_capacity}
                    </HighlightedPalletText>
                    ??????????
                  </MontTypography>
                </Grid>
              )}
              </>
            ) : (
              <Grid item md={4}>
                <MontTypography sx={{ 
                  fontSize: '12px',
                  alignItems: 'flex-end',
                  color: '#0C4284',
                }}>
                  ???? ??????????????
                </MontTypography>
              </Grid>
            )}
          </Grid>
          </Box>
        </Box>

    </div>
  );
};

export default WarehouseDetails;