import { useQuery } from 'react-query';
import axios from 'axios';
import { API_URL } from '@env';

const fetchProvinces = async () => {
    try {
        const { data } = await axios.get(`${API_URL}/api/locations/provinces`);
        return data;
    } catch (error) {
        console.error('Fetch provinces error:', error);

        // Handle errors by throwing a custom error message
        if (error.response) {
            throw new Error(`Error: ${error.response.status} - ${error.response.data.message}`);
        } else if (error.request) {
            throw new Error('No response received from server');
        } else {
            throw new Error(error.message);
        }
    }
};

const useProvinces = () => {
    return useQuery('provinces', fetchProvinces, {
        staleTime: 1000 * 60 * 7, // 7 minutes
        cacheTime: 1000 * 60 * 10, // 10 minutes
        refetchInterval: 1000 * 60 * 7, // 7 minutes
    });
};

export default useProvinces;
