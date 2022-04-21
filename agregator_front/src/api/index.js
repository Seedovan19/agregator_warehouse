import axios from "axios";

export const getWarehousesData = async (type, palletQuantity, freezer, refrigerator, alco, pharma, food, dangerous, palletization, boxPicking, transport, crossdocking, customs) => {
    try {    
        const { data } = await axios.get(`http://127.0.0.1:8000/api/warehouses/warehouse-list`, {
            params: {
                ...(type ? { warehouse_class: type } : {}),
                ...(palletQuantity ? { storagecond__pallet_storage_capacity__lte: palletQuantity } : {}),
                ...(refrigerator ? { features__refrigerator: refrigerator } : {}),
                ...(freezer ? { features__freezer: freezer } : {}),
                ...(alco ? { features__alcohol: alco } : {}),
                ...(pharma ? { features__pharmacy: pharma } : {}),
                ...(food ? { features__food: food } : {}),
                ...(dangerous ? { features__dangerous: dangerous } : {}),
                ...(palletization ? { services__palletization: palletization } : {}),
                ...(boxPicking ? { services__box_pick: boxPicking } : {}),
                ...(transport ? { services__transport_services: transport } : {}),
                ...(crossdocking ? { services__crossdock: crossdocking } : {}),
                ...(customs ? { services__custom: customs } : {}),
            },
        });

        return data.results;
    } catch (error) {
        console.log(error)
    }
};

export const getWarehouseImagesData = async (id) => {
    try {    
        const { data } = await axios.get(`http://127.0.0.1:8000/api/warehouses/warehouse-detail/images/`, {
            params: {
                ...(id ? { warehouse__id: id } : {}),
            },
        });

        return data;
    } catch (error) {
        console.log(error)
    }
}