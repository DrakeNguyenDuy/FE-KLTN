import axios from 'axios';
import { API_ENDPOINT } from '~/constant';

const request = axios.create({
    baseURL: API_ENDPOINT,
});

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
};

export const post = async (path, data, options = {}) => {
    const response = await request.post(path, data, options);
    return response.data;
};

export const put = async (path, data, options = {}) => {
    const response = await request.put(path, data, options);
    return response.data;
};

export const deleteR = async (path, options = {}) => {
    const response = await request.delete(path, options);
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
