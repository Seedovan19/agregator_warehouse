import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  popup_image: {
    borderRadius: '5px',
  },
  popup: {
    "& .leaflet-popup-content p": {
      margin: 0,
    }
  }
}));