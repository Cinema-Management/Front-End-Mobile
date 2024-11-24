import { useQuery } from 'react-query';
import axios from 'axios';
import { API_URL } from '@env';

const fetchMovieHome = async (status) => {
    try {
        const response = await axios.get(`${API_URL}/api/schedules/getAllMovieWithSchedules?status=${status}`);
        const data = response.data;

        return data;
    } catch (error) {
        if (error.response) {
            console.error('Response error:', error.response.data);
            throw new Error(`Error: ${error.response.status} - ${error.response.data.message}`);
        } else if (error.request) {
            console.error('Request error:', error.request);
            throw new Error('Error: No response received from server');
        } else {
            console.error('Error:', error.message);
            throw new Error('Error: ' + error.message);
        }
    }
};

const useMovieSchedule = (status) => {
    return useQuery(['movieSchedule', status], () => fetchMovieHome(status), {
        enabled: !!status,
        staleTime: 1000 * 60 * 7,
        cacheTime: 1000 * 60 * 10,
        refetchInterval: 1000 * 60 * 7,
        refetchOnReconnect: false,
        refetchOnWindowFocus: 'always',
    });
};

export default useMovieSchedule;
