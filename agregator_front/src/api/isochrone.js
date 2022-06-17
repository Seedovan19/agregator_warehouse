import axios from "axios";


export const getIsochrone = async (warehouse, vehicle, dateValue, timeValue, timeOfTheDay) => {

    try {    
        const coordinates = await axios.get(`http://127.0.0.1:5000/isochrone`, { 
            params: { 
                ...(vehicle ? { vehicle: vehicle } : { vehicle: 'drive' }),
                ...(warehouse ? { lon: warehouse.wh_longitude } : { lon: 0 }),
                ...(warehouse ? { lat: warehouse.wh_latitude } : { lat: 0 }),
                ...(dateValue ? { month: dateValue } : { month: 0 }),
                ...(timeValue ? { time: timeValue } : { time: 10 }),
                ...(timeOfTheDay ? { time_day: timeOfTheDay } : { time_day: 0 }),
            }
        })
        return coordinates.data.coordinates[0];
    } catch (error) {
        console.log(error)
    }
};
//http://127.0.0.1:5000/isochrone?vehicle=drive&lon=34.3415&lat=59.2341&month=6&time=10&time_day=200