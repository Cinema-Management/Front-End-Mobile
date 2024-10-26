import { useQuery } from 'react-query';
import axios from 'axios';
import { API_URL } from '@env';

const fetchMovieHome = async (status) => {
    try {
        // console.log('status', API_URL);
        const response = await axios.get(`${API_URL}/api/schedules/getAllMovieWithSchedules?status=${status}`);
        const data = response.data;

        return data;
    } catch (error) {
        if (error.response) {
            console.error('Response error:', error.response.data); // Ghi lại dữ liệu lỗi phản hồi
            throw new Error(`Error: ${error.response.status} - ${error.response.data.message}`);
        } else if (error.request) {
            console.error('Request error:', error.request); // Ghi lại yêu cầu
            throw new Error('Error: No response received from server');
        } else {
            console.error('Error:', error.message); // Ghi lại lỗi chung
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
        refetchOnWindowFocus: false,
    });
};

export default useMovieSchedule;
