// authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request, { authHeader } from '~/axios/request';

const API_EMPLOYER_LOGIN = 'v1/private/login';

const API_ALUMUS_LOGIN = 'v1/customer/login';

export const API_GET_EMPLOYER = 'v1/private/user/profile';
const API_AUTH_EMPLOYER = 'v1/private/store';

export const API_AUTH_ALUMUS = 'v1/auth/customer/profile';

const API_AUTH_ALUMUS_PROFILE = 'v1/auth/profile';

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

export const auth = createAsyncThunk('auth/authUser', async (type) => {
    const token = await getToken(type);
    if (token) {
        const res = await getUser({ token: token, type: type });
        return { user: res, token: token };
    } else return null;
});

export const logout = createAsyncThunk('auth/logout', async (type) => {
    localStorage.removeItem(type === 'employer' ? 'employerToken' : 'alumusToken');
});

const initialState = {
    token: null,
    loading: false,
    error: null,
    user: null,
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
            .addCase(auth.fulfilled, (state, action) => {
                if (action.payload) {
                    state.user = action.payload.user;
                    state.token = action.payload.token;
                    state.authLoading = true;
                }
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.token = null;
                state.loading = false;
                state.error = null;
                state.user = null;
            });
    },
});

export default slice.reducer;
