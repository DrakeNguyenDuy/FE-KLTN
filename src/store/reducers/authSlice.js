import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request, { authHeader } from '~/axios/request';

const API_EMPLOYER_LOGIN = 'v1/private/login';
const API_ALUMUS_LOGIN = 'v1/customer/login';
const API_GET_EMPLOYER = 'v1/private/user/profile';
const API_AUTH_EMPLOYER = 'v1/private/store';
const API_AUTH_ALUMUS = 'v1/auth/customer/profile';
const API_AUTH_ALUMUS_PROFILE = 'v1/auth/profile';
const API_REGISTER_ALUMUS = 'v1/customer/register';

export const getToken = (type) => {
    const token = JSON.parse(localStorage.getItem(type === 'employer' ? 'employerToken' : 'alumusToken'));
    return token;
};

export const getAuthUsername = async (type) => {
    const token = getToken();
    let userName = null;
    if (token) {
        const authRes = await request.get(type === 'employer' ? API_GET_EMPLOYER : API_AUTH_ALUMUS, {
            headers: authHeader(token),
        });
        userName = authRes.data.userName;
    }
    return userName;
};

const getUser = async (data) => {
    let user = null;
    const response = await request.get(data.type === 'employer' ? API_GET_EMPLOYER : API_AUTH_ALUMUS, {
        headers: authHeader(data.token),
    });
    user = response.data;
    if (data.type === 'alumus') {
        const res = await request.get(API_AUTH_ALUMUS_PROFILE, {
            headers: authHeader(data.token),
        });
        user = { ...user, ...res.data };
    } else {
        const res = await request.get(API_AUTH_EMPLOYER + '/' + user.merchant, {
            headers: authHeader(data.token),
        });
        user = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.emailAddress,
            userName: user.userName,
            active: user.active,
            code: user.merchant,
            companyName: res.data.name,
            companyEmail: res.data.email,
            phoneCompany: res.data.phone,
            addressCompany: res.data.address,
            logoCompany: res.data.logo,
        };
    }
    console.log('get user');
    return user;
};

export const login = createAsyncThunk('auth/login', async (data) => {
    const response = await request.post(data.type === 'employer' ? API_EMPLOYER_LOGIN : API_ALUMUS_LOGIN, {
        username: data.username,
        password: data.password,
    });
    localStorage.setItem(
        data.type === 'employer' ? 'employerToken' : 'alumusToken',
        JSON.stringify(response.data.token),
    );
    return response.data;
});

export const registerAlumus = createAsyncThunk('auth/registerAlumus', async (data) => {
    const response = await request.post(API_REGISTER_ALUMUS, data);
    return response.data;
});

export const auth = createAsyncThunk('auth/authUser', async (type) => {
    const token = await getToken(type);
    console.log('auth');
    if (token) {
        const res = await getUser({ token: token, type: type });
        return { user: res, token: token };
    } else return null;
});

export const logout = createAsyncThunk('auth/logout', async (type) => {
    localStorage.removeItem(type === 'employer' ? 'employerToken' : 'alumusToken');
    return type;
});

const initialState = {
    token: null,
    loading: false,
    error: null,
    user: null,
    authLoading: false,
    registerAlumus: null,
    registerAlumusLoading: false,
    registerAlumusMessage: null,
};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(auth.pending, (state, action) => {
                state.authLoading = true;
            })
            .addCase(auth.fulfilled, (state, action) => {
                if (action.payload) {
                    state.user = action.payload.user;
                    state.token = action.payload.token;
                }
                state.authLoading = false;
            })
            .addCase(auth.rejected, (state, action) => {
                state.authLoading = false;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.token = null;
                state.loading = false;
                state.error = null;
                state.user = null;
                window.location.href = action.payload === 'employer' ? '/employer/login' : '/login';
            })
            .addCase(registerAlumus.pending, (state, action) => {
                state.registerAlumusLoading = true;
                state.registerAlumusMessage = null;
            })
            .addCase(registerAlumus.fulfilled, (state, action) => {
                state.registerAlumusLoading = false;
                state.registerAlumus = action.payload;
                state.registerAlumusMessage = 'success';
            })
            .addCase(registerAlumus.rejected, (state, action) => {
                state.registerAlumusLoading = false;
                state.registerAlumusMessage = 'fail';
            });
    },
});

export default slice.reducer;
