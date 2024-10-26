// src/queries/useSeatStatus.js
import { useQuery } from 'react-query';
import axios from 'axios';

import { API_URL } from '@env';

const fetchSeatByRoomCode = async (code) => {
    try {
        // console.log('API_URL11', API_URL);
        const response = await axios.get(
            `${API_URL}/api/seat-status-in-schedules/getAllSeatsStatusInSchedule?scheduleCode=${code}`,
        );
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

const useSeatStatus = (scheduleCode) => {
    return useQuery(['seatStatus', scheduleCode], () => fetchSeatByRoomCode(scheduleCode), {
        enabled: !!scheduleCode, // Only run the query if scheduleCode is defined
        refetchOnWindowFocus: true,
    });
};

export default useSeatStatus;
