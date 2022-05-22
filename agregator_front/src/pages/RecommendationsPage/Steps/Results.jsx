import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';


export default function Results({ firstWH, secondWH, thirdWH, fourthWH, fifthWH, handleBack }) {

    return (
        <div>
            <Button 
                onClick={handleBack}
            >
                <KeyboardArrowLeft />
                Назад
            </Button>
            <Grid container>
                <Card variant="outlined" >
                    {firstWH.results[0].name}
                </Card>
                <Card variant="outlined" >
                    {secondWH?.results[0].name}
                </Card>
                <Card variant="outlined" >
                    {thirdWH?.results[0].name}
                </Card>
                <Card variant="outlined" >
                    {fourthWH?.results[0].name}
                </Card>
                <Card variant="outlined" >
                    {fifthWH?.results[0].name}
                </Card>
            </Grid>
        </div>
    )
}