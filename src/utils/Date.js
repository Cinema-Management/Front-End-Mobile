function formatDate(isoString) {
    if (!isoString) return '';
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${day}/${month}/${year}`;
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

module.exports = {
    formatDate,
    formatDuration,
    handleChangAge,
    handleChangAgeRequirement,
};
