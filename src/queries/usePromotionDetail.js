// src/queries/useFood.js
import { useQuery } from 'react-query';
import axios from 'axios';

import { API_URL } from '@env';

const fetchPromotionDetail = async (date) => {
    try {
        const response = await axios.get(
            `${API_URL}/api/promotion-details/getPromotionDetailsByDateAndStatus?date=${date}`,
        );
        const data = response.data || [];

        // Sắp xếp dữ liệu theo type tăng dần
        data.sort((a, b) => a.type - b.type);

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

const usePromotionDetail = (date) => {
    return useQuery(['promotionDetail', date], () => fetchPromotionDetail(date), {
        enabled: !!date, // Only run the query if scheduleCode is defined
        refetchOnWindowFocus: true,
    });
};

export default usePromotionDetail;
