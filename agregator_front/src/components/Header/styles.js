import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  menu_rectangle: {
    marginTop: '35px',
    marginBottom: '40px',
    backgroundColor: 'white',
    boxShadow: '0px 1px 10px 2px #E6E6E6',
  },
  toolbar: {
    height:'95px',
    display: 'flex',
    backgroundColor: 'white',
    justifyContent: "space-between",
  },
  logo: {
    width: '200px'
  },
  button_login: {
    color: "black",
    marginRight: '25px',
  },
  button_sign_up: {
    color: "white",
    backgroundColor: "blue"
  }
}));