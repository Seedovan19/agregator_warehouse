import React from 'react'
import Box from '@mui/material/Box';
import { Form } from '../../../components/UseForm/UseForm';
import Controls from '../../../components/controls/Controls';
import { getRecommendations } from '../../../api/recommendations'
import { styled } from '@mui/material/styles';


export default function FourthStep({ values, handleChange }) {

    const handleSubmit = () => {
        getRecommendations(values)
        .then((data) => {
            console.log(data)
        })
    }
    return (
        <div>  
        <Box sx = {{
            width: '30rem',
            margin: "0 auto",
            marginBottom: "15px",

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

                <Controls.Button
                    variant = 'contained'
                    color = 'primary'
                    size = 'large'
                    text = 'Опубликовать'
                    onClick = {handleSubmit}
                />
        </Form>
        </Box>
        </div>
    )
}