import { useQuery } from 'react-query';
import axios from 'axios';
import { API_URL } from '@env';

const fetchSpendingForCurrentYear = async (customerCode) => {
    try {
        const response = await axios.get(`${API_URL}/api/users/spendingForCurrentYear/${customerCode}`);
        const data = response.data;

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

const useSpendingForCurrentYear = (customerCode) => {
    return useQuery(['spendingForCurrentYear', customerCode], () => fetchSpendingForCurrentYear(customerCode), {
        enabled: !!customerCode,
        staleTime: 1000 * 60 * 7,
        cacheTime: 1000 * 60 * 10,
        refetchInterval: 1000 * 60 * 7,
    });
};

export default useSpendingForCurrentYear;
