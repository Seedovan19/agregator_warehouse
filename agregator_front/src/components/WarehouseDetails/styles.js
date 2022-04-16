import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, spacing }) => ({
  picture_item: {

    display: 'block',
  },
  card_picture: {
    paddingTop: '10px',
    paddingBottom: '10px',
    height: '121px',
    display: 'block',
    borderRadius: '7px',
  },
  card_top_text: {
    fontFamily: 'Montserrat-medium',
    color: 'black',
    marginBottom: '15px',
    alignItems: 'top'
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
  },

  card: {
    backgroundColor: '#ffffff',
    border: '2px solid',
    borderColor: '#E7EDF3',
    borderRadius: 16,
    transition: '0.4s',
    '&:hover': {
      borderColor: '#5B9FED',
    },
  },
  media: {
    
    width: '88%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: spacing(-3),
    height: 0,
    paddingBottom: '48%',
    borderRadius: spacing(2),
    backgroundColor: '#fff',
    position: 'relative',
    [breakpoints.up('md')]: {
      width: '100%',
      marginLeft: spacing(-3),
      marginTop: 0,
      transform: 'translateX(-8px)',
    },
    '&:after': {
      content: '" "',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'linear-gradient(147deg, #fe8a39 0%, #fd3838 74%)',
      borderRadius: spacing(2), // 16
      opacity: 0.5,
    },
  },
  cta: {
    textTransform: 'initial',
  },
}));