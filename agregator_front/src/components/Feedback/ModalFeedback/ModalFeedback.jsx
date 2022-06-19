import React from 'react'
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import {useForm, Form} from '../../UseForm/UseForm';
import Controls from '../../controls/Controls';
import useStyles from './styles';


const initialFValues = {
    fullName: '',
    email: '',
    mobile: '',
    company: '',
}

export default function ModalFeedback(props) {
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
        <Dialog
            open={props.modalFeedbackActive}
            onClose={() => props.setModalFeedbackActive(false)}
            fullWidth={false}
            maxWidth={'md'}
        >
            <DialogTitle>
                Оставьте контактные данные
            </DialogTitle>
            <DialogContent dividers>
            <div className={classes.pageContent} >
            <Form >
                <Grid container sx = {{textAlign: 'center'}}>
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
                <Grid item xs = {12} sx = {{marginTop: '1.5rem'}}>
                    <Controls.Button
                        variant = 'contained'
                        color = 'primary'
                        size = 'large'
                        text = 'Отправить'
                    />
                </Grid>
                </Grid>
                </Grid>
            </Form>
            </div>
            </DialogContent>
        </Dialog>
  )
}
