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
        marginBottom: '10px',
        
    },

    go_back_link_text: {
        fontFamily: 'Lato-Regular',
        fontSize: '17px',
        color: 'black',
        textDecoration: 'underline',
        textDecorationColor: '#8046F1',
        textDecorationThickness: '2px',
        textUnderlinePosition: 'under',
        position: 'relative',

    },

    apply_card_div :{
        position: '-webkit-sticky',
        position: 'sticky',
        top: '1.5rem',
        left: 0,
    },

    apply_card: {
        minWidth: '320px',
        height: '200px',
        marginLeft: '2rem',
    }
}))