import axios from "axios";

export const getWarehousesData = async (type, alco) => {
    try {    
        const { data } = await axios.get(`http://127.0.0.1:8000/api/warehouses/warehouse-list`, { // какая то проблема с A+
            params: {
                ...(type ? { warehouse_class: type } : {}),
                ...(alco ? { features__alcohol: alco } : {}),
            },
        });

        return data.results;
    } catch (error) {
        console.log(error)
    }
};
