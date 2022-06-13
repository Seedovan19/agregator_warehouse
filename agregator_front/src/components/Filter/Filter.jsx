import React from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Popper from '@mui/material/Popper';
import useStyles from './styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import { styled } from '@mui/material/styles';


const borderRadiusBottom = '20px';
const heightBottom = '35px';

const StyledAutocomplete = styled(Autocomplete)({

  "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
    // Default transform is "translate(14px, 20px) scale(1)""
    // This lines up the label with the initial cursor position in the input
    // after changing its padding-left.
    transform: "translate(14px, calc(50% + 2px)) scale(1)",
    fontFamily: "Lato-Regular",
    fontSize: "15px",
    color: '#BFD1E4',
  },

  "& .MuiAutocomplete-inputRoot": {
    fontFamily: "Lato-Regular",
    fontSize: "15px",
    height: "47px",

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
    },
    ".MuiAutocomplete-endAdornment": {
      top: 'calc(50% - 13px)'
    }
  }
});

const StyledSelect = styled(Select)({
  width: '100%',
  height: heightBottom,
  "& .MuiOutlinedInput-notchedOutline": {

    borderColor: "#E2E5EA",
    borderRadius: borderRadiusBottom,
  },
  "& .MuiSvgIcon-root": {
    color: "#000000",
  },
});

const StyledButton = styled(Button)({
  width: '157px',
  fontFamily: 'Montserrat-medium',
  textTransform: 'None',
  height: heightBottom,
  backgroundColor: '#ffffff',
  borderWidth: '1px',
  borderRadius: borderRadiusBottom,
  borderColor: '#E2E5EA',
  color: '#000000',
});

const StyledFormControl = styled(FormControl)({
  width: '150px',
  backgroundColor: '#ffffff',
  borderRadius: borderRadiusBottom,

  "& .MuiInputLabel-root": {
    fontFamily: 'Montserrat-medium',
    fontSize: '13px',
    color: '#000000',
    // lineHeight: '1.4em',
  }
});


const Filter = ({ resultsCount, type, setType, palletQuantity, setPalletQuantity, setModalActive }) => {
  const classes = useStyles();

  const iconComponent = (props) => {
    return (
      <ExpandMoreIcon className={props.className + " " + classes.icon}/>
    )};

  // moves the menu below the select input
  const menuProps = {
    classes: {
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
      <Box>
        <StyledAutocomplete
          popupIcon ={<ExpandMoreIcon/>}
          options={regions}
          style={{
            width: '100%',
            height: '47px',
            backgroundColor: '#FFFFFF',
            borderRadius: "10px",
            marginTop: "1.5rem",
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
        <Grid 
          container
          direction="row"
          alignItems="flex-end"
          sx = {{
            paddingTop: "1rem",
          }}
        >
          <Typography
            sx = {{
              fontFamily: 'Lato-Regular',
              fontSize: '15px',
            }}
          >
            Найдено:
          </Typography>
          <Typography 
            sx = {{
              fontFamily: 'Lato-Bold',
              fontSize: '19px',
              paddingLeft: '5px',
              lineHeight: '1.3'
            }}
          >
            {resultsCount}
          </Typography>
        </Grid>
        <Grid 
          container 
          spacing={2}
          sx = {{
            paddingTop: '1rem',
            paddingBottom: '1rem',
          }}
        >
          <Grid item>
            <StyledButton
              variant = 'outlined'
              startIcon={<FilterListIcon />}
              onClick={() => setModalActive(true)}
            >
              Все фильтры
            </StyledButton> 
          </Grid>
          <Grid item>
          <StyledFormControl size="small">
            <InputLabel>Класс склада</InputLabel>
            <StyledSelect
                label="Количество паллет"
                value={type} 
                IconComponent={iconComponent}
                onChange={(e) => setType(e.target.value)} 
                MenuProps={menuProps}
              >
              <MenuItem value="" >
                <em>Не задано</em>
              </MenuItem>
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="C">C</MenuItem>
            </StyledSelect>
          </StyledFormControl>
          </Grid>
          <Grid item>
          <StyledFormControl size="small">
           <InputLabel>Число паллет</InputLabel>
           <StyledSelect
            label="Количество паллет"
            value={palletQuantity} 
            IconComponent={iconComponent}
            onChange={(e) => setPalletQuantity(e.target.value)} 
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
           </StyledSelect>
          </StyledFormControl>
          </Grid>
          
          
          {/* //TODO: нарисовать кнопку класс filter_button */}
          </Grid>
      </Box>
    );
}
  
export default Filter;


// Регионы, в которых есть склады
const regions = [
  { label: 'Москва'},
  { label: 'Санкт-Петербург'},
]