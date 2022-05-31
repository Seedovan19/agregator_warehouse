import axios from "axios";


export const getIsochrone = async (vehicle) => {

    try {    
        const coordinates = await axios.get(`http://127.0.0.1:5000/isochrone?vehicle=${vehicle}`)
        return coordinates.data;
    } catch (error) {
        console.log(error)
    }
};
