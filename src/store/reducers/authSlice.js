// authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as authLogin, logout as authLogout, getUser } from '~/apiServices/authService';

// Define your async thunk for logging in
export const login = createAsyncThunk('auth/login', async (data) => {
    const res = await authLogin(data);
    console.log(res);
    return res;
});

export const auth = createAsyncThunk('auth/authUser', async (data) => {
    const res = await getUser(data);
    console.log(res);
    return res;
});

// Define the initial state
const initialState = {
    token: null,
    loading: false,
    error: null,
    user: null,
};

// Create the auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            authLogout();
            state.token = null;
            state.loading = false;
            state.error = null;
            state.user = null;
        },
    },
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
                state.user = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
