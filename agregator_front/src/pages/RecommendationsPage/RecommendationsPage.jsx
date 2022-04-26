import React from 'react'
import Header from '../../components/Header/Header'
import { Card, Grid, Typography, Button } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from './styles'


const RecommendationsPage = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);

    const iconComponent = (props) => {
        return (
          <ExpandMoreIcon className={props.className + " " + classes.icon}/>
        )
    };
    
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    
    const menuProps = {
        classes: {
          paper: classes.paper,
          list: classes.list
        },
        anchorOrigin: {
          vertical: "bottom",
            horizontal: "left"
        },
        transformOrigin: {
          vertical: "top",
            horizontal: "left"
        },
        getContentAnchorEl: null
    };
    
    return (
        <div>
        <Header/>
        <Grid container className={classes.recommendations_window}>
        <Grid item md = {7}>
            <Card variant="outlined" className={classes.recommendations_card}>
                <Grid container justifyContent='center'>
                    <Grid item md = {2} className={classes.button}>
                        <Stack>
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                <KeyboardArrowLeft />
                                Back
                            </Button>
                        </Stack>
                    </Grid>
                    <Grid item md = {7}>
                        <Stack alignItems='center'>
                            <Typography className={classes.title}>Пройдите опрос и получите рекомендации!</Typography>
                            <Typography className={classes.stepper_number}>{activeStep}/3</Typography>
                            <MobileStepper
                                variant="progress"
                                steps={4}
                                position="relative"
                                activeStep={activeStep}
                                sx={{ width: '400px', justifyContent:'center' }}
                            />
                            <Typography className={classes.subtitle}>Выберите количество палет</Typography>
                            <FormControl sx={{ minWidth: '20rem', paddingBottom: '5rem'}} size="small">
                                <InputLabel className={ classes.filter_label}>Количество палет</InputLabel>
                                <Select
                                    label="Количество паллет"
                                    // value={type} 
                                    IconComponent={iconComponent}
                                    // onChange={(e) => setType(e.target.value)} 
                                    MenuProps={menuProps}
                                >
                                <MenuItem value="" >
                                <em>Не задано</em>
                                </MenuItem>
                                <MenuItem value="50">меньше 50</MenuItem>
                                <MenuItem value="250">50-250</MenuItem>
                                <MenuItem value="500">250-500</MenuItem>
                                <MenuItem value="1000">500-1000</MenuItem>
                                <MenuItem value="500000">больше 1000</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </Grid>
                    <Grid item md = {2} className={classes.button}>
                        <Stack>
                            <Button size="small" onClick={handleNext} disabled={activeStep === 3}>
                                Next
                                <KeyboardArrowRight />
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
        </Grid>
        </div>
    )
}

export {RecommendationsPage}
