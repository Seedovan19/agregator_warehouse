import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  mapContainer: {
    height: '79vh', 
    width: '100%',
    borderRadius: '10px'
  },

  markerContainer: {
    position: 'absolute', 
    transform: 'translate(-50%, -50%)', 
    zIndex: 1, 
    '&:hover': { zIndex: 2 },
  },

  pointer: {
    cursor: 'pointer',
  },
}));