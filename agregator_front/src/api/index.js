import axios from "axios";

export const getWarehousesData = async (type, palletQuantity, freezer, refrigerator, alco, pharma, food, dangerous, transport) => {
    try {    
        const { data } = await axios.get(`http://127.0.0.1:8000/api/warehouses/warehouse-list`, {
            params: {
                ...(type ? { warehouse_class: type } : {}),
                ...(palletQuantity ? { warehouse_class: palletQuantity } : {}),
                ...(refrigerator ? { features__refrigerator: refrigerator } : {}),
                ...(freezer ? { features__freezer: freezer } : {}),
                ...(alco ? { features__alcohol: alco } : {}),
                ...(pharma ? { features__pharmacy: pharma } : {}),
                ...(food ? { features__food: food } : {}),
                ...(dangerous ? { features__dangerous: dangerous } : {}),
                ...(transport ? { services__transport_services: transport } : {}),
            },
        });

        return data.results;
    } catch (error) {
        console.log(error)
    }
};
