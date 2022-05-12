import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
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

            {firstWH.results[0].name}
            {secondWH?.results[0].name}
            {thirdWH?.results[0].name}
            {fourthWH?.results[0].name}
            {fifthWH?.results[0].name}
        </div>
    )
}