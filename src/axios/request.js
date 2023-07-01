import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:8091/api/',
});

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
};

export const post = async (path, data, options = {}) => {
    const response = await request.post(path, data, options);
    return response.data;
};

export const authHeader = (token) => ({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
});

export const authHeaderMultipart = (token) => ({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
});
export default request;
