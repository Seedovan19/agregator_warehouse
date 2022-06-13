import React from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack';
import { styled } from '@mui/system';
import { useGradientBtnStyles } from '@mui-treasury/styles/button/gradient';


const CardStyledTypography = styled(Typography)({
    fontFamily: 'Lato-Regular',
    fontSize: '13px',
    color: '#4D4D4D',
    marginBottom: '0.5rem'
});

const PhoneTypography = styled(Typography)({
    fontFamily: 'Montserrat-Bold',
    fontSize: '17px',
    color: '#222942',
    textDecoration: 'underline',
    textDecorationColor: '#284AC2',
    textDecorationThickness: '1px',
    textUnderlinePosition: 'under',

});

const ApplyCard = styled(Card)({
    boxShadow: '0px 0px 7px #32274414,0px 0px 1px #32274405,0px 7px 15px -7px #32274414',
    height: '13rem',
    width: '19rem',
    marginLeft: '2rem',
    alignItems: 'center',
    justifyContent: 'center',
});
  

const ApplicationCard = () => {
      
    const chubbyStyles = useGradientBtnStyles({ chubby: true });
    return (
        <ApplyCard variant="outlined">
            <Stack alignItems='center'>
                <Button classes={chubbyStyles} sx ={{
                        marginTop: '2.7rem',
                        marginBottom: '0.5rem',
                        transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                        background:'linear-gradient(to right, #5E81FF, #284AC2)',
                        width: '75%',
                        borderRadius: '7px',
                        color: '#ffffff',
                        fontFamily: 'Lato-Bold',
                        fontSize: '17px',
                        textTransform: 'none',
                    }}>
                        Оставьте заявку
                    </Button>
                <Button 
                    color="primary" 
                    
                >
                    
                </Button>
                <CardStyledTypography>Либо звоните по любым вопросам:</CardStyledTypography>
                <PhoneTypography>+7(904)613-94-60</PhoneTypography>
            </Stack>
        </ApplyCard>
    )
}

export {ApplicationCard}