import React from 'react'
import Header from '../../components/Header/Header'
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link'
import RecommendationsSurvey from './RecommendationsSurvey/RecommendationsSurvey'
import { useNavigate } from "react-router-dom";
import useStyles from './styles'
import { styled } from '@mui/material/styles';
// import pallet from './media/pallet_pic.png'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


const GoBackDiv = styled('div')({ 
    width: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textAlign: 'center',
    paddingTop: '15px',
    paddingBottom: '15px',
});

const GoBackLink = styled(Link)({
    fontFamily: 'Montserrat-Bold',
    fontSize: '15px',
    color: '#222942',
    textDecoration: 'underline',
    textDecorationColor: '#284AC2',
    textDecorationThickness: '2px',
    textUnderlinePosition: 'under',
    position: 'relative',
});





const RecommendationsPage = () => {
    const classes = useStyles();
    const navigate = useNavigate();


    const handleBackClick = (event) => {
        let path = `/`; 
        navigate(path);
    }
    return (
        <div>
        <Header/>
            <Grid container sx= {{
                display: 'flex',
                justifyContent: 'center',
                margin: '0 auto',
                position: 'relative',
            }}>
            <Grid item md={7}>
            <GoBackDiv onClick={handleBackClick}>
                <ArrowBackIosIcon
                sx={{
                    position: 'relative',
                    top: 1,
                    height: '15px',
                }}
                />
                <GoBackLink
                    component="button" 
                    underline="always"
                >
                    К странице поиска
                </GoBackLink>
            </GoBackDiv>
            </Grid>
            </Grid>
            <Grid container className={classes.recommendations_window}>
                <Grid item md = {7}>
                    <RecommendationsSurvey/>
                </Grid>
            </Grid>
            {/* <img src={pallet} alt = "Pallete" className={classes.pallet_image}/> */}
        </div>
    )
}

export {RecommendationsPage}
