import React, {useState, useEffect} from 'react'
import { getIsochrone } from '../../../api/isochrone'
import { Grid, Typography, Divider } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@mui/material/List';
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import SingleWarehouseMap from '../SingleWarehouseMap/SingleWarehouseMap'
import {RecommendationsBlock} from '../RecommendationsBlock/RecommendationsBlock'
import useStyles from './styles'
import { styled } from '@mui/system';



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


const StyledList = styled(List)({
    // // selected and (selected + hover) states
    // '&& .Mui-selected, && .Mui-selected:hover': {
    //   backgroundColor: 'red',
    //   '&, & .MuiListItemIcon-root': {
    //     color: 'pink',
    //   },
    // },
    // // hover states
    // '& .MuiListItemButton-root:hover': {
    //   backgroundColor: 'orange',
    //   '&, & .MuiListItemIcon-root': {
    //     color: 'yellow',
    //   },
    // },
    '&&& .MuiListItemText-primary': {
        fontFamily: 'Montserrat-Bold',
        fontSize: '13px',
        color: '#4B4B4B'
    }
    
});


const WarehouseInfo = ({warehouse}) => {
    const classes = useStyles();
    const [ vehicle, setVehicle ] = useState('');
    
    useEffect(() => {
        getIsochrone(vehicle)
        .then((data) => {
            console.log(data)
        })
    },[vehicle]);

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
    getcontentanchorel: null
    };

    return (
        <div>
            <div className={classes.divider}>
                <Divider/>
            </div>
            <Grid container>
                <Grid item md={6}>
                <Stack>
                    <Typography className={classes.section_title}>Характеристики склада</Typography>
                </Stack>
                </Grid>

                <Grid item md={6}>
                <Stack>
                    <Typography className={classes.section_title}>Услуги</Typography>
                    <StyledList >
                        <ListItem disablePadding>
                            <ListItemIcon>
                                {warehouse.services.palletization ? (
                                    <DoneIcon className={classes.done_icon}/>
                                ) : (
                                    <CloseIcon className={classes.close_icon}/>
                                )}
                            </ListItemIcon>
                            <ListItemText primary="Паллетизация грузов" className={classes.list_text}/>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                {warehouse.services.box_pick ? (
                                    <DoneIcon className={classes.done_icon}/>
                                ) : (
                                    <CloseIcon className={classes.close_icon}/>
                                )}
                            </ListItemIcon>
                            <ListItemText primary="Отгрузки коробками" className={classes.list_text}/>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                {warehouse.services.transport_services ? (
                                    <DoneIcon className={classes.done_icon}/>
                                ) : (
                                    <CloseIcon className={classes.close_icon}/>
                                )}     
                            </ListItemIcon>
                            <ListItemText primary="Транспортные услуги" className={classes.list_text}/>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                {warehouse.services.crossdock ? (
                                    <DoneIcon className={classes.done_icon}/>
                                ) : (
                                    <CloseIcon className={classes.close_icon}/>
                                )}     
                            </ListItemIcon>
                            <ListItemText primary="Кросс-докинг" className={classes.list_text}/>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                {warehouse.services.custom ? (
                                    <DoneIcon className={classes.done_icon}/>
                                ) : (
                                    <CloseIcon className={classes.close_icon}/>
                                )}     
                            </ListItemIcon>
                            <ListItemText primary="Таможенный склад" className={classes.list_text}/>
                        </ListItem>
                    </StyledList>
                </Stack>
                </Grid>
            </Grid>

            <div className={classes.divider}>
                <Divider/>
            </div>

            <Grid container>
                <Grid item md={6}>
                <Stack>
                    <Typography className={classes.section_title}>Температурный режим</Typography>
                </Stack>
                </Grid>

                <Grid item md={6}>
                <Stack>
                    <Typography className={classes.section_title}>Возможность хранения</Typography>
                    <StyledList >
                        <ListItem disablePadding>
                            <ListItemIcon>
                                {warehouse.features.alcohol ? (
                                    <DoneIcon className={classes.done_icon}/>
                                ) : (
                                    <CloseIcon className={classes.close_icon}/>
                                )}
                            </ListItemIcon>
                            <ListItemText primary="Алкогольная продукция" className={classes.list_text}/>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                {warehouse.features.pharmacy ? (
                                    <DoneIcon className={classes.done_icon}/>
                                ) : (
                                    <CloseIcon className={classes.close_icon}/>
                                )}
                            </ListItemIcon>
                            <ListItemText primary="Фармацевтическая продукция" className={classes.list_text}/>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                {warehouse.features.food ? (
                                    <DoneIcon className={classes.done_icon}/>
                                ) : (
                                    <CloseIcon className={classes.close_icon}/>
                                )}     
                            </ListItemIcon>
                            <ListItemText primary="Пищевая продукция" className={classes.list_text}/>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                {warehouse.features.dangerous ? (
                                    <DoneIcon className={classes.done_icon}/>
                                ) : (
                                    <CloseIcon className={classes.close_icon}/>
                                )}     
                            </ListItemIcon>
                            <ListItemText primary="Опасные грузы" className={classes.list_text}/>
                        </ListItem>
                    </StyledList>
                </Stack>
                </Grid>
            </Grid>
            
            <div className={classes.divider}>
                <Divider/>
            </div>

            <Grid container>
                <Grid item md={12}>
                <Stack>
                    <Typography className={classes.section_title}>Режим работы</Typography>
                </Stack>
                </Grid>
            </Grid>
            
            <div className={classes.divider}>
                <Divider/>
            </div>

            <Grid container>
                <Grid item md={12}>
                <Stack>
                    <Typography className={classes.section_title}>Расположение склада</Typography>
                    <StyledFormControl size="small">
                    <InputLabel>Транспорт</InputLabel>
                        <StyledSelect
                            label="Выберите транспорт"
                            value={vehicle} 
                            IconComponent={iconComponent}
                            onChange={(e) => setVehicle(e.target.value)} 
                            MenuProps={menuProps}
                        >
                        <MenuItem value="" >
                            <em>Не задано</em>
                        </MenuItem>
                        <MenuItem value="truck">Грузовик</MenuItem>
                        <MenuItem value="bicycle">Велосипед</MenuItem>
                        <MenuItem value="pedestrian">Пешеход</MenuItem>
                        </StyledSelect>
                    </StyledFormControl>
                    <SingleWarehouseMap warehouse = {warehouse}/>
                </Stack>
                </Grid>
            </Grid>
            
            
            <RecommendationsBlock />
            
        </div>
    )
}

export {WarehouseInfo}