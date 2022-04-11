import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  loading: {
    height: '600px', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  container: {
    padding: '19px',
  },
  list: {
    maxHeight: 720 ,
    overflow: 'auto',
  },
}));