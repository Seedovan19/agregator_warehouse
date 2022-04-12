import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  card_container: {
    paddingLeft: 0, 
    paddingRight: 0,
  },
  picture_item: {
    margin: 'auto',
    paddingLeft: '17px',
    paddingRight: '25px',
    display: 'block',
  },
  card_picture: {
    height: '132px',
    borderRadius: '7px',
  },
  card_top_text: {
    fontFamily: 'Montserrat-medium',
    color: 'black',
  },
  cost_text:{
    fontFamily: 'Montserrat-medium',
    fontSize: '10px',
    color: 'black',
    alignItems: 'flex-end',
  },
  highlighted_cost_text:{
    fontFamily: 'Montserrat-medium',
    fontSize: '150%',
    color: '#0C4284',
    paddingRight: '3px',
    paddingLeft: '3px',
  }
}));