import { useQuery } from 'react-query';
import axios from 'axios';
import { API_URL } from '@env';

const fetchHierarchyValues = async (address) => {
    try {
        const response = await axios.get(`${API_URL}/api/hierarchy-values/${address}`);
        return response.data;
    } catch (error) {
        console.error('Fetch hierarchy values error:', error);

        // Xử lý lỗi chi tiết
        if (error.response) {
            throw new Error(`Error: ${error.response.status} - ${error.response.data.message}`);
        } else if (error.request) {
            throw new Error('No response received from server');
        } else {
            throw new Error(error.message);
        }
    }
};

// Hook custom để lấy hierarchy values
const useAddress = (address) => {
    return useQuery(['hierarchy-values', address], () => fetchHierarchyValues(address), {
        enabled: !!address, // Chỉ gọi API khi có address
        staleTime: 1000 * 60 * 5, // 5 phút
        cacheTime: 1000 * 60 * 10, // 10 phút
    });
};

export default useAddress;
