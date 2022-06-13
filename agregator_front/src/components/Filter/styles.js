import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  list: {
    marginTop: '2rem',
    paddingTop: '1rem',
    paddingBottom:0,
    background:'white',
    "& li":{
      fontWeight:200,
      paddingTop:7,
      paddingBottom:12,
    },
    "& li:hover":{
      background: "#284AC2",
      color: "#ffffff",
    },
    "& li.Mui-selected":{
      color:'#000',
      background: "#284AC2",
    },
    "& li.Mui-selected:hover":{
      background: "#284AC2",
      color: "#ffffff",
    }
  },
}));