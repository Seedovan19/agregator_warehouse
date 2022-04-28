import React from 'react'
import { AppBar, Toolbar, Grid, Typography, Button } from '@material-ui/core'
import Stack from '@mui/material/Stack';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useNavigate } from "react-router-dom";
import useStyles from './styles'



const Header = () => {
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
    <AppBar className = { classes.menu_rectangle } position = "static">
      <Toolbar className={ classes.toolbar }  >
        <img className = { classes.logo } src={require('./logo.png')} onClick={handleLogoClick} ></img>
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
                className = { classes.button_recomendations}
                sx = {{
                  fontSize: '30px',
                }}
              />
              <Typography className = { classes.recomendations_text}>Мои рекомендации</Typography>
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
                className = { classes.button_login}
                sx = {{
                  fontSize: '30px',
                }}
              />
              <Typography className = { classes.login_text} >Вход</Typography>
            </Stack>
          </Grid>
          {/* <Button className={ classes.button_sign_up } variant="contained">Регистрация</Button> */}
        </div>
      </Toolbar>
    </AppBar>
    </>
  );
}

export default Header;