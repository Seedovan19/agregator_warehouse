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
      color:'#ffffff',
      background: "#284AC2",
    },
    "& li.Mui-selected:hover":{
      backgroundColor: "rgba(25, 118, 210, 0.2)",
      color: "#000",
    },
    "& .MuiMenuItem-root.Mui-selected.Mui-focusVisible" : {
      background: "#284AC2",
    },
    "& .MuiMenuItem-root:hover": {
      backgroundColor: "rgba(25, 118, 210, 0.2)",
      color: "#000",
    }
  },
}));