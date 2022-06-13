import React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'
import Stack from '@mui/material/Stack';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useNavigate } from "react-router-dom";
import useStyles from './styles'
import { styled } from '@mui/material/styles';

const LatoTypography = styled(Typography)({
  color: "black",
  fontFamily: "Lato-Regular",
  fontSize: "12px",
});

const StyledToolbar = styled(Toolbar)({
  paddingLeft: '1.5rem',
  paddingRight: '1rem',
});

const WarehousePageHeader = ({height}) => {
  const classes = useStyles();
  const navigate = useNavigate();


  const handleRecommendationsClick = (event) => {
    let path = `/recommendations`; 
    navigate(path);
  }

  const handleLogoClick = (event) => {
    let path = `/`; 
    navigate(path);
  }
  
  const handleLoginClick = (event) => {
    console.log('click')
  }

  return (
    <>
    <AppBar 
      position = "sticky"
      sx = {{
        boxShadow: '0',
        backgroundColor: 'white',
        boxShadow: '0 0px 0px 1px #ECEDED',
        zIndex: 100,
        marginBottom: '1rem',
      }}
    >
      <StyledToolbar 
        disableGutters
        sx = {{
          height: height + 'px',
          display: 'flex',
          backgroundColor: 'white',
          justifyContent: "space-between",
        }} 
      >
        <img className = { classes.logo } src={require('../../components/Header/logo.png')} onClick={handleLogoClick} ></img>
        <div>
          <Grid container>
            <Stack 
              alignItems='center' 
              onClick={handleRecommendationsClick}
              sx = {{
                cursor: 'grab',
              }}
            >
              <AutoFixHighIcon 
                sx = {{
                  color: 'black',
                  fontSize: '25px',
                }}
              />
              <LatoTypography >Мои рекомендации</LatoTypography>
            </Stack>

            <Stack
              onClick={handleLoginClick}
              sx = {{
                alignItems: 'center',
                paddingLeft: '2rem',
                paddingRight: '1rem',
                cursor: 'grab',
              }}
            >
              <AccountCircleOutlinedIcon 
                sx = {{
                  color: 'black',
                  fontSize: '25px',
                }}
              />
              <LatoTypography>Вход</LatoTypography>
            </Stack>
          </Grid>
        </div>
      </StyledToolbar>
    </AppBar>
    </>
  );
}

export default WarehousePageHeader;