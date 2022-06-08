import React, { Component, useState } from 'react'
import { Card, Typography, Button } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import MobileStepper from '@mui/material/MobileStepper';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import FirstStep from '../Steps/FirstStep'
import SecondStep from '../Steps/SecondStep'
import ThirdStep from '../Steps/ThirdStep'
import FourthStep from '../Steps/FourthStep'
import Results from '../Steps/Results'
import { withStyles } from "@material-ui/core/styles";
import { deepPurple } from '@material-ui/core/colors';
import { styled } from '@mui/material/styles';

const SubtitleTypography = styled(Typography)({
  fontFamily: 'Montserrat-medium',
  paddingTop: '1rem',
  paddingBottom: '1rem',
  fontSize: '17px',
  textAlign: 'center',
});

const styles = theme => ({

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

button: {
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
    isLoading: true,
    product_type: '',
    condition: '', 
    freezer: false, 
    refrigerator: false, 
    alcohol: false, 
    pharmaceuticals: false, 
    food: false, 
    dangerous: false,
    warehouse_class: '',
    wh_latlon: [59.9386, 30.3141],
    transport_services: false,
    custom: false,
    crossdock: false,
    palletization: false,
    box_pick: false,
    leveling_platform: false,
    railways: false,
    palletQuantity: '',
    long_term_commitment: false,
    fullName: '',
    email: '',
    mobile: '',
    company: '',
    comment: '',
    firstWH: null,
    secondWH: null,
    thirdWH: null,
    fourthWH: null,
    fifthWH: null,
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

  handleWhLatLonChange = e => {
    this.setState({
      'wh_latlon': [e.latlng.lat, e.latlng.lng]
    });
  }

  handleSelectChange = input => {
    this.setState({[input]: true})
  };

  handleUnselectChange = input => {
    this.setState({[input]: false})
  };
  
  handleIsLoading = (e) => {
    this.setState({'isLoading': !e})
  }

  handleWH = (input, e) => {
    this.setState({[input]: e})
  }

  render() {
    const steps = 4;
    const submitSignal = 0;
    const { activeStep } = this.state;
    const { isLoading } = this.state
    const { firstWH, secondWH, thirdWH, fourthWH, fifthWH } = this.state
    const { product_type, condition, freezer, refrigerator, alcohol, pharmaceuticals, food, dangerous, warehouse_class, wh_latlon, transport_services, custom, crossdock, palletization, box_pick, leveling_platform, railways, palletQuantity, long_term_commitment, fullName, email, mobile, company, comment } = this.state;
    const values = { product_type, condition, freezer, refrigerator, alcohol, pharmaceuticals, food, dangerous, warehouse_class, wh_latlon, transport_services, custom, crossdock, palletization, box_pick, leveling_platform, railways, palletQuantity, long_term_commitment, fullName, email, mobile, company, comment };
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
                    <SubtitleTypography>Укажите тип товара или условия хранения</SubtitleTypography>
                    <FirstStep
                      handleSelectChange = {this.handleSelectChange}
                      handleUnselectChange = {this.handleUnselectChange}
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
                    <SubtitleTypography>Выберите класс склада и желаемое местоположение</SubtitleTypography>
                    <SecondStep
                      values = {values}
                      handleChange = {this.handleChange}
                      handleWhLatLonChange = {this.handleWhLatLonChange}
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
                    <SubtitleTypography>Выберите необходимые услуги</SubtitleTypography>
                    <ThirdStep
                      values = {values}
                      handleChange = {this.handleChange}
                      handleSelectChange = {this.handleSelectChange}
                      handleUnselectChange = {this.handleUnselectChange}
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
                    <SubtitleTypography>Контактные данные</SubtitleTypography>
                    <FourthStep
                    
                      handleWH = {this.handleWH}
                      handleIsLoading = {this.handleIsLoading}
                      isLoading = {isLoading}
                      activeStep = {activeStep}
                      values = {values}
                      handleChange = {this.handleChange}
                      handleNext={this.handleNext}
                      submitSignal = {submitSignal}
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
        case 4:
          return (
            <div>
            { isLoading ? (
              <Grid container sx = {{
                marginTop: '3rem',
              }}
              justifyContent= 'center'
              >
              <div justifyContent = "center">
                <CircularProgress size="5rem"/>
              </div>
              </Grid>
            ) : (
              <Results
                firstWH = {firstWH}
                secondWH = {secondWH}
                thirdWH = {thirdWH}
                fourthWH = {fourthWH}
                fifthWH = {fifthWH}
                handleBack = {this.handleBack}
              >

              </Results>
            )
            }
            </div>
          )
    }
  }
}

export default withStyles(styles, { withTheme: true })(RecommendationsSurvey);