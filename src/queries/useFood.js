// src/queries/useFood.js
import { useQuery } from 'react-query';
import axios from 'axios';

import { API_URL } from '@env';

const fetchFood = async (date) => {
    try {
        const response = await axios.get(`${API_URL}/api/prices/getAllPriceFood?date=${date}`);
        const data = response.data;
        // const comboItems = data.filter((item) => item.productName.toLowerCase().includes('combo'));

        return data;
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
        staleTime: 1000 * 60 * 7, // 7 minutes
        cacheTime: 1000 * 60 * 10, // 10 minutes
        refetchInterval: 1000 * 60 * 7, // 7 minutes
        refetchOnWindowFocus: true,
    });
};

export default useFood;
