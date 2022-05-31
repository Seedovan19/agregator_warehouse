import axios from "axios";


export const getIsochrone = async (values) => {
    const article = { 
        ...(values.vehicle ? { vehicle: values.vehicle } : {}),
    };
    try { 
        const { data } = await axios.post(`http://127.0.0.1:5000/isohrone`, article);
        return data;
    } catch (error) {
        console.log(error)
    }
};
// 1) Выбор средства передвижения (велосипед, пешеход, грузовик) 