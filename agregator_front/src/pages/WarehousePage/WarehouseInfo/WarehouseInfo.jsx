import React from 'react'
import { Grid, Typography, Divider } from '@material-ui/core';
import Stack from '@mui/material/Stack';
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
    console.log(warehouse)
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
                    <SingleWarehouseMap warehouse = {warehouse}/>
                </Stack>
                </Grid>
            </Grid>
            
            
            <RecommendationsBlock />
            
        </div>
    )
}

export {WarehouseInfo}