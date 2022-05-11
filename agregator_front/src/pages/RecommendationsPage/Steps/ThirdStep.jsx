import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from './styles';
import { styled } from '@mui/material/styles';


const StyledChip = styled(Chip)({
    height: '32px',
    borderColor: '#E2E5EA',
  
    ".MuiChip-label": {
      fontFamily: 'Lato-Regular',
    },
});

const CheckedChip = styled(Chip)({
height: '32px',
borderColor: '#284AC2',

".MuiChip-label": {
    fontFamily: 'Lato-Regular',
    color: '#284AC2',
},
});

const StyledFormControlChips = styled(FormControlLabel)({
    paddingRight: '10px',
    margin: '0px',
    "& .MuiCheckbox-root": {
      padding: '0px',
    }
});


export default function ThirdStep({ values, handleChange, handleCheckChange }) {
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
                width: '20rem',
                margin: "0 auto",
                marginBottom: "1rem"
            }}>
                <FormControl sx={{ width: '100%'}} size="small">
                <InputLabel className={ classes.filter_label}>Количество палет</InputLabel>
                <Select
                    label="Количество паллет"
                    IconComponent={iconComponent}
                    value={ values.palletQuantity } 
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
            </Box>

            <StyledFormControlChips
              control={<Checkbox 
                disableRipple
                icon = {<StyledChip variant="outlined" label="Паллетизация грузов"/>} 
                checkedIcon = {<CheckedChip variant="outlined" label="Паллетизация грузов"/>} 
                name="palletization"
                checked = { values.palletization ? values.palletization : false }
                onChange={ handleCheckChange('palletization') }
              />}
              key="Паллетизация грузов"
            />
            <StyledFormControlChips
              control={<Checkbox 
                disableRipple
                icon = {<StyledChip variant="outlined" label="Отгрузки коробками"/>} 
                checkedIcon = {<CheckedChip variant="outlined" label="Отгрузки коробками"/>} 
                name="box_pick"
                checked = { values.box_pick ? values.box_pick : false }
                onChange={ handleCheckChange('box_pick') }
              />}
              key="Отгрузки коробками"
            />
            <Stack
            direction="row"
            sx = {{
              paddingTop: '10px',
              marginBottom: '15px',
            }}
            >
            <StyledFormControlChips
              control={<Checkbox 
                disableRipple
                icon = {<StyledChip variant="outlined" label="Транспортные услуги"/>} 
                checkedIcon = {<CheckedChip variant="outlined" label="Транспортные услуги"/>} 
                name="transport_services"
                checked = { values.transport_services ? values.transport_services : false }
                onChange={ handleCheckChange('transport_services') }
              />}
              key="Транспортные услуги"
            />
            <StyledFormControlChips
              control={<Checkbox 
                disableRipple
                icon = {<StyledChip variant="outlined" label="Кросс-докинг"/>} 
                checkedIcon = {<CheckedChip variant="outlined" label="Кросс-докинг"/>} 
                name="crossdock"
                checked = { values.crossdock ? values.crossdock : false }
                onChange={ handleCheckChange('crossdock') }
              />}
              key="Кросс-докинг"
            />
            <StyledFormControlChips
              control={<Checkbox 
                disableRipple
                icon = {<StyledChip variant="outlined" label="Таможенные услуги"/>} 
                checkedIcon = {<CheckedChip variant="outlined" label="Таможенные услуги"/>} 
                name="custom"
                checked = { values.custom ? values.custom : false }
                onChange={ handleCheckChange('custom') }
              />}
              key="Таможенные услуги"
            />
            </Stack>
        </div>
    )
}