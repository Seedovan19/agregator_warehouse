import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
    recommendations_window: {
        justifyContent: 'center',
        marginTop: '3rem',
    },

    recommendations_card: {
        boxShadow: '0px 0px 12px #32274414,0px 0px 1px #32274452,0px 8px 16px -8px #32274405',
        borderWidth: 0,
    },

    title: {
        fontFamily: 'Montserrat-medium',
        fontSize: '19px',
        paddingTop: '2rem',
        paddingBottom: '1rem',
    },

    stepper_number:{
        fontFamily: 'Lato-Light',
    },

    subtitle: {
        fontFamily: 'Montserrat-medium',
        paddingTop: '3rem',
        paddingBottom: '1rem',
        fontSize: '17px',
    },

    button: {
        // position: 'relative', 
        // top: 280,
        '& .MuiButton-root': {
          fontFamily: 'Lato-Bold',
          textTransform: 'none'
        }
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
      filter_button: {
        backgroundColor: '#ffffff'
      }
}))
