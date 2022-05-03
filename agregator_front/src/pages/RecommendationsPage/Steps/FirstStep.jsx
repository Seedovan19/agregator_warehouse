import React from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
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
  width: '140px',
  backgroundColor: '#ffffff',
  borderRadius: "10px",

  "& .MuiInputLabel-root": {
    fontFamily: 'Montserrat-medium',
    fontSize: '13px',
    color: '#000000',
    // lineHeight: '1.4em',
  }
});


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
    height: '55px',
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

export default function FirstStep() {
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
            <Divider sx = {{
                marginBottom: '17px',
                marginTop: '20px',
                }} 
            />

            <StyledFormControl size="small">
            <InputLabel>Режим хранения</InputLabel>
            <StyledSelect
                label="Количество паллет"
                // value={type} 
                IconComponent={iconComponent}
                // onChange={(e) => setType(e.target.value)} 
                MenuProps={menuProps}
              >
              <MenuItem value="" >
                <em>Не задано</em>
              </MenuItem>
              <MenuItem value="Regulated">Регулируемый температурный режим</MenuItem>
              <MenuItem value="Heated">Отапливаемый</MenuItem>
              <MenuItem value="Warmed">Утепленный</MenuItem>
              <MenuItem value="Non-heated">Неотапливаемый</MenuItem>
              <MenuItem value="Freezer-WH">Морозильный</MenuItem>
              <MenuItem value="Cold-WH">Холодильный</MenuItem>
            </StyledSelect>
          </StyledFormControl>

            <FormControlLabel
            label="Морозильная камера"
            control={
                <Checkbox
                />
            }
            />
            <FormControlLabel
            label="Холодильная камера"
            control={
                <Checkbox
                />
            }
            />
            <FormControlLabel
            label="Хранение алкоголя"
            control={
                <Checkbox
                />
            }
            />
            <FormControlLabel
            label="Хранение фармацевтической продукции"
            control={
                <Checkbox
                />
            }
            />
            <FormControlLabel
            label="Хранение пищевой продукции"
            control={
                <Checkbox
                />
            }
            />
            <FormControlLabel
            label="Хранение опасных грузов"
            control={
                <Checkbox
                />
            }
            />
        </div>
    )
}


// Регионы, в которых есть склады
const regions = [
  { label: 'Москва'},
  { label: 'Санкт-Петербург'},
]




// Электротехнические материалы, кабели, провода, радио-электроаппаратура, приборы автоматики и осветительные приборы — температура +8...+14 (влажность воздуха 50%).
// Пластмассы — температура +20 (влажность воздуха 30-60%).
// Оборудование и станки для обработки металла, дерева, лабораторное оборудование — температура +5...+14, влажность воздуха 60%.
// Инструмент: калибры, лекала, линейки, циркули, метчики, сверла, фрезы — температура +5...+20, влажность воздуха 60%
// Резина и изделия из нее — температура 0...+10, влажность воздуха 50-60%
// Кожа — температура воздуха +5...+19, влажность воздуха 50%
// Текстильные материалы — температура воздуха +10...+16, влажность до 60%
// Бумага, картон — температура +15...+17, влажность от 50-55%
// Цветные металлы: свинец, медь, цинк, олово — температура +8...+12(до +20), влажность воздуха 30-50%
// Черные металлы — температура воздуха +8...+12, влажность — 30-50%
// Баллоны с газом — не более 30%, влажность 50
// Масла +8 ...+12, влажность 35-50
// Кислоты - больше +5, влажность 35-50
// Табачная пр
// одукция — температура воздуха +18..+24, влажность 60%

// Продовольственные товары
// Сахар +2...+4, не больше 70%
// Чай (нет ограничений), влажность не более 60%
// Крахмал от 0 градусов до +15, влажность не более 60%
// Пряности +5 ...+15, влажность не более 75%
// Безалкогольные напитки: сохи, сиропы от 0 градусов до +15, влажность воздуха 70-75%
// Ликероводочные изделия +10...+20, влажность 70-75%
// Виноградные вина — температура +8...+15, влажность 70-75%
// Консервы мясо-растительные, рыбные, овощные, фруктовые — от 0 до +10% не более 75%
