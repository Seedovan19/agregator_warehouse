import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({

    recommendations_window: {
        justifyContent: 'center',
        marginTop: '3rem',
    },

    pallet_image: {
        height: '19rem', 
        width: '19rem',
        position: 'absolute',
        bottom: -70,
        right: -45,
        transform: 'rotate(-19deg)'
    }
}))