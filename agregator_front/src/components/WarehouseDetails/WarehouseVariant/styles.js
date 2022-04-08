import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  card_top_text: {
    fontFamily: 'Montserrat-medium',
    color: 'black',
  },
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
}));