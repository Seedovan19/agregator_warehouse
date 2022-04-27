import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  menu_rectangle: {
    marginTop: '35px',
    // marginBottom: '40px',
    backgroundColor: 'white',
    boxShadow: '0px 0px 12px #32274414,0px 0px 1px #32274452,0px 8px 16px -8px #32274405',
  },

  toolbar: {
    height:'90px',
    display: 'flex',
    backgroundColor: 'white',
    justifyContent: "space-between",
  },

  logo: {
    width: '200px'
  },

  button_login: {
    color: "black",
  },

  button_recomendations: {
    color: "black",
  },

  recomendations_text: {
    color: "black",
    fontFamily: "Lato-Regular",
    fontSize: "13px",
  },

  login_text: {
    color: "black",
    fontFamily: "Lato-Regular",
    fontSize: "13px",
  },
}));