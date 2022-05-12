import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import { Form } from '../../../components/UseForm/UseForm';
import Controls from '../../../components/controls/Controls';
import { getRecommendations, RetrieveTopNRecs } from '../../../api/recommendations'
import { styled } from '@mui/material/styles';


export default function FourthStep({ values, handleChange, handleWH, handleNext, isLoading, handleIsLoading, activeStep, submitSignal }) {
    useEffect(() => {
        getRecommendations(values)
        .then((data) => {
            var data_object = JSON.parse(data['Indexes'])
            RetrieveTopNRecs(data_object[0])
            .then((firstWH) => {
                handleWH('firstWH', firstWH)
            })
            RetrieveTopNRecs(data_object[1])
            .then((secondWH) => {
                handleWH('secondWH', secondWH)
            })
            RetrieveTopNRecs(data_object[2])
            .then((thirdWH) => {
                handleWH('thirdWH', thirdWH)
            })
            RetrieveTopNRecs(data_object[3])
            .then((fourthWH) => {
                handleWH('fourthWH', fourthWH)
            })
            RetrieveTopNRecs(data_object[4])
            .then((fifthWH) => {
                handleWH('fifthWH', fifthWH)
                handleIsLoading(isLoading)
            })
        })
    }, [submitSignal]);

    return (
        <div>  
        <Box sx = {{
            width: '30rem',
            margin: "0 auto",
            marginBottom: "15px",
            textAlign: "center",
        }}>
        <Form >
            
                <Controls.Input
                    name = 'fullName'
                    label = 'Введите имя'
                    value={values.fullName}
                />
                <Controls.Input
                    label = 'Введите email'
                    name = 'email'
                    value = {values.email}
                />
                <Controls.Input
                    label = 'Введите номер телефона'
                    name = 'mobile'
                    value = {values.mobile}
                />
                <Controls.Input
                    label = 'Введите компанию'
                    name = 'company'
                    value = {values.company}
                />
                <Box sx = {{
                    marginTop: "1rem",
                }}>
                <Controls.Button
                    variant = 'contained'
                    color = 'primary'
                    size = 'large'
                    text = 'Опубликовать'
                    onClick = {() => {
                        handleNext();
                        submitSignal = 1;
                        submitSignal = 0;
                    }}
                />
                </Box>
        </Form>
        </Box>
        </div>
    )
}