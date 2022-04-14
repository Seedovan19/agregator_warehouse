import React from 'react'
import { Dialog, DialogTitle, DialogContent, FormControlLabel, Checkbox, Button, Typography, Chip } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import useStyles from './styles'


const Modal = (props) => {
    const classes = useStyles();
    const { freezer, refrigerator, alcohol, pharmaceuticals, food, dangerous, palletization, boxPicking, transportation, crossdocking, customs } = props.activeFilter;

    const handleClickApplyFilters = () => {
        props.setFreezer(freezer);
        props.setRefrigerator(refrigerator);
        props.setAlco(alcohol);
        props.setPharma(pharmaceuticals);
        props.setFood(food);
        props.setDangerous(dangerous);
        props.setPalletization(palletization);
        props.setBoxPicking(boxPicking);
        props.setTransportation(transportation);
        props.setCrossdocking(crossdocking);
        props.setCustoms(customs);
        props.setModalActive(false);
    };


    const handleCheckChange = (event) => {
        props.setActiveFilter({
          ...props.activeFilter,
          [event.target.name]: event.target.checked,
        });
    };

   

    //TODO: options: [{},{}] - Жалуется на то, что в checked несколько полей с одинаковым значением 
    
    return (
        <Dialog
            open={props.modalActive}
            onClose={() => props.setModalActive(false)}
            fullWidth={false}
            maxWidth={'md'}
        > 
            <DialogTitle>
                Фильтры
            </DialogTitle>
            <DialogContent dividers>
            <Stack
                direction="column"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={3}
            >
                <Stack>
                <Typography>Условия хранения</Typography>
                <Stack 
                    direction='row' 
                >
                    <FormControlLabel
                        control={<Checkbox 
                            disableRipple
                            icon = {<Chip className={classes.default_chip} variant="outlined" label="Морозильная камера"/>} 
                            checkedIcon = {<Chip className={classes.checked_chip} variant="outlined" label="Морозильная камера"/>} 
                            classes = {{root:classes.root}}
                            checked = {freezer ? freezer : false}
                            onChange = {handleCheckChange}
                            name="freezer"
                        />}
                        key={props.freezer}
                    />
                    <FormControlLabel
                        control={<Checkbox 
                            disableRipple
                            icon = {<Chip className={classes.default_chip} variant="outlined" label="Холодильная камера"/>} 
                            checkedIcon = {<Chip className={classes.checked_chip} variant="outlined" label="Холодильная камера"/>} 
                            classes = {{root:classes.root}}
                            checked = {refrigerator ? refrigerator : false}
                            onChange = {handleCheckChange}
                            name="refrigerator"
                        />}
                        key={props.refrigerator}
                    />

                </Stack>
                </Stack>
                <Stack>
                <Typography>Какой товар (лицензии)</Typography>
                <Stack
                    direction='row' 
                >

                    <FormControlLabel
                        control={<Checkbox 
                            disableRipple
                            icon = {<Chip className={classes.default_chip} variant="outlined" label="Хранение алкоголя"/>} 
                            checkedIcon = {<Chip className={classes.checked_chip} variant="outlined" label="Хранение алкоголя"/>} 
                            classes = {{root:classes.root}}
                            checked = {alcohol ? alcohol : false}
                            onChange = {handleCheckChange}
                            name="alcohol"
                        />}
                        key={props.alco}
                    />
                    <FormControlLabel
                        control={<Checkbox 
                            disableRipple
                            icon = {<Chip className={classes.default_chip} variant="outlined" label="Хранение фармацевтической продукции"/>} 
                            checkedIcon = {<Chip className={classes.checked_chip} variant="outlined" label="Хранение фармацевтической продукции"/>} 
                            classes = {{root:classes.root}}
                            checked = {pharmaceuticals ? pharmaceuticals : false}
                            onChange = {handleCheckChange}
                            name="pharmaceuticals"
                        />}
                        key={props.pharma}
                    />
                    <FormControlLabel
                        control={<Checkbox 
                            disableRipple
                            icon = {<Chip className={classes.default_chip} variant="outlined" label="Хранение пищевой продукции"/>} 
                            checkedIcon = {<Chip className={classes.checked_chip} variant="outlined" label="Хранение пищевой продукции"/>} 
                            classes = {{root:classes.root}}
                            checked = {food ? food : false}
                            onChange = {handleCheckChange}
                            name="food"
                        />}
                        key={props.food}
                    />
                    <FormControlLabel
                        control={<Checkbox 
                            disableRipple
                            icon = {<Chip className={classes.default_chip} variant="outlined" label="Хранение опасных грузов"/>} 
                            checkedIcon = {<Chip className={classes.checked_chip} variant="outlined" label="Хранение опасных грузов"/>} 
                            classes = {{root:classes.root}}
                            checked = {dangerous ? dangerous : false}
                            onChange = {handleCheckChange}
                            name="dangerous"
                        />}
                        key={props.dangerous}
                    />
                </Stack>
                </Stack>

                <Stack>
                <Typography>Услуги</Typography>
                <Stack
                    direction='row' 
                >
                    <FormControlLabel
                        control={<Checkbox 
                            disableRipple
                            icon = {<Chip className={classes.default_chip} variant="outlined" label="Паллетизация грузов"/>} 
                            checkedIcon = {<Chip className={classes.checked_chip} variant="outlined" label="Паллетизация грузов"/>} 
                            classes = {{root:classes.root}}
                            checked = {palletization ? palletization : false}
                            onChange = {handleCheckChange}
                            name="palletization"
                        />}
                        key={props.palletization}
                    />
                    <FormControlLabel
                        control={<Checkbox 
                            disableRipple
                            icon = {<Chip className={classes.default_chip} variant="outlined" label="Отгрузки коробками"/>} 
                            checkedIcon = {<Chip className={classes.checked_chip} variant="outlined" label="Отгрузки коробками"/>} 
                            classes = {{root:classes.root}}
                            checked = {boxPicking ? boxPicking : false}
                            onChange = {handleCheckChange}
                            name="boxPicking"
                        />}
                        key={props.boxPicking}
                    />
                    <FormControlLabel
                        control={<Checkbox 
                            disableRipple
                            icon = {<Chip className={classes.default_chip} variant="outlined" label="Транспортные услуги"/>} 
                            checkedIcon = {<Chip className={classes.checked_chip} variant="outlined" label="Транспортные услуги"/>} 
                            classes = {{root:classes.root}}
                            checked = {transportation ? transportation : false}
                            onChange = {handleCheckChange}
                            name="transportation"
                        />}
                        key={props.transport}
                    />
                    <FormControlLabel
                        control={<Checkbox 
                            disableRipple
                            icon = {<Chip className={classes.default_chip} variant="outlined" label="Кросс-докинг"/>} 
                            checkedIcon = {<Chip className={classes.checked_chip} variant="outlined" label="Кросс-докинг"/>} 
                            classes = {{root:classes.root}}
                            checked = {crossdocking ? crossdocking : false}
                            onChange = {handleCheckChange}
                            name="crossdocking"
                        />}
                        key={props.crossdocking}
                    />
                    <FormControlLabel
                        control={<Checkbox 
                            disableRipple
                            icon = {<Chip className={classes.default_chip} variant="outlined" label="Таможенные услуги"/>} 
                            checkedIcon = {<Chip className={classes.checked_chip} variant="outlined" label="Таможенные услуги"/>} 
                            classes = {{root:classes.root}}
                            checked = {customs ? customs : false}
                            onChange = {handleCheckChange}
                            name="customs"
                        />}
                        key={props.customs}
                    />
                </Stack>
                </Stack>
            </Stack>
            </DialogContent>
          <Button onClick={handleClickApplyFilters}>Применить фильтры</Button>
        </Dialog>
    );
};

export default Modal;