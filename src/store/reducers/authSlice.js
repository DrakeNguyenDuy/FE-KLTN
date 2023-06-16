// authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request, { authHeader } from '~/axios/request';

const API_EMPLOYER_LOGIN = 'v1/private/login';

const API_ALUMUS_LOGIN = 'v1/customer/login';

const API_AUTH_EMPLOYER = 'v1/private/user/profile';

const API_AUTH_ALUMUS = 'v1/auth/customer/profile';

const API_AUTH_ALUMUS_PROFILE = 'v1/auth/profile';

const getToken = (type) => {
    const token = JSON.parse(localStorage.getItem(type === 'employer' ? 'employerToken' : 'alumusToken'));
    return token;
};

const getUser = async (data) => {
    let user = null;
    const response = await request.get(data.type === 'employer' ? API_AUTH_EMPLOYER : API_AUTH_ALUMUS, {
        headers: authHeader(data.token),
    });
    user = response.data;
    if (data.type === 'alumus') {
        const res = await request.get(API_AUTH_ALUMUS_PROFILE, {
            headers: authHeader(data.token),
        });
        user = { ...user, ...res.data };
    }
    console.log(user);

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
    const token = getToken(type);
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
