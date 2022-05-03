import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({ 
    mapContainer: {
        height: '40vh', width: '100%',
      },
      markerContainer: {
        position: 'absolute', transform: 'translate(-50%, -50%)', zIndex: 1, '&:hover': { zIndex: 2 },
      },
      pointer: {
        cursor: 'pointer',
      },
}))