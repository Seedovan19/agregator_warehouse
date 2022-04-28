import React from 'react'
import { Grid, Typography, Box, Button } from '@mui/material'
import Controls from '../../components/controls/Controls'
import { styled } from '@mui/material/styles';
import {makeStyles} from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    feedback_text: {
        fontFamily: 'Lato-Regular',
        fontSize: '122px',
    },
    phone_number: {
        fontSize: '12px',
    }
}));

const StyledBox = styled(Box)({
    height: '40px',
    backgroundColor: '#E7E9FE',
    boxShadow: '0px 0px 12px #32274414,0px 0px 1px #32274452,0px 8px 16px -8px #32274405',
    border: '1px solid',
    borderColor: '#4F75FF',
    borderRadius: '7px',
})

const StyledButton = styled(Button)({
    height: '40px',
    fontFamily: 'Lato-Bold',
    textTransform: 'None',
    color: '#284AC2',
    backgroundColor: '#ffffff',
    border: '1px solid',
    borderColor: '#284AC2',
    borderRadius: '7px',
})


export default function Feedback({setModalFeedbackActive}) {
    const classes = useStyles();

    return (
        <div>
        <Grid container>
        <Grid item md = {7}>
        <StyledBox  component="div">
            <Grid container spacing={1} margin="auto">
            <Grid item>
                
            </Grid>
            <Grid item>
                <Typography 
                    sx ={{ 
                        fontFamily: 'Lato-Regular',
                        fontSize: '14px',
                    }} 
                    className="classes.feedback_text"
                >
                        Звоните по всем вопросам!
                </Typography>
            </Grid>
            <Grid item>
                <Typography
                    sx = {{ 
                        fontFamily: 'Lato-Bold',
                        fontSize: '15px',
                    }}
                    className={classes.phone_number}
                > 
                    +7 (904) 613-94-60
                </Typography>
            </Grid>
            </Grid>
        </StyledBox>

        </Grid>
        <Grid item md = {5}>
            <StyledButton
                variant="outlined" 
                onClick={() => setModalFeedbackActive(true)}
                label="Свяжитесь с нами!"
            >Свяжитесь с нами!</StyledButton>
        </Grid>
        </Grid>
        </div>

        
  )
}
