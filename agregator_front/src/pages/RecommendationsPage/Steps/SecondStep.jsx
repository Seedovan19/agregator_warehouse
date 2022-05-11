import React from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import RecommendationsMap from '../RecommendationsSurvey/RecommendationsMap'
import useStyles from './styles';
import { styled } from '@mui/material/styles';


const StyledSelect = styled(Select)({
  height: '38px',
  "& .MuiOutlinedInput-notchedOutline": {

    borderColor: "#E2E5EA",
    borderRadius: "10px",
  },
  "& .MuiSvgIcon-root": {
    color: "#000000",
  },
});

const StyledFormControl = styled(FormControl)({
  width: '100%',
  backgroundColor: '#ffffff',
  borderRadius: "10px",

  "& .MuiInputLabel-root": {
      fontFamily: 'Montserrat-medium',
      fontSize: '13px',
      color: '#000000',
      // lineHeight: '1.4em',
  }
});


export default function SecondStep({ values, handleChange, handleWhLatLonChange }) {
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
          <Box sx = {{
            width: '250px',
            margin: "0 auto",
            marginBottom: "15px"
          }}>
          <StyledFormControl size="small">
            <InputLabel>Класс склада</InputLabel>
            <StyledSelect
                label="Количество паллет"
                value={ values.warehouse_class } 
                IconComponent={ iconComponent }
                onChange={ handleChange('warehouse_class') } 
                MenuProps={ menuProps }
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
          </Box>
          
          <RecommendationsMap
            values = {values}
            handleChange={ handleChange }
            handleWhLatLonChange = { handleWhLatLonChange }
          />
        </div>
    )
}
