import React from 'react'
import { Grid, Typography, Box, Button } from '@mui/material'
import Controls from '../../components/controls/Controls'
import { styled } from '@mui/material/styles';

const StyledBox = styled(Box)({
    height: '2.5rem',
    backgroundColor: '#E7E9FE',
    boxShadow: '0px 0px 12px #32274414,0px 0px 1px #32274452,0px 8px 16px -8px #32274405',
    border: '1px solid',
    borderColor: '#4F75FF',
    borderRadius: '7px',
})

const StyledButton = styled(Button)({
    height: '2.5rem',
    fontFamily: 'Lato-Bold',
    textTransform: 'None',
    color: '#284AC2',
    backgroundColor: '#ffffff',
    border: '1px solid',
    borderColor: '#284AC2',
    borderRadius: '7px',
})


export default function Feedback({setModalFeedbackActive}) {

    return (
        <div>
        <Grid container spacing={1}>
        <Grid item>
        <StyledBox component="div">
            <Grid container margin="auto">
            <Grid item>
                
            </Grid>
            <Grid item>
                <Typography 
                    sx ={{ 
                        fontFamily: 'Lato-Regular',
                        fontSize: '14px',
                    }} 
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
                > 
                    +7 (904) 613-94-60
                </Typography>
            </Grid>
            </Grid>
        </StyledBox>

        </Grid>
        <Grid item>
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
