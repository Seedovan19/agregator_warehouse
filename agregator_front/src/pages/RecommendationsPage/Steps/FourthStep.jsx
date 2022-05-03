import React from 'react'
import Grid from '@mui/material/Grid';
import { useForm, Form } from '../../../components/UseForm/UseForm';
import Controls from '../../../components/controls/Controls';
import useStyles from './styles';
import { styled } from '@mui/material/styles';


const initialFValues = {
    fullName: '',
    email: '',
    mobile: '',
    company: '',
}

export default function FourthStep() {
    const classes = useStyles();
    const { 
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues)

    return (
        <div>  
        <Form >
            <Grid container>
            <Grid item xs = {12}>
                <Controls.Input
                        name = 'fullName'
                        label = 'Введите имя'
                        value={values.fullName}
                        onChange={handleInputChange}
                        error={errors.fullName}
                />
                <Controls.Input
                        label = 'Введите email'
                        name = 'email'
                        value = {values.email}
                        onChange = {handleInputChange}
                        error={errors.fullName}
                />
                <Controls.Input
                        label = 'Введите номер телефона'
                        name = 'mobile'
                        value = {values.mobile}
                        onChange = {handleInputChange}
                        error={errors.fullName}
                />
                <Controls.Input
                        label = 'Введите компанию'
                        name = 'company'
                        value = {values.company}
                        onChange = {handleInputChange}
                        error={errors.fullName}
                />
            <Grid item xs = {12}>
                <Controls.Button
                    variant = 'contained'
                    color = 'primary'
                    size = 'large'
                    text = 'Опубликовать'
                />
            </Grid>
            </Grid>
            </Grid>
        </Form>
        </div>
    )
}