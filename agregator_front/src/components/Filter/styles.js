import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  select: {
    minWidth: 200,
    background: 'white',
    color: deepPurple[500],
    fontWeight:200,
    borderStyle:'none',
    borderWidth: 2,
    borderRadius: 12,
    paddingLeft: 24,
    paddingTop: 14,
    paddingBottom: 15,
    "&:focus":{
      borderRadius: 12,
      background: 'white',
      borderColor: deepPurple[100]
    },
  },
  icon_search:{
    color: 'black',
    userSelect: 'none',
    pointerEvents: 'none'
  },
  icon:{
    color: 'black',
    right: 12,
    position: 'absolute',
    userSelect: 'none',
    pointerEvents: 'none'
  },
  paper: {
    borderRadius: 12,
    marginTop: 8
  },
  list: {
    paddingTop:0,
    paddingBottom:0,
    background:'white',
    "& li":{
      fontWeight:200,
      paddingTop:12,
      paddingBottom:12,
    },
    "& li:hover":{
      background: deepPurple[100]
    },
    "& li.Mui-selected":{
      color:'white',
      background: deepPurple[400]
    },
    "& li.Mui-selected:hover":{
      background: deepPurple[500]
    }
  },
  filter_button: {
    backgroundColor: '#ffffff'
  }
}));