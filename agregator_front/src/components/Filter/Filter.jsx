import React from 'react';
import { Typography, InputLabel, MenuItem, FormControl, Select, Button } from '@material-ui/core'
import useStyles from './styles'



const Filter = ({ type, setType, setModalActive }) => {

    const classes = useStyles();

    return (
      <div className={ classes.container }>
        <Typography variant="h4">
          Склады в заданной местности
        </Typography>
       
          <FormControl className={ classes.formControl }>
            <InputLabel>Класс</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="C">C</MenuItem>
            </Select>
          </FormControl>
          <Button className="filter_button" onClick={() => setModalActive(true)}>Фильтры</Button> 
          {/* //TODO: нарисовать кнопку класс filter_button */}
      </div>
    );
}
  
export default Filter;