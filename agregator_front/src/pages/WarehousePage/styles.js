import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    page_content: {
        display: 'flex',
        justifyContent: 'center',
        margin: '0 auto',
        position: 'relative',
    },
    go_back_link : {
        width: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        textAlign: 'center',
        paddingTop: '15px',
        paddingBottom: '15px',
        zIndex: 1000,
    },

    arrow_back: {
        position: 'relative',
        top: 0,
        height: '15px',
    },

    go_back_link_text: {
        fontFamily: 'Montserrat-Bold',
        fontSize: '15px',
        color: '#222942',
        textDecoration: 'underline',
        textDecorationColor: '#284AC2',
        textDecorationThickness: '2px',
        textUnderlinePosition: 'under',
        position: 'relative',
        zIndex: 1000,
    },

    apply_card_div :{
        position: '-webkit-sticky',
        position: 'sticky',
        top: '5.5rem',
        left: 0,
    }, 

    title: {
        fontFamily: 'Montserrat-medium',
        color: '#222942',
        fontSize: '17px',
        paddingBottom: '5px',
    },

    warehouse_id:{
        fontFamily: 'Lato-Light',
        fontSize: '13px',
        paddingBottom: '3px',
        color: '#4B4B4B'
    },

    warehouse_variant: {
        paddingTop: '7px',
        paddingBottom: '11px',
    },
    logo: {
        width: '135px',
        cursor: 'grab',
    },
    
}))