import React from 'react'
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


export default function ThirdStep({ values, handleChange, handleSelectChange, handleUnselectChange }) {
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

            {values.palletization ? (
              <CheckedChip onClick={() => handleUnselectChange('palletization') }  variant="outlined" label="Паллетизация грузов"/>
            ) : (
              <StyledChip onClick={() => handleSelectChange('palletization') } variant="outlined" label="Паллетизация грузов"/>
            )}
            {values.box_pick ? (
              <CheckedChip onClick={() => handleUnselectChange('box_pick') }  variant="outlined" label="Отгрузки коробками"/>
            ) : (
              <StyledChip onClick={() => handleSelectChange('box_pick') } variant="outlined" label="Отгрузки коробками"/>
            )}
            <Stack
            direction="row"
            sx = {{
              paddingTop: '10px',
              marginBottom: '15px',
            }}
            >
            {values.transport_services ? (
              <CheckedChip onClick={() => handleUnselectChange('transport_services') }  variant="outlined" label="Транспортные услуги"/>
            ) : (
              <StyledChip onClick={() => handleSelectChange('transport_services') } variant="outlined" label="Транспортные услуги"/>
            )}
            {values.crossdock ? (
              <CheckedChip onClick={() => handleUnselectChange('crossdock') }  variant="outlined" label="Кросс-докинг"/>
            ) : (
              <StyledChip onClick={() => handleSelectChange('crossdock') } variant="outlined" label="Кросс-докинг"/>
            )}
            {values.custom ? (
              <CheckedChip onClick={() => handleUnselectChange('custom') }  variant="outlined" label="Таможенные услуги"/>
            ) : (
              <StyledChip onClick={() => handleSelectChange('custom') } variant="outlined" label="Таможенные услуги"/>
            )}
            </Stack>
        </div>
    )
}