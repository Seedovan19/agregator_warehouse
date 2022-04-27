import React from 'react'
import { Typography } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from './styles'


export default function FirstStep({ handleChange, values }) {
    const classes = useStyles();
    const iconComponent = (props) => {
        return (
          <ExpandMoreIcon className={props.className + " " + classes.icon}/>
        )
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
        getcontentanchorel: null
    };

    return (
      <div>
      <FormControl sx={{ minWidth: '20rem', paddingBottom: '5rem'}} size="small">
        <InputLabel className={ classes.filter_label}>Количество палет</InputLabel>
        <Select
            label="Количество паллет"
            IconComponent={iconComponent}
            defaultValue={values.palletQuantity}
            onChange={handleChange('palletQuantity')} 
            MenuProps={menuProps}
        >
        <MenuItem value={''} >
        <em>Не задано</em>
        </MenuItem>
        <MenuItem value={"50"}>меньше 50</MenuItem>
        <MenuItem value={"250"}>50-250</MenuItem>
        <MenuItem value={"500"}>250-500</MenuItem>
        <MenuItem value={"1000"}>500-1000</MenuItem>
        <MenuItem value={"50000"}>больше 1000</MenuItem>
        </Select>
      </FormControl>
      </div>
    )
}
