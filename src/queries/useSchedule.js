import { useQuery } from 'react-query';
import axios from 'axios';
import { API_URL } from '@env';

const fetchScheduleByMovieAndDate = async (movieCode, date) => {
    try {
        console.log('ApI', API_URL);
        const response = await axios.get(
            `${API_URL}/api/schedules/getSchedulesByDateAndMovie?movieCode=${movieCode}&date=${date}`,
        );
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

const useSchedule = (movieCode, date) => {
    return useQuery(['scheduleByMovieAndDate', movieCode, date], () => fetchScheduleByMovieAndDate(movieCode, date), {
        enabled: !!date,
        staleTime: 1000 * 60 * 7,
        cacheTime: 1000 * 60 * 10,
        refetchInterval: 1000 * 60 * 7,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
};

export default useSchedule;
