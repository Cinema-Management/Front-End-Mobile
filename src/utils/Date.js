const dayjs = require('dayjs');
import 'dayjs/locale/vi';

dayjs.locale('vi');
function formatDate(isoString) {
    if (!isoString) return '';
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${day}/${month}/${year}`;
}
function formatTime(isoString) {
    if (!isoString) return '';

    const date = new Date(isoString);

    if (isNaN(date.getTime())) return '';

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
}

function formatDuration(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    let result = '';
    if (hours > 0) {
        result += `${hours} giờ `;
    }
    if (minutes > 0) {
        result += `${minutes} phút`;
    }

    return result.trim();
}
function handleChangAge(age) {
    if (age === 13) {
        return 'C13';
    } else if (age === 16) {
        return 'C16';
    } else if (age === 18) {
        return 'C18';
    } else {
        return 'P';
    }
}
function handleChangAgeRequirement(age) {
    if (age === 13) {
        return 'C13 - Phim được phổ biến đến người xem từ đủ 13 tuổi trở lên (13+)';
    } else if (age === 16) {
        return 'C16 - Phim được phổ biến đến người xem từ đủ 16 tuổi trở lên (16+)';
    } else if (age === 18) {
        return 'C18 - Phim được phổ biến đến người xem từ đủ 18 tuổi trở lên (18+)';
    } else {
        return 'P - Phim được phép phổ biến đến người xem ở mọi độ tuổi';
    }
}
const parseFormattedDateWithTime = (formattedDate) => {
    const monthsMap = {
        'Tháng 1': 0,
        'Tháng 2': 1,
        'Tháng 3': 2,
        'Tháng 4': 3,
        'Tháng 5': 4,
        'Tháng 6': 5,
        'Tháng 7': 6,
        'Tháng 8': 7,
        'Tháng 9': 8,
        'Tháng 10': 9,
        'Tháng 11': 10,
        'Tháng 12': 11,
    };

    const regex = /(?:Thứ )?(Hai|Ba|Tư|Năm|Sáu|Bảy|Chủ Nhật), (\d+) Tháng (\d+), (\d+)/;
    const matches = formattedDate.match(regex);

    if (matches) {
        const day = parseInt(matches[2], 10);
        const month = monthsMap[`Tháng ${matches[3]}`];
        const year = parseInt(matches[4], 10);

        const date = dayjs()
            .year(year)
            .month(month)
            .date(day)
            .subtract(1, 'day')
            .hour(24)
            .minute(0)
            .second(0)
            .millisecond(0);

        return date.toISOString();
    }

    return null;
};
const capitalizeFirstLetterOfEachWord = (str) => {
    return str
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
const generateDates = () => {
    let dates = [];

    for (let i = 0; i < 30; i++) {
        const date = dayjs().add(i, 'day');
        const fullDateString = date.format('dddd, D [tháng] M, YYYY');
        const capitalizedFullDateString = capitalizeFirstLetterOfEachWord(fullDateString);
        dates.push({
            label:
                i === 0
                    ? 'Hôm nay'
                    : date
                          .format('dd')
                          .replace('Mo', 'T2')
                          .replace('Tu', 'T3')
                          .replace('We', 'T4')
                          .replace('Th', 'T5')
                          .replace('Fr', 'T6')
                          .replace('Sa', 'T7')
                          .replace('Su', 'CN'),
            fullDate: date.format('DD-MM'),
            fullDateString: capitalizedFullDateString,
        });
    }
    return dates;
};

function formatDateTicket(dateString) {
    const date = new Date(dateString);

    date.setUTCHours(date.getUTCHours() + 7);

    const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const dayName = days[date.getUTCDay()];

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = String(date.getUTCFullYear()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');

    return `${hours}:${minutes} | ${dayName}, ${day}/${month}/${year}`;
}

function formatDateTimeSalesInvoice(dateString) {
    const date = new Date(dateString);

    date.setUTCHours(date.getUTCHours() + 7);

    const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const dayName = days[date.getUTCDay()];

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = String(date.getUTCFullYear()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');

    return `${hours}:${minutes}, ${day}/${month}/${year}`;
}
const formatTimer = (seconds) => {
    const minutes = Math.floor(seconds / 60); // Lấy số phút
    const remainingSeconds = seconds % 60; // Lấy số giây còn lại

    // Đảm bảo luôn có 2 chữ số cho phút và giây
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
};
module.exports = {
    formatDate,
    formatDuration,
    handleChangAge,
    handleChangAgeRequirement,
    parseFormattedDateWithTime,
    generateDates,
    formatTime,
    formatDateTicket,
    formatDateTimeSalesInvoice,
    formatTimer,
};
