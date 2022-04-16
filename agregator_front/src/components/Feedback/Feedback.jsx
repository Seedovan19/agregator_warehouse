import React from 'react'
import { Grid, Typography, Paper } from '@mui/material'
import Controls from '../../components/controls/Controls'
import useStyles from './styles';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    feedback_text: {
        fontSize: '12px',
    },
    phone_number: {
        fontSize: '12px',
    }
}));

export default function Feedback({setModalFeedbackActive}) {
    const classes = useStyles();

    return (
        <div>
        <Grid container>
        <Grid item md = {7}>
        <Paper >
            <Grid container>
            <Grid item>
                
            </Grid>
            <Grid item>
                <Typography className="feedback_text">Звоните по всем вопросам!</Typography>
            </Grid>
            <Grid item>
                <Typography className={classes.phone_number}> +7 (904) 613-94-60</Typography>
            </Grid>
            </Grid>
        </Paper>

        </Grid>
        <Grid item md = {5}>
            <Controls.Button
                variant="outlined" 
                onClick={() => setModalFeedbackActive(true)}
                text="Свяжитесь с нами!"
            />
        </Grid>
        </Grid>
        </div>

        
  )
}
