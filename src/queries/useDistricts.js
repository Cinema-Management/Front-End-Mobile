import { useQuery } from 'react-query';
import axios from 'axios';
import { API_URL } from '@env';

// Hàm fetch dữ liệu quận/huyện
const fetchDistricts = async (provinceCode) => {
    console.log('provinceCode111', provinceCode);

    if (!provinceCode || provinceCode === null) return [];
    try {
        const { data } = await axios.get(`${API_URL}/api/locations/districts/${provinceCode}`);
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
const useDistricts = (provinceCode) => {
    return useQuery(
        ['districts', provinceCode], // Key của query phải bao gồm provinceCode
        () => fetchDistricts(provinceCode), // Gọi API với provinceCode
        {
            enabled: !!provinceCode, // Chỉ gọi API khi có provinceCode
            staleTime: 1000 * 60 * 7, // 7 phút
            cacheTime: 1000 * 60 * 10, // 10 phút
            refetchInterval: 1000 * 60 * 7, // 7 phút
        },
    );
};

export default useDistricts;
