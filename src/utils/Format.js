import { v4 as uuidv4 } from 'uuid';

export const formatCurrency = (value) => {
    return value ? value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) : null;
};

export const formatDateString = (templateCurrent, separatorCurrent, templateFormat, separatorFormat, dateString) => {
    if (templateCurrent && separatorCurrent && templateFormat && separatorFormat && dateString) {
        let day = '';
        let month = '';
        let year = '';
        const convertDate = dateString.split(' ')[0];
        const parts = convertDate.split(separatorCurrent);
        month = parts[1];
        switch (templateCurrent) {
            case 'YYYY/MM/DD': {
                day = parts[2];
                year = parts[0];
                break;
            }
            case 'DD/MM/YYYY': {
                year = parts[2];
                day = parts[0];
                break;
            }
            default:
                break;
        }
        switch (templateFormat) {
            case 'YYYY/MM/DD':
                return year + separatorFormat + month + separatorFormat + day;
            case 'DD/MM/YYYY':
                return day + separatorFormat + month + separatorFormat + year;
            default:
                return 'null';
        }
    } else return null;
};

export const formatDashName = (name) => {
    let convertedName = name
        .normalize('NFD') // Chuyển đổi sang Unicode tổ hợp
        .replace(/[\u0300-\u036f]/g, '') // Loại bỏ các dấu thanh và dấu huyền
        .toLowerCase() // Chuyển đổi thành chữ thường
        .replace(/\s+/g, '-'); // Thay thế khoảng trắng bằng dấu gạch ngang
    //thêm uuid
    convertedName = convertedName + '-' + uuidv4();
    return convertedName;
};
