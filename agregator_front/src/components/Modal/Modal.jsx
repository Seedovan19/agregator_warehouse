import React from 'react'
import { Dialog, DialogTitle, FormControlLabel, Checkbox, Button } from '@material-ui/core';


const Modal = ({modalActive, setModalActive, alco, setAlco, transport, setTransportation, activeFilter, setActiveFilter }) => {
    const { alcohol, transportation } = activeFilter;

    const handleClickApplyFilters = () => {
        console.log(alcohol);
        setAlco(alcohol);
        setTransportation(transportation);
        setModalActive(false);
    };


    const handleCheckChange = (event) => {
        setActiveFilter({
          ...activeFilter,
          [event.target.name]: event.target.checked,
        });
    };

    //TODO: options: [{},{}] - Жалуется на то, что в cheked несколько полей с одинаковым значением 
    
    return (
        <Dialog
            open={modalActive}
            onClose={() => setModalActive(false)}
        > 
            <DialogTitle>Set backup account</DialogTitle>
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange = {handleCheckChange}
                            checked = {alcohol}
                            name="alcohol"
                        />
                        }
                    label="Хранение алкоголя"
                    key={alco}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange = {handleCheckChange}
                            checked = {transportation}
                            name="transportation"
                        />
                        }
                    label="Транспортные услуги"
                    key={transport}
                />
          <Button onClick={handleClickApplyFilters}>Применить фильтры</Button>
        </Dialog>
    );
};

export default Modal;