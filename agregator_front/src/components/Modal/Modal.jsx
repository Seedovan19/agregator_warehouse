import React from 'react'
import { Dialog, DialogTitle, DialogContent, FormControlLabel, Checkbox, Button, Typography, Chip } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import useStyles from './styles'


const Modal = (props) => {
    const classes = useStyles();
    const { freezer, refrigerator, alcohol, transportation } = props.activeFilter;

    const handleClickApplyFilters = () => {
        props.setFreezer(freezer);
        props.setRefrigerator(refrigerator);
        props.setAlco(alcohol);
        props.setTransportation(transportation);
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
                </Stack>
                <Stack>
                    <Typography>Услуги</Typography>
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
                </Stack>
            </Stack>
            </DialogContent>
          <Button onClick={handleClickApplyFilters}>Применить фильтры</Button>
        </Dialog>
    );
};

export default Modal;