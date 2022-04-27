import React from 'react'
import Header from '../../components/Header/Header'
import { Grid } from '@material-ui/core';
import RecommendationsSurvey from './RecommendationsSurvey/RecommendationsSurvey'
import useStyles from './styles'
import pallet from './media/pallet_pic.png'

const RecommendationsPage = () => {
    const classes = useStyles();
    
    return (
        <div>
        <Header/>
            <Grid container className={classes.recommendations_window}>
                <Grid item md = {7}>
                    <RecommendationsSurvey/>
                </Grid>
            </Grid>
            <img src={pallet} alt = "Pallete" className={classes.pallet_image}/>
        </div>
    )
}

export {RecommendationsPage}
