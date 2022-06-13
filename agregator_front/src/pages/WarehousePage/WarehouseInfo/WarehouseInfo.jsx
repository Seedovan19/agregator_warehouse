import React, {useState, useEffect} from 'react'
import { getIsochrone } from '../../../api/isochrone'
import { Grid, Divider } from '@material-ui/core';
import Typography from '@mui/material/Typography';
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
    '&&& .MuiListItemText-primary': {
        fontFamily: 'Montserrat-Bold',
        fontSize: '13px',
        color: '#4B4B4B'
    }
});

const SectionTitle = styled(Typography)({
    fontFamily: 'Montserrat-medium',
    fontSize: '15px',
});

const ValueText = styled(Typography)({
    fontFamily: 'Montserrat-Bold',
    fontSize: '14px',
    color: '#000000',
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
            <Grid container spacing={10}>
                {warehouse.office_premises && (
                <Grid item md={6}>
                <Stack>
                    <SectionTitle>Характеристики склада</SectionTitle>
                    <StyledList>
                        {warehouse.office_premises_square !== 0 ? (
                        <Stack direction="row">
                        <ListItemText>Возможность аренды офисных помещений</ListItemText>
                        <Stack direction="row" spacing={1} sx = {{alignItems: "center"}} >
                            <ValueText>{warehouse.office_premises_square}</ValueText> 
                            <Typography sx={{
                                fontFamily: 'Montserrat-Bold',
                                fontSize: '13px',
                                alignItems: 'flex-end',
                            }}>м2
                            </Typography>
                        </Stack>
                        </Stack>
                        ):(
                            <Stack direction="row" spacing={1}>
                                <DoneIcon className={classes.done_icon}/>
                                <ListItemText>Возможность аренды офисных помещений</ListItemText>
                            </Stack>
                        )}
                            
                    </StyledList>
                </Stack>
                </Grid>
                )}

                {warehouse.services.palletization || warehouse.services.box_pick || warehouse.services.transport_services || warehouse.services.crossdock || warehouse.services.custom ? (
                <Grid item md={6}>
                <Stack>
                    <>
                    <SectionTitle>Услуги</SectionTitle>
                    <StyledList >
                        {warehouse.services.palletization && (
                            <ListItem disablePadding>
                                <ListItemIcon>
                                    <DoneIcon className={classes.done_icon}/>
                                </ListItemIcon>
                                <ListItemText primary="Паллетизация грузов" className={classes.list_text}/>
                            </ListItem>
                        )}
                        {warehouse.services.box_pick && (
                            <ListItem disablePadding>
                                <ListItemIcon>
                                    <DoneIcon className={classes.done_icon}/>
                                </ListItemIcon>
                                <ListItemText primary="Отгрузки коробками" className={classes.list_text}/>
                            </ListItem>
                        )}
                        {warehouse.services.transport_services && (
                            <ListItem disablePadding>
                                <ListItemIcon>
                                    <DoneIcon className={classes.done_icon}/>
                                </ListItemIcon>
                                <ListItemText primary="Транспортные услуги" className={classes.list_text}/>
                            </ListItem>
                        )}
                        {warehouse.services.crossdock && (
                            <ListItem disablePadding>
                                <ListItemIcon>
                                    <DoneIcon className={classes.done_icon}/>
                                </ListItemIcon>
                                <ListItemText primary="Кросс-докинг" className={classes.list_text}/>
                            </ListItem>
                        )}
                        {warehouse.services.custom && (
                            <ListItem disablePadding>
                                <ListItemIcon>
                                    <DoneIcon className={classes.done_icon}/> 
                                </ListItemIcon>
                                <ListItemText primary="Таможенный склад" className={classes.list_text}/>
                            </ListItem>
                        )}
                    </StyledList>
                    </>
                </Stack>
                </Grid>
                ) : (<></>)}
            </Grid>

            <div className={classes.divider}>
                <Divider/>
            </div>

            <Grid container>
                <Grid item md={6}>
                <Stack>
                    <SectionTitle>Температурный режим</SectionTitle>
                </Stack>
                </Grid>

                <Grid item md={6}>
                <Stack>
                
                {warehouse.features.alcohol || warehouse.features.pharmacy || warehouse.features.food || warehouse.features.dangerous ? (
                    <>
                    <SectionTitle>Возможность хранения</SectionTitle>
                    
                    <StyledList >
                        {warehouse.features.alcohol && (
                            <ListItem disablePadding>
                                <ListItemIcon>
                                    <DoneIcon className={classes.done_icon}/>
                                </ListItemIcon>
                                <ListItemText primary="Алкогольная продукция" className={classes.list_text}/>
                            </ListItem>
                        )}

                        {warehouse.features.pharmacy && (
                            <ListItem disablePadding>
                                <ListItemIcon>
                                    <DoneIcon className={classes.done_icon}/>
                                </ListItemIcon>
                                <ListItemText primary="Фармацевтическая продукция" className={classes.list_text}/>
                            </ListItem>
                        )}

                        {warehouse.features.food && (
                            <ListItem disablePadding>
                                <ListItemIcon>
                                    <DoneIcon className={classes.done_icon}/>
                                </ListItemIcon>
                                <ListItemText primary="Пищевая продукция" className={classes.list_text}/>
                            </ListItem>
                        )}
                        
                        {warehouse.features.dangerous && (
                            <ListItem disablePadding>
                                <ListItemIcon>
                                    <DoneIcon className={classes.done_icon}/>
                                </ListItemIcon>
                                <ListItemText primary="Опасные грузы" className={classes.list_text}/>
                            </ListItem>
                        )}
                    </StyledList>
                </>
                ) : (<></>)}
                </Stack>
                </Grid>
            </Grid>
            
            <div className={classes.divider}>
                <Divider/>
            </div>

            <Grid container>
                <Grid item md={12}>
                <Stack>
                    <SectionTitle>Режим работы</SectionTitle>
                    {warehouse.working_hours.time_from !== 0 && (
                        <Grid container spacing={3}> 
                        <Grid item>
                            <StyledList >
                                <ListItem disablePadding>
                                    <Typography>Пн {warehouse.working_hours.time_from/100}:00
                                    - {warehouse.working_hours.time_to/100}:00</Typography>
                                </ListItem>
                                <ListItem disablePadding>
                                    <Typography>Вт {warehouse.working_hours.time_from/100}:00
                                    - {warehouse.working_hours.time_to/100}:00</Typography>

                                </ListItem>
                                <ListItem disablePadding>
                                    <Typography>Ср {warehouse.working_hours.time_from/100}:00
                                    - {warehouse.working_hours.time_to/100}:00</Typography>
                                </ListItem>
                                <ListItem disablePadding>
                                    <Typography>Чт {warehouse.working_hours.time_from/100}:00
                                    - {warehouse.working_hours.time_to/100}:00</Typography>
                                </ListItem>
                            </StyledList>
                        </Grid>
                        <Grid item>
                            <StyledList >
                            <ListItem disablePadding>
                                <Typography>Пт {warehouse.working_hours.time_from/100}:00
                                    - {warehouse.working_hours.time_to/100}:00</Typography>
                            </ListItem>
                            <ListItem disablePadding>
                                <Typography>Сб {warehouse.working_hours.time_from/100}:00
                                    - {warehouse.working_hours.time_to/100}:00</Typography>
                            </ListItem>
                            <ListItem disablePadding>
                                <Typography>Вс {warehouse.working_hours.time_from/100}:00
                                    - {warehouse.working_hours.time_to/100}:00</Typography>
                            </ListItem>
                            </StyledList>
                        </Grid>
                        </Grid>
                    )}
                </Stack>
                </Grid>
            </Grid>
            
            <div className={classes.divider}>
                <Divider/>
            </div>

            <Grid container>
                <Grid item md={12}>
                <Stack spacing={1.5}>
                    <SectionTitle>Расположение склада</SectionTitle>
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