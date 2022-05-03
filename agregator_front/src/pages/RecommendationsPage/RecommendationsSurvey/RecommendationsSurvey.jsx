import React, { Component, useState } from 'react'
import { Grid, Card, Typography, Button } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import FirstStep from '../Steps/FirstStep'
import SecondStep from '../Steps/SecondStep'
import ThirdStep from '../Steps/ThirdStep'
import FourthStep from '../Steps/FourthStep'
import { withStyles } from "@material-ui/core/styles";
import { deepPurple } from '@material-ui/core/colors';



const styles = theme => ({
  recommendations_window: {
    justifyContent: 'center',
    marginTop: '3rem',
},

recommendations_card: {
    boxShadow: '0px 0px 12px #32274414,0px 0px 1px #32274452,0px 8px 16px -8px #32274405',
    borderWidth: 0,
},

title: {
    fontFamily: 'Montserrat-medium',
    fontSize: '19px',
    paddingTop: '2rem',
    paddingBottom: '1rem',
},

stepper_number:{
    fontFamily: 'Lato-Light',
},

subtitle: {
    fontFamily: 'Montserrat-medium',
    paddingTop: '3rem',
    paddingBottom: '1rem',
    fontSize: '17px',
},

button: {
    // position: 'relative', 
    // top: 280,
    '& .MuiButton-root': {
      fontFamily: 'Lato-Bold',
      textTransform: 'none'
    }
},

icon_search:{
    color: 'black',
    userSelect: 'none',
    pointerEvents: 'none'
  },
  icon:{
    color: 'black',
    right: 12,
    position: 'absolute',
    userSelect: 'none',
    pointerEvents: 'none'
  },
  paper: {
    borderRadius: 12,
    marginTop: 8
  },
  list: {
    paddingTop:0,
    paddingBottom:0,
    background:'white',
    "& li":{
      fontWeight:200,
      paddingTop:12,
      paddingBottom:12,
    },
    "& li:hover":{
      background: deepPurple[100]
    },
    "& li.Mui-selected":{
      color:'white',
      background: deepPurple[400]
    },
    "& li.Mui-selected:hover":{
      background: deepPurple[500]
    }
  },
  filter_button: {
    backgroundColor: '#ffffff'
  }
})

class RecommendationsSurvey extends Component {

  state = {
    activeStep: 0,
    palletQuantity: '',
  }
  
  handleNext = () => {
      const { activeStep } = this.state;
      this.setState({
        activeStep: activeStep + 1
      });
  };
  
  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1
    });
  };

  handleChange = input => e => {
    this.setState({[input]: e.target.value});
  }
  
  handleSubmit = () => {
    // http://127.0.0.1:5000/recommendations/?user=USER_NAME
  }

  render() {
    const steps = 4;
    const { activeStep } = this.state;
    const {palletQuantity} = this.state;
    const values = { palletQuantity };
    const { classes } = this.props;
    switch(activeStep) {
        case 0:
          return (
            <Card variant="outlined" className={classes.recommendations_card}>
              <Grid container justifyContent='center'>
                <Grid item md = {2} className={classes.button}>
                  <Stack>
                    <Button 
                      onClick={this.handleBack}
                      disabled={activeStep === 0}
                      className={classes.button_text} 
                    >
                      <KeyboardArrowLeft />
                      Назад
                    </Button>
                  </Stack>
                </Grid>
                <Grid item md = {7}>
                  <Stack alignItems='center'>
                    <Typography className={classes.title}>Пройдите опрос и получите рекомендации!</Typography>
                    <Typography className={classes.stepper_number}>{activeStep}/3</Typography>
                    <MobileStepper
                        variant="progress"
                        steps={steps}
                        position="static"
                        activeStep={activeStep}
                        sx={{ width: '400px', justifyContent:'center' }}
                    />
                    <Typography className={classes.subtitle}>Укажите тип товара или условия хранения</Typography>
                    <FirstStep
                      handleBack={this.handleBack}
                      handleNext={this.handleNext}
                    />
                  </Stack>
                </Grid>
                <Grid item md = {2} className={classes.button}>
                  <Stack>
                    <Button 
                      onClick={this.handleNext}
                      disabled={activeStep === steps-1}
                      className={classes.button_text}
                    >
                      Вперед
                      <KeyboardArrowRight />
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Card>
          )
        case 1:
          return (
            <Card variant="outlined" className={classes.recommendations_card}>
              <Grid container justifyContent='center'>
                <Grid item md = {2} className={classes.button}>
                  <Stack>
                    <Button 
                      onClick={this.handleBack}
                      disabled={activeStep === 0}
                      className={classes.button_text} 
                    >
                      <KeyboardArrowLeft />
                      Назад
                    </Button>
                  </Stack>
                </Grid>
                <Grid item md = {7}>
                  <Stack alignItems='center'>
                    <Typography className={classes.title}>Пройдите опрос и получите рекомендации!</Typography>
                    <Typography className={classes.stepper_number}>{activeStep}/3</Typography>
                    <MobileStepper
                        variant="progress"
                        steps={steps}
                        position="static"
                        activeStep={activeStep}
                        sx={{ width: '400px', justifyContent:'center' }}
                    />
                    <Typography className={classes.subtitle}>Выберите класс склада и желаемое местоположение</Typography>
                    <SecondStep
                      handleBack={this.handleBack}
                      handleNext={this.handleNext}
                    />
                  </Stack>
                </Grid>
                <Grid item md = {2} className={classes.button}>
                  <Stack>
                    <Button 
                      onClick={this.handleNext}
                      disabled={activeStep === steps-1}
                      className={classes.button_text}
                    >
                      Вперед
                      <KeyboardArrowRight />
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Card>
          )
        case 2:
          return (
            <Card variant="outlined" className={classes.recommendations_card}>
              <Grid container justifyContent='center'>
                <Grid item md = {2} className={classes.button}>
                  <Stack>
                    <Button 
                      onClick={this.handleBack}
                      disabled={activeStep === 0}
                      className={classes.button_text} 
                    >
                      <KeyboardArrowLeft />
                      Назад
                    </Button>
                  </Stack>
                </Grid>
                <Grid item md = {7}>
                  <Stack alignItems='center'>
                    <Typography className={classes.title}>Пройдите опрос и получите рекомендации!</Typography>
                    <Typography className={classes.stepper_number}>{activeStep}/3</Typography>
                    <MobileStepper
                        variant="progress"
                        steps={steps}
                        position="static"
                        activeStep={activeStep}
                        sx={{ width: '400px', justifyContent:'center' }}
                    />
                    <Typography className={classes.subtitle}>Выберите необходимые услуги</Typography>
                    <ThirdStep
                      values = {values}
                      handleChange = {this.handleChange}
                      handleBack={this.handleBack}
                      handleNext={this.handleNext}
                    />
                  </Stack>
                </Grid>
                <Grid item md = {2} className={classes.button}>
                  <Stack>
                    <Button 
                      onClick={this.handleNext}
                      disabled={activeStep === steps-1}
                      className={classes.button_text}
                    >
                      Вперед
                      <KeyboardArrowRight />
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Card>
          )
        case 3:
          return (
            <Card variant="outlined" className={classes.recommendations_card}>
              <Grid container justifyContent='center'>
                <Grid item md = {2} className={classes.button}>
                  <Stack>
                    <Button 
                      onClick={this.handleBack}
                      disabled={activeStep === 0}
                      className={classes.button_text} 
                    >
                      <KeyboardArrowLeft />
                      Назад
                    </Button>
                  </Stack>
                </Grid>
                <Grid item md = {7}>
                  <Stack alignItems='center'>
                    <Typography className={classes.title}>Пройдите опрос и получите рекомендации!</Typography>
                    <Typography className={classes.stepper_number}>{activeStep}/3</Typography>
                    <MobileStepper
                        variant="progress"
                        steps={steps}
                        position="static"
                        activeStep={activeStep}
                        sx={{ width: '400px', justifyContent:'center' }}
                    />
                    <Typography className={classes.subtitle}>Контактные данные</Typography>
                    <FourthStep
                      handleBack={this.handleBack}
                      handleNext={this.handleNext}
                    />
                  </Stack>
                </Grid>
                <Grid item md = {2} className={classes.button}>
                  <Stack>
                    <Button 
                      onClick={this.handleNext}
                      disabled={activeStep === steps-1}
                      className={classes.button_text}
                    >
                      Вперед
                      <KeyboardArrowRight />
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Card>
          )
    }
  }
}

export default withStyles(styles, { withTheme: true })(RecommendationsSurvey);