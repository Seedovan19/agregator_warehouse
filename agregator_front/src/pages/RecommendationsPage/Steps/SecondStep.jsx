import React from 'react'
import { Grid, Card, Typography, Button } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from './styles'


export default function SecondStep({activeStep}) {
    const classes = useStyles();
    const iconComponent = (props) => {
        return (
          <ExpandMoreIcon className={props.className + " " + classes.icon}/>
        )
    };


    return (
        <div>
            
        </div>
    )
}
