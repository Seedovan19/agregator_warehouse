import React from 'react'
import { AppBar, Toolbar, Button, Box } from '@material-ui/core'
import useStyles from './styles'

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={ classes.toolbar }>
        <img className = { classes.logo } src={require('./logo.png')} onClick={() => window.open('/', '_blank')} ></img>
        <Box mr={3}>
          <Button className={ classes.button_login} >Вход</Button>
        </Box>
        <Button className={ classes.button_sign_up} variant="contained">Регистрация</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;