import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  label: {
    fontFamily: 'Montserrat-bold',
    fontSize: '10px',
    border: '0px',
    height: '15px', 
    // marginTop: '15px',
    marginBottom: '15px',
    marginRight: '10px',
  },

  from_company: {
    color: '#FFB625',
    backgroundColor: '#FFE5B2',
  },

  three_pl: {
    color: '#0000EA',
    backgroundColor: '#CCCCFB',
  },

  only_storage: {
    color: '#00BC12',
    backgroundColor: '#CCF2D0',
  },

  long_term_storage: {
    color: '#0093ED',
    backgroundColor: '#CCE9FB',
  },
}));