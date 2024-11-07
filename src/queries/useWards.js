import { useQuery } from 'react-query';
import axios from 'axios';
import { API_URL } from '@env';

// Hàm fetch dữ liệu quận/huyện
const fetchWards = async (districtCode) => {
    if (!districtCode || districtCode === null) return [];
    try {
        const { data } = await axios.get(`${API_URL}/api/locations/wards/${districtCode}`);
        return data;
    } catch (error) {
        console.error('Fetch districts error:', error);

        // Xử lý lỗi
        if (error.response) {
            throw new Error(`Error: ${error.response.status} - ${error.response.data.message}`);
        } else if (error.request) {
            throw new Error('No response received from server');
        } else {
            throw new Error(error.message);
        }
    }
};

// Hook custom dùng để lấy dữ liệu các quận/huyện
const useWards = (districtCode) => {
    return useQuery(['wards', districtCode], () => fetchWards(districtCode), {
        enabled: !!districtCode,
        staleTime: 1000 * 60 * 7,
        cacheTime: 1000 * 60 * 10,
        refetchInterval: 1000 * 60 * 7,
    });
};

export default useWards;
