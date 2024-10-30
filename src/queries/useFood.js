// src/queries/useFood.js
import { useQuery } from 'react-query';
import axios from 'axios';

import { API_URL } from '@env';

const fetchFood = async (date) => {
    try {
        const URL = API_URL;
        const response = await axios.get(`${URL}/api/prices/getAllPriceFood?date=${date}`);
        const data = response.data;
        const comboItems = data.filter((item) => item.productName.toLowerCase().includes('combo'));

        return comboItems;
    } catch (error) {
        if (error.response) {
            throw new Error(`Error: ${error.response.status} - ${error.response.data.message}`);
        } else if (error.request) {
            throw new Error('Error: No response received from server');
        } else {
            throw new Error('Error: ' + error.message);
        }
    }
};

const useFood = (date) => {
    return useQuery(['food', date], () => fetchFood(date), {
        enabled: !!date, // Only run the query if scheduleCode is defined
        refetchOnWindowFocus: true,
    });
};

export default useFood;
