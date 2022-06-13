import React from 'react'
import { Stack, Grid, Typography, Box, Button } from '@mui/material'
import { styled } from '@mui/material/styles';
import CallIcon from '@mui/icons-material/Call';

const featuresHeight = '2.5rem';

const StyledBox = styled(Box)({
    height: featuresHeight,
    backgroundColor: '#E7E9FE',
    boxShadow: '0px 0px 12px #32274414,0px 0px 1px #32274452,0px 8px 16px -8px #32274405',
    border: '1px solid',
    borderColor: '#4F75FF',
    borderRadius: '10px',
})

const StyledButton = styled(Button)({
    height: featuresHeight,
    fontFamily: 'Lato-Bold',
    textTransform: 'None',
    color: '#284AC2',
    backgroundColor: '#ffffff',
    border: '1px solid',
    borderColor: '#284AC2',
    borderRadius: '10px',
    ":hover": {
        backgroundColor: '#284AC2',
        color: '#ffffff',
    },
})


export default function Feedback({setModalFeedbackActive}) {

    return (
        <div>
            <Grid 
                container
                sx ={{
                    justifyContent: 'space-between',
                }}
            >
                <Grid item>
                <StyledBox 
                    component="div"
                >
                    <Stack 
                        direction = 'row' 
                        spacing={1.5}
                        sx = {{
                            height: featuresHeight,
                            alignItems: 'center',
                            paddingLeft: '0.5rem',
                            paddingRight: '0.5rem',
                        }}
                    >
                        <Box sx = {{
                            height: '1.7rem',
                            width: '1.7rem',
                            backgroundColor: '#284AC2',
                            borderRadius: '7px',
                            textAlign: 'center',
                            paddingTop: '0.20rem'
                        }}>
                            <CallIcon 
                                fontSize="medium"
                                sx = {{
                                    color: 'white',
                                    alignSelf: 'center'
                                }}
                            />
                        </Box>
                        <Typography 
                            sx ={{ 
                                fontFamily: 'Lato-Regular',
                                fontSize: '14px',
                                color: '#45464C',
                            }} 
                        >
                                Звоните по всем вопросам!
                        </Typography>
                        <Typography
                            sx = {{ 
                                fontFamily: 'Lato-Bold',
                                fontSize: '15px',
                                color: '#284AC2',
                            }}
                        > 
                            +7 (904) 613-94-60
                        </Typography>
                    </Stack>
                </StyledBox>

                </Grid>
                <Grid item>
                    <StyledButton
                        variant="outlined" 
                        onClick={() => setModalFeedbackActive(true)}
                        label="Свяжитесь с нами!"
                    >
                        Свяжитесь с нами!
                    </StyledButton>
                </Grid>
            </Grid>
        </div>

        
  )
}
