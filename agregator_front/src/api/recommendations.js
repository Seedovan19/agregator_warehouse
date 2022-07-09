import axios from "axios";


export const postSurveyResults = async (values) => {
    const article = { 
        ...(values.product_type ? { product_type: values.product_type } : {}),
        ...(values.condition ? { condition: values.condition } : { condition: 'No value' }),
        ...(values.freezer ? { freezer: values.freezer } : { freezer: false }),
        ...(values.refrigerator ? { refrigerator: values.refrigerator } : { refrigerator: false }),
        ...(values.alcohol ? { alcohol: values.alcohol } : { alcohol: false }),
        ...(values.pharmaceuticals ? { pharmaceuticals: values.pharmaceuticals } : { pharmaceuticals: false }),
        ...(values.food ? { food: values.food } : { food: false }),
        ...(values.dangerous ? { dangerous: values.dangerous } : { dangerous: false }),
        ...(values.warehouse_class ? { warehouse_class: values.warehouse_class } : {}),
        ...(values.wh_latlon[0] ? { wh_lat: values.wh_latlon[0] } : {}),
        ...(values.wh_latlon[1] ? { wh_lon: values.wh_latlon[1] } : {}),
        ...(values.transport_services ? { transport_services: values.transport_services } : { transport_services: false }),
        ...(values.custom ? { custom: values.custom } : { custom: false }),
        ...(values.crossdock ? { crossdock: values.crossdock } : { crossdock: false }),
        ...(values.palletization ? { palletization: values.palletization } : { palletization: false }),
        ...(values.box_pick ? { box_pick: values.box_pick } : { box_pick: false }),
        ...(values.leveling_platform ? { leveling_platform: values.leveling_platform } : { leveling_platform: false }),
        ...(values.railways ? { railways: values.railways } : { railways: false }),
        ...(values.palletQuantity ? { palletQuantity: values.palletQuantity } : {}),
        ...(values.long_term_commitment ? { long_term_commitment: values.long_term_commitment } : { long_term_commitment: false }),
    };
    try { 
        const { data } = await axios.post(`http://127.0.0.1:8000/api/warehouses/survey-results-append`, article);
        return data;
    } catch (error) {
        console.log(error)
    }
};

export const getRecommendations = async (values) => {
    try {    
        const { data } = await axios.get(`http://127.0.0.1:5000/`, {
            params: {
                ...(values.product_type ? { product_type: values.product_type } : {}),
                ...(values.condition ? { condition: values.condition } : { condition: 'No value' }),
                ...(values.freezer ? { freezer: values.freezer } : { freezer: false }),
                ...(values.refrigerator ? { refrigerator: values.refrigerator } : { refrigerator: false }),
                ...(values.alcohol ? { alcohol: values.alcohol } : { alcohol: false }),
                ...(values.pharmaceuticals ? { pharmaceuticals: values.pharmaceuticals } : { pharmaceuticals: false }),
                ...(values.food ? { food: values.food } : { food: false }),
                ...(values.dangerous ? { dangerous: values.dangerous } : { dangerous: false }),
                ...(values.warehouse_class ? { warehouse_class: values.warehouse_class } : {}),
                ...(values.wh_latlon[0] ? { wh_lat: values.wh_latlon[0] } : {}),
                ...(values.wh_latlon[1] ? { wh_lon: values.wh_latlon[1] } : {}),
                ...(values.transport_services ? { transport_services: values.transport_services } : { transport_services: false }),
                ...(values.custom ? { custom: values.custom } : { custom: false }),
                ...(values.crossdock ? { crossdock: values.crossdock } : { crossdock: false }),
                ...(values.palletization ? { palletization: values.palletization } : { palletization: false }),
                ...(values.box_pick ? { box_pick: values.box_pick } : { box_pick: false }),
                ...(values.leveling_platform ? { leveling_platform: values.leveling_platform } : { leveling_platform: false }),
                ...(values.railways ? { railways: values.railways } : { railways: false }),
                ...(values.palletQuantity ? { palletQuantity: values.palletQuantity } : {}),
                ...(values.long_term_commitment ? { long_term_commitment: values.long_term_commitment } : { long_term_commitment: false }),
            },
        });
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
};


export const RetrieveTopNRecs = async (element_id) => {

    try {    
        const warehouse_data = await axios.get(`http://127.0.0.1:8000/api/warehouses/warehouse-list?id=${element_id}`)
        return warehouse_data;
    } catch (error) {
        console.log(error)
    }
};

