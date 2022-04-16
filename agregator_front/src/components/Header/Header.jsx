import React from 'react'
import { AppBar, Toolbar, Button } from '@material-ui/core'
import useStyles from './styles'

const Header = () => {
  const classes = useStyles();

  return (
    <>
    <AppBar className = { classes.menu_rectangle } position = "static">
      <Toolbar className={ classes.toolbar }  >
        <img className = { classes.logo } src={require('./logo.png')} onClick={() => window.open('/', '_blank')} ></img>
        <div>
          <Button href={'/login'} className={ classes.button_login} >Вход</Button>
          <Button className={ classes.button_sign_up } variant="contained">Регистрация</Button>
        </div>
      </Toolbar>
    </AppBar>
    </>
  );
}

export default Header;