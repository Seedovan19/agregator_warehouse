import React from 'react'
import { Dialog, DialogTitle, DialogContent, FormControlLabel, Checkbox, Button, Typography, Chip } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import useStyles from './styles'


const Modal = (props) => {
    const classes = useStyles();
    const { freezer, alcohol, transportation } = props.activeFilter;

    const handleClickApplyFilters = () => {
        props.setFreezer(freezer);
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
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                alignItems="center"
                spacing={3}
                justifyContent="space-evenly"
            >
                <Stack>
                    <Typography>Условия хранения</Typography>
                    <FormControlLabel
                        control={<Checkbox 
                            disableRipple
                            icon={<Chip className={classes.default_chip} variant="outlined" label="Морозильная камера"/>} 
                            checkedIcon={<Chip className={classes.checked_chip} variant="outlined" label="Морозильная камера"/>} 
                            classes={{root:classes.root}}
                            checked = {freezer ? freezer : false}
                            onChange = {handleCheckChange}
                            name="freezer"
                        />}
                        key={props.freezer}
                    />

                </Stack>
                <Stack>
                    <Typography>Какой товар (лицензии)</Typography>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange = {handleCheckChange}
                                checked = {alcohol ? alcohol : false}
                                name="alcohol"
                            />
                            }
                        label="Хранение алкоголя"
                        key={props.alco}
                    />
                </Stack>
                <Stack>
                    <Typography>Услуги</Typography>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange = {handleCheckChange}
                                checked = {transportation ? transportation : false}
                                name="transportation"
                            />
                            }
                        label="Транспортные услуги"
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