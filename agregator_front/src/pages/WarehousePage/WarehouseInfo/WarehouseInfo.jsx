import React, {useState} from 'react'
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
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import GppGoodIcon from '@mui/icons-material/GppGood';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Slider from '@mui/material/Slider';


import SingleWarehouseMap from '../SingleWarehouseMap/SingleWarehouseMap'
import {RecommendationsBlock} from '../RecommendationsBlock/RecommendationsBlock'
import useStyles from './styles'
import { styled } from '@mui/system';



const StyledSelect = styled(Select)({
  height: '3.5rem',
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


const WarehouseInfo = ({warehouse, conditionValue, fireSysTypeValue}) => {
    const classes = useStyles();
    const [ loadingIso, setLoadingIso ] = useState(false);
    const [ vehicle, setVehicle ] = useState('');
    const [ isoData, setIsoData ] = useState([]);
    const [ dateValue, setDateValue] = useState(new Date());
    const [ actualDateValue, setActualDateValue] = useState(0);

    const [ timeValue, setTimeValue] = useState(0);
    const [ timeOfTheDay, setTimeOfTheDay ] = useState(0);

    const handleTimeChange = (event, newValue) => {
        setTimeValue(newValue);
    };

    const handleIsochroneChange = (event) => {
        setLoadingIso(true)
        setActualDateValue(dateValue.getMonth() + 1);
        getIsochrone(warehouse, vehicle, actualDateValue, timeValue, timeOfTheDay)
        .then((data) => {
            setIsoData(data)
            setLoadingIso(false)
        })
    };

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

            <Grid container spacing={10}>
            {warehouse.office_premises || warehouse.storage_conditions.bulky_cargo_storage || warehouse.storage_conditions.max_storage_weight !==0 ? (
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
                            <>
                            {warehouse.office_premises && (
                                <Stack direction="row" spacing={1}>
                                    <DoneIcon className={classes.done_icon}/>
                                    <ListItemText>Возможность аренды офисных помещений</ListItemText>
                                </Stack>
                            )}
                            </>
                        )}
                        {warehouse.storage_conditions.bulky_cargo_storage && (
                            <ListItemText>Возможность хранения крупногабаритных грузов</ListItemText>
                        )}
                        {warehouse.storage_conditions.max_storage_weight !== 0 && (
                            <Stack
                                direction="row"
                                sx ={{
                                    alignItems: "center",
                                    maxWidth: '19rem'
                                }}
                            >
                                <ListItemText>Максимальная высота груза</ListItemText>
                                <ValueText>{warehouse.storage_conditions.max_storage_weight}</ValueText>
                            </Stack>
                        )}
                        {warehouse.storage_conditions.max_storage_height !== 0 && (
                            <Stack
                                direction="row"
                                sx ={{
                                    alignItems: "center",
                                    maxWidth: '19rem'
                                }}
                            >
                                <ListItemText>Максимальный вес груза</ListItemText>
                                <ValueText>{warehouse.storage_conditions.max_storage_height}</ValueText>
                            </Stack>
                        )}
                    </StyledList>
                </Stack>
                </Grid>

            ):(<></>)}

                <Grid item md={6}>
                    <Stack>
                        <SectionTitle>Температурный режим</SectionTitle>
                        <StyledList>
                            <ListItem disablePadding>
                                <Stack direction="row" spacing={1} sx = {{alignItems: "center"}} >
                                    <ListItemText>Режим хранения</ListItemText>
                                    <ValueText>{conditionValue}</ValueText>
                                </Stack>
                            </ListItem>
                            {warehouse.features.freezer && (
                                <ListItem disablePadding>
                                    <Stack direction="row" spacing={1} sx = {{alignItems: "center"}} >
                                        <ListItemText>Морозильная камера</ListItemText>
                                        {warehouse.features.freezer_size !== 0 && (
                                            <Stack direction="row" spacing={1} sx = {{alignItems: "center"}} >
                                                <ValueText>{warehouse.features.freezer_size}</ValueText>
                                                <Typography
                                                    sx={{
                                                        fontFamily: 'Montserrat-Bold',
                                                        fontSize: '13px',
                                                        alignItems: 'flex-end',
                                                    }}
                                                >
                                                    м2
                                                </Typography>
                                            </Stack>
                                        )}
                                    </Stack>
                                </ListItem>
                            )}
                            {warehouse.features.refrigerator && (
                                <ListItem disablePadding>
                                    <Stack direction="row" spacing={1} sx = {{alignItems: "center"}} >
                                        {/* TODO: добавить значок в начале мб (г. Старая купавна) */}
                                        <ListItemText>Холодильная камера</ListItemText>
                                        {warehouse.features.refrigerator_size !== 0 && (
                                            <Stack direction="row" spacing={1} sx = {{alignItems: "center"}} >
                                                <ValueText>{warehouse.features.refrigerator_size}</ValueText>
                                                <Typography
                                                    sx={{
                                                        fontFamily: 'Montserrat-Bold',
                                                        fontSize: '13px',
                                                        alignItems: 'flex-end',
                                                    }}
                                                >
                                                    м2
                                                </Typography>
                                            </Stack>
                                        )}
                                    </Stack>
                                </ListItem>
                            )}
                        </StyledList>
                    </Stack>
                </Grid>
            </Grid>

            {warehouse.working_hours.time_from !== 0 && (
            <div>
            <div className={classes.divider}>
                <Divider/>
            </div>

            <Grid container>
                {/* TODO: доделать отображение времени */}
                <Grid item md={12}>
                    <Stack>
                    <Stack direction="row" spacing={2}>
                        <AccessTimeIcon sx ={{color:"#284AC2"}}></AccessTimeIcon>
                        <SectionTitle>Режим работы</SectionTitle>
                    </Stack>
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
                    </Stack>
                </Grid>
            </Grid>
            </div>
            )}

            <div className={classes.divider}>
                <Divider/>
            </div>

            <Grid container>
            <Grid item md={12}>
            <Stack spacing={1}>
                {warehouse.security.security_post || warehouse.security.all_day_security || warehouse.security.video_control || warehouse.security.magnetic_access_locks || warehouse.security.generator || warehouse.security.alarm_system || warehouse.security.fire_system_type !== 'No value' ? (
                <>
                <Stack direction="row" spacing={2}>
                    <GppGoodIcon sx ={{color:"#284AC2"}}></GppGoodIcon>
                    <SectionTitle>Безопасность</SectionTitle>
                </Stack>
                    <StyledList>
                        {warehouse.security.security_post && (
                            <ListItem disablePadding>
                                <ListItemIcon>
                                    <FiberManualRecordIcon sx ={{
                                        fontSize: '11px'
                                    }}/>
                                </ListItemIcon>
                                <ListItemText>Охраняемая территория</ListItemText>
                            </ListItem>
                        )}
                        {warehouse.security.all_day_security && (
                            <ListItem disablePadding>
                                <ListItemIcon>
                                    <FiberManualRecordIcon sx ={{
                                        fontSize: '11px'
                                    }}/>
                                </ListItemIcon>
                                <ListItemText>Круглосуточная охрана</ListItemText>
                            </ListItem>
                        )}
                        {warehouse.security.video_control && (
                            <ListItem disablePadding>
                                <ListItemIcon>
                                    <FiberManualRecordIcon sx ={{
                                        fontSize: '11px'
                                    }}/>
                                </ListItemIcon>
                                <ListItemText>Видеонаблюдение</ListItemText>
                            </ListItem>
                        )}
                        {warehouse.security.magnetic_access_locks && (
                            <ListItem disablePadding>
                                <ListItemIcon>
                                    <FiberManualRecordIcon sx ={{
                                        fontSize: '11px'
                                    }}/>
                                </ListItemIcon>
                                <ListItemText>Магнитные замки доступа</ListItemText>
                            </ListItem>
                        )}
                        {warehouse.security.generator && (
                            <ListItem disablePadding>
                                <ListItemIcon>
                                    <FiberManualRecordIcon sx ={{
                                        fontSize: '11px'
                                    }}/>
                                </ListItemIcon>
                                <ListItemText>Наличие автономного источника энергии</ListItemText>
                            </ListItem>
                        )}
                        {warehouse.security.alarm_system && (
                            <ListItem disablePadding>
                                <ListItemIcon>
                                    <FiberManualRecordIcon sx ={{
                                        fontSize: '11px'
                                    }}/>
                                </ListItemIcon>
                                <ListItemText>Охранная сигнализация</ListItemText>
                            </ListItem>
                        )}

                        {warehouse.security.fire_system_type !== "No value" && (
                            <ListItem disablePadding sx = {{
                                paddingTop: '0.7rem',
                            }}>
                            <Stack direction="row" spacing={1} sx = {{alignItems: "center"}} >
                                <ListItemText>Система пожаротушения</ListItemText>
                                <ValueText>{fireSysTypeValue}</ValueText>
                            </Stack>
                            </ListItem>
                        )}
                    </StyledList>
                    <div className={classes.divider}>
                    <Divider/>
                    </div>
                    </>
                ): (<></>)}
                </Stack>
            </Grid>
            </Grid>

            <Grid container>
            <Grid item md={12}>
            <Stack spacing={1}>

                {warehouse.logistics.leveling_platform || warehouse.logistics.railways || warehouse.logistics.parking || warehouse.logistics.parking_security ? (
                <>
                <Stack direction="row" spacing={2}>
                    <LocalShippingIcon sx ={{color:"#284AC2"}}></LocalShippingIcon>
                    <SectionTitle>Логистическое сообщение</SectionTitle>
                </Stack>
                    <StyledList>
                        {warehouse.logistics.leveling_platform && (
                            <ListItem disablePadding>
                                <ListItemIcon>
                                    <FiberManualRecordIcon sx ={{
                                        fontSize: '11px'
                                    }}/>
                                </ListItemIcon>
                                <ListItemText>Наличие оборудования для выравнивания</ListItemText>
                            </ListItem>
                        )}
                        {warehouse.logistics.railways && (
                            <ListItem disablePadding>
                                <ListItemIcon>
                                    <FiberManualRecordIcon sx ={{
                                        fontSize: '11px'
                                    }}/>
                                </ListItemIcon>
                                <ListItemText>Наличие ж/д сообщения</ListItemText>
                            </ListItem>
                        )}
                        {warehouse.logistics.parking && (
                            <ListItem disablePadding>
                                <ListItemIcon>
                                    <FiberManualRecordIcon sx ={{
                                        fontSize: '11px'
                                    }}/>
                                </ListItemIcon>
                                <ListItemText>Возможность оставить грузовой транспорт на парковке</ListItemText>
                            </ListItem>
                        )}
                        {warehouse.logistics.parking_security && (
                            <ListItem disablePadding>
                                <ListItemIcon>
                                    <FiberManualRecordIcon sx ={{
                                        fontSize: '11px'
                                    }}/>
                                </ListItemIcon>
                                <ListItemText>Охраняемая парковка</ListItemText>
                            </ListItem>
                        )}
                        {warehouse.logistics.parking_cost !== 0 && (
                            <ListItem disablePadding>
                                <Stack direction="row">
                                    {/* TODO: проверить */}
                                <ListItemText>Стоимость охраняемой парковки</ListItemText>
                                <Stack direction="row" spacing={0.5} sx = {{ paddingLeft: '0.5rem', alignItems: "center"}} >
                                    <ValueText>{warehouse.logistics.parking_cost}</ValueText>
                                    <Typography
                                        sx={{
                                            fontFamily: 'Montserrat-Bold',
                                            fontSize: '13px',
                                            alignItems: 'flex-end',
                                        }}
                                    >
                                        руб/сутки
                                    </Typography>
                                </Stack>
                                </Stack>
                            </ListItem>
                        )}
                    </StyledList>
                    <div className={classes.divider}>
                    <Divider/>
                    </div>
                    </>
                ): (<></>)}
                </Stack>
            </Grid>
            </Grid>
            <Grid container>
                <Grid item md={12}>
                <Stack spacing={1.5}>

                <Stack direction="row" spacing={2}>
                    <FmdGoodIcon sx ={{color:"#284AC2"}}></FmdGoodIcon>
                    <SectionTitle>Расположение склада</SectionTitle>
                </Stack>
                <Stack direction="row" spacing={2}>
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
                                <MenuItem value="drive">Грузовик</MenuItem>
                                <MenuItem value="bike">Велосипед</MenuItem>
                                <MenuItem value="walk">Пешеход</MenuItem>
                                </StyledSelect>
                        </StyledFormControl>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Basic example"
                                value={dateValue}
                                onChange={(dateValue) => {
                                    setDateValue(dateValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                </Stack>
                <Stack>
                    <Typography>Время покрытия</Typography>
                    <Typography>{timeValue} минут</Typography>
                    <Slider
                        sx ={{
                            width: '15rem',
                            marginLeft: '0.5rem'
                        }}
                        aria-label="Time"
                        defaultValue={10}

                        onChange={handleTimeChange}
                        valueLabelDisplay="auto"
                        step={10}
                        marks
                        min={10}
                        max={120}
                    />
                </Stack>
                <StyledFormControl size="small">
                    <InputLabel>Время суток</InputLabel>
                        <StyledSelect
                            label="Выберите время суток"
                            value={timeOfTheDay}
                            IconComponent={iconComponent}
                            onChange={(e) => setTimeOfTheDay(e.target.value)}
                            MenuProps={menuProps}
                        >
                        <MenuItem value="" >
                            <em>Не задано</em>
                        </MenuItem>
                        <MenuItem value="0">00:00</MenuItem>
                        <MenuItem value="30">00:30</MenuItem>
                        <MenuItem value="60">01:00</MenuItem>
                        <MenuItem value="90">01:30</MenuItem>
                        <MenuItem value="120">02:00</MenuItem>
                        <MenuItem value="150">02:30</MenuItem>
                        <MenuItem value="180">03:00</MenuItem>
                        <MenuItem value="210">03:30</MenuItem>
                        <MenuItem value="240">04:00</MenuItem>
                        <MenuItem value="270">04:30</MenuItem>
                        <MenuItem value="300">05:00</MenuItem>
                        <MenuItem value="330">05:30</MenuItem>
                        <MenuItem value="360">06:00</MenuItem>
                        <MenuItem value="390">06:30</MenuItem>
                        <MenuItem value="420">07:00</MenuItem>
                        <MenuItem value="450">07:30</MenuItem>
                        <MenuItem value="480">08:00</MenuItem>
                        <MenuItem value="510">08:30</MenuItem>
                        <MenuItem value="540">09:00</MenuItem>
                        <MenuItem value="570">09:30</MenuItem>
                        <MenuItem value="600">10:00</MenuItem>
                        <MenuItem value="630">10:30</MenuItem>
                        <MenuItem value="660">11:00</MenuItem>
                        <MenuItem value="690">11:30</MenuItem>
                        <MenuItem value="720">12:00</MenuItem>
                        <MenuItem value="750">12:30</MenuItem>
                        <MenuItem value="780">13:00</MenuItem>
                        <MenuItem value="810">13:30</MenuItem>
                        <MenuItem value="840">14:00</MenuItem>
                        <MenuItem value="870">14:30</MenuItem>
                        <MenuItem value="900">15:00</MenuItem>
                        <MenuItem value="930">15:30</MenuItem>
                        <MenuItem value="960">16:00</MenuItem>
                        <MenuItem value="990">16:30</MenuItem>
                        <MenuItem value="1020">17:00</MenuItem>
                        <MenuItem value="1050">17:30</MenuItem>
                        <MenuItem value="1080">18:00</MenuItem>
                        <MenuItem value="1110">18:30</MenuItem>
                        <MenuItem value="1140">19:00</MenuItem>
                        <MenuItem value="1170">19:30</MenuItem>
                        <MenuItem value="1200">20:00</MenuItem>
                        <MenuItem value="1230">20:30</MenuItem>
                        <MenuItem value="1260">21:00</MenuItem>
                        <MenuItem value="1290">21:30</MenuItem>
                        <MenuItem value="1320">22:00</MenuItem>
                        <MenuItem value="1350">22:30</MenuItem>
                        <MenuItem value="1380">23:00</MenuItem>
                        <MenuItem value="1410">23:30</MenuItem>
                        </StyledSelect>
                </StyledFormControl>
                {loadingIso ? (
                    <>
                    <LoadingButton
                        loading
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="outlined"
                    >
                        Загрузка
                    </LoadingButton>
                        </>
                ) : (
                    <>
                    <Button 
                    variant="outlined"
                    onClick={(e) => (
                        handleIsochroneChange()
                    )}>
                        Применить
                    </Button> 
                    </>
                )}
                <SingleWarehouseMap warehouse = {warehouse} isoData={isoData}/>
                </Stack>
                </Grid>
            </Grid>


            {/* <RecommendationsBlock /> */}

        </div>
    )
}

export {WarehouseInfo}