import axios from 'axios';
import { API_URL } from '@env';

const updateStatusSeat = async (selectedSeats, status, scheduleCode) => {
    if (!selectedSeats || !status || !scheduleCode) return;

    try {
        const arrayCode = selectedSeats.map((seat) => seat.code);
        const seatPayload = {
            scheduleCode: scheduleCode,
            arrayCode: arrayCode,
            status: status,
        };

        const response = await axios.put(`${API_URL}/api/seat-status-in-schedules`, seatPayload);

        if (response.data) {
            console.log(
                'Update status seat successfully:',
                response.data.map((seat) => 'status:' + seat.status + ' code: ' + seat.productCode),
            );
            return response.data;
        } else {
            console.log('Update status seat failed');
        }
    } catch (error) {
        console.error('Error updating status seat:', error);
        throw error; // Ném lỗi để xử lý ở nơi khác nếu cần
    }
};

export default updateStatusSeat;
