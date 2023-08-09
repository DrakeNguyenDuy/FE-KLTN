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
