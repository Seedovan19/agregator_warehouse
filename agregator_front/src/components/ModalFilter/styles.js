import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  modal: {
    height: '100vh',
    width: '100vw',
  },

  default_chip: {
    fontFamily: 'Lato-Bold',
    fontSize: '11px',
    color: '#000000',
    borderColor: '#CED3D4',
  },

  checked_chip: {
    fontFamily: 'Lato-Bold',
    fontSize: '11px',
    color: '#002DF3',
    borderColor: '#002DF3',
  },

  root: {
    '&:hover': {
      backgroundColor: 'transparent !important'
    }
  },
}));