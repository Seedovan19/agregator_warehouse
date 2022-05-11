import React from 'react'
import Grid from '@mui/material/Grid';
import { useForm, Form } from '../../../components/UseForm/UseForm';
import Controls from '../../../components/controls/Controls';
import useStyles from './styles';
import { getRecommendations } from '../../../api/recommendations'
import { styled } from '@mui/material/styles';


export default function FourthStep({ values, handleChange }) {
    const classes = useStyles();

    const handleSubmit = () => {
        getRecommendations(values)
        .then((data) => {
            console.log(data)
        })
    }
        
    return (
        <div>  
        <Form >
            <Grid container>
            <Grid item xs = {12}>
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
            <Grid item xs = {12}>
                <Controls.Button
                    variant = 'contained'
                    color = 'primary'
                    size = 'large'
                    text = 'Опубликовать'
                    onClick = {handleSubmit}
                />
            </Grid>
            </Grid>
            </Grid>
        </Form>
        </div>
    )
}