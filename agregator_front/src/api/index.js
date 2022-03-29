import axios from "axios";

export const getWarehousesData = async (type) => {
    try {
        if (type === '')  {
            const { data } = await axios.get('http://127.0.0.1:8000/api/warehouse-list');
            return data;

        } else {
            const { data } = await axios.get(`http://127.0.0.1:8000/api/warehouse-list/${type}`);
            return data;
        }
    } catch (error) {
        console.log(error)
    }
};
