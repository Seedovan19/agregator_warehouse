import React from 'react';
import { InputLabel, MenuItem, FormControl, Select, Button } from '@material-ui/core'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useStyles from './styles'


const Filter = ({ type, setType, palletQuantity, setPalletQuantity, setModalActive }) => {
    const classes = useStyles();
    
    return (
      <div>
        <Autocomplete
          sx={{
            width: '500px',
            display: 'inline-block',
            '& input': {
              width: 200,
              bgcolor: 'background.paper',
              color: (theme) =>
              theme.palette.getContrastText(theme.palette.background.paper),
          },}}
          id="custom-input-demo"
          disablePortal
          options={regions}
          renderInput={(params) => (
            <div ref={params.InputProps.ref}>
              <input type="search" {...params.inputProps} />
            </div>
          )}
        />
       
          <FormControl className={ classes.formControl }>
            <InputLabel>Класс</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="" >
                <em>Не задано</em>
              </MenuItem>
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="C">C</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={ classes.formControl }>
           <InputLabel>Количество паллет</InputLabel>
           <Select value={palletQuantity} onChange={(e) => setPalletQuantity(e.target.value)}>
             <MenuItem value="<50">меньше 50</MenuItem>
             <MenuItem value="50-250">50-250</MenuItem>
             <MenuItem value="250-500">250-500</MenuItem>
             <MenuItem value="500-1000">500-1000</MenuItem>
             <MenuItem value="1000+">больше 1000</MenuItem>
           </Select>
         </FormControl>
          <Button className="filter_button" onClick={() => setModalActive(true)}>Фильтры</Button> 
          {/* //TODO: нарисовать кнопку класс filter_button */}
      </div>
    );
}
  
export default Filter;


// Регионы, в которых есть склады
const regions = [
  { label: 'Москва'},
  { label: 'Санкт-Петербург'},
]