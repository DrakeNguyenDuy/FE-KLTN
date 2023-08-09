const get = (key) => {
    try {
        let value = localStorage.getItem(key);

        if (value) {
            value = JSON.parse(value);
        }

        return value;
    } catch (error) {
        console.log('Could not save data: ' + key, error);
    }
};

const set = (key, value) => {
    try {
        return localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.log('Could not set data: ' + key, error);
    }
};

const remove = (key) => {
    try {
        return localStorage.removeItem(key);
    } catch (error) {
        console.log('Could not remove data: ' + key, error);
    }
};

const clear = () => {
    try {
        return localStorage.clear();
    } catch (error) {
        console.log('Could not clear data: ', error);
    }
};

export const getToken = (type = 'alumus') => {
    return get(type === 'employer' ? 'employerToken' : 'alumusToken');
};

const lcStorage = {
    get,
    set,
    remove,
    clear,
};

export default lcStorage;
