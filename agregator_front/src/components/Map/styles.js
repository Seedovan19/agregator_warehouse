import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  popup_image: {
    borderRadius: '12px',
    objectFit: 'cover',
  },
  popup: {
    "& .leaflet-popup-content p": {
      margin: 0,
    },
    "& .leaflet-popup-content": {
      margin: '5px 5px',
    },
  }
}));