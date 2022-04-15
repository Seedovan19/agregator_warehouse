import React from 'react';
import { Grid, InputLabel, MenuItem, FormControl, Select, Button } from '@material-ui/core'
import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';
import InputBase from '@mui/material/InputBase';
import useStyles from './styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import { styled } from '@mui/material/styles';


const StyledAutocomplete = styled(Autocomplete)({
  "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
    // Default transform is "translate(14px, 20px) scale(1)""
    // This lines up the label with the initial cursor position in the input
    // after changing its padding-left.
    transform: "translate(16px, 18px) scale(1);",
    fontFamily: "Lato-Regular",
    fontSize: "15px",
    color: '#BFD1E4'
  },
  "& .MuiAutocomplete-inputRoot": {
    color: "purple",
    fontFamily: "Lato-Regular",
    fontSize: "15px",

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E2E5EA",
      borderRadius: "10px"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      transition: 'box-shadow .3s',
      borderColor: "#E2E5EA",
      boxShadow: '0px 0px 5px 5px #F0F2FB',
      borderRadius: "10px"
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#284AC2",
      boxShadow: '0px 0px 5px 5px #F0F2FB',
      borderRadius: "10px"
    }
  }
});

const CustomInputBase = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(0),
  },
  '& .MuiInputBase-input': {
    borderRadius: '10px',
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,

    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

const Filter = ({ type, setType, palletQuantity, setPalletQuantity, setModalActive }) => {
    const classes = useStyles();

  const iconComponent = (props) => {
    return (
      <ExpandMoreIcon className={props.className + " " + classes.icon}/>
    )};

  // moves the menu below the select input
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
        <StyledAutocomplete
          popupIcon ={<ExpandMoreIcon className={classes.icon_search}/>}
          options={regions}
          style={{
            display: 'inline-block',
            width: 500,
            height: 55,
            backgroundColor: '#FFFFFF',
            borderRadius: "10px"
          }}
          renderInput={(params) => (
            <TextField
                {...params}
                label="Введите город или субъект..."
                variant="outlined"
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
              />
          )}
        />
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
          <Grid item>
          <FormControl className={ classes.formControl }>
            <InputLabel>Класс</InputLabel>
            <Select 
              disableUnderline
              classes={{ root: classes.select }}
              MenuProps={menuProps}
              IconComponent={iconComponent}
              value={type} 
              onChange={(e) => setType(e.target.value)} 
              input={<CustomInputBase />}>
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
          </Grid>
          <Grid item>
          <FormControl className={ classes.formControl }>
           <InputLabel>Количество паллет</InputLabel>
           <Select 
            value={palletQuantity} 
            onChange={(e) => setPalletQuantity(e.target.value)} 
            input={<CustomInputBase />}
            IconComponent={iconComponent}
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
          </Grid>
          <Grid item>
            <Button
              className={classes.filter_button}
              variant="outlined" 
              startIcon={<FilterListIcon />}
              onClick={() => setModalActive(true)}
            >
              Фильтры
            </Button> 
          </Grid>
          
          {/* //TODO: нарисовать кнопку класс filter_button */}
          </Grid>
      </div>
    );
}
  
export default Filter;


// Регионы, в которых есть склады
const regions = [
  { label: 'Москва'},
  { label: 'Санкт-Петербург'},
]