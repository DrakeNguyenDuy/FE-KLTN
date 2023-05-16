import request from './request';

// Set up your API endpoint for login
// customer = student
// employer = v1/private/login
// admin = user

const API_LOGIN = 'v1/private/login';
const API_AUTH_USER = 'v1/private/user/profile';

const login = async (data) => {
    const response = await request.post(API_LOGIN, {
        username: data.username,
        password: data.password,
    });
    localStorage.setItem('token', JSON.stringify(response.data.token));
    return response.data;
};

const logout = () => {
    localStorage.removeItem('token');
};

const getToken = () => {
    const token = localStorage.getItem('token');
    return token;
};

const getUser = async (data) => {
    const response = await request.get(API_AUTH_USER, {
        headers: {
            Authorization: `Bearer ${data.token}`,
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export { login, logout, getToken, getUser };
