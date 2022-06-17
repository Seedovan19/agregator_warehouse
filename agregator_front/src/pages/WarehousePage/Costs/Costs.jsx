import React from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

const CostText = styled(Typography)({
    fontFamily: 'Montserrat-medium',
    fontSize: '10px',
    color: '#4B4B4B'
});

const HighlightedCostText = styled('span')({
    fontSize: '24px',
    color: '#284AC2'
});

const CostStack = styled('Stack')({
    paddingRight:'35px'
});

const Costs = ({warehouse, palletStorage}) => {

    return (
        <div>
            <Grid container>
                {warehouse?.storage_conditions.pallet_storage_cost !== 0 && (
                    <CostStack>
                        <CostText>Стоимость хранения от</CostText>
                        <HighlightedCostText>{warehouse.storage_conditions.pallet_storage_cost}</HighlightedCostText>
                        <CostText>за палету в месяц</CostText>
                    </CostStack>
                )}

                {warehouse?.storage_conditions.pallet_handling_cost !== 0 && (
                    <CostStack>
                        <CostText>Прием/отгрузка от</CostText>
                        <HighlightedCostText>{warehouse?.storage_conditions.pallet_handling_cost}</HighlightedCostText>
                        <CostText>за палету</CostText>
                    </CostStack>
                )}

                {palletStorage !== '' && (
                <CostStack>
                    <CostText>Вместимость (палет)</CostText>
                    {warehouse?.storage_conditions.pallet_storage_capacity === 1 &&
                        <CostText sx ={{color: "#284AC2"}}>
                            меньше &nbsp;<HighlightedCostText>{palletStorage}</HighlightedCostText>
                        </CostText>
                    }
                    {warehouse?.storage_conditions.pallet_storage_capacity !== 1 &&
                        <HighlightedCostText>{palletStorage}</HighlightedCostText>
                    }
                </CostStack>
                )}
                {palletStorage === '' && (
                <CostStack>
                    {warehouse.storage_conditions.pallet_storage_capacity !== 0 && (
                        <>
                        <CostText>Вместимость (палет)</CostText>
                        {warehouse.storage_conditions.pallet_storage_capacity !== 1 && warehouse.storage_conditions.pallet_storage_capacity !== 2 && warehouse.storage_conditions.pallet_storage_capacity !== 3 && warehouse.storage_conditions.pallet_storage_capacity !== 4 && warehouse.storage_conditions.pallet_storage_capacity !== 5 && (
                            <HighlightedCostText>{warehouse.storage_conditions.pallet_storage_capacity}</HighlightedCostText>
                        )}
                        </>
                    )}
                </CostStack>
                )}
                {warehouse?.warehouse_class && (
                <CostStack>
                    <CostText>Класс</CostText>
                    <HighlightedCostText>{warehouse?.warehouse_class}</HighlightedCostText>
                </CostStack>
                )}
            </Grid>
        </div>
    )
}

export {Costs}