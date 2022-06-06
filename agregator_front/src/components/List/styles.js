import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  loading: {
    height: '100%', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  container: {
    paddingRight: '19px',
  },
  list: {
    // maxHeight: '66vh',
    overflow: 'auto',
    zIndex: 0,
    position: 'relative',
    top: 190,
  },
}));