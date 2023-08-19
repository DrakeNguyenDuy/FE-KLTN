import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '~/axios/request';
import LocalStorage from '~/utils/LocalStorage';

const API_EMPLOYER_LOGIN = 'v1/private/login';

export const employerlogin = createAsyncThunk('employerLogin/post', async (data, { rejectWithValue }) => {
    try {
        const response = await request.post(API_EMPLOYER_LOGIN, {
            username: data.username,
            password: data.password,
        });
        LocalStorage.set('employerToken', response.data.token);
        return response.data.token;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const employerLogout = createAsyncThunk('employerLogout/logout', async () => {
    LocalStorage.remove('employerToken');
    return null;
});

const initialState = {
    token: null,
    loading: false,
    error: null,
};

const slice = createSlice({
    name: 'employerLogin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(employerlogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(employerlogin.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
            })
            .addCase(employerlogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(employerLogout.fulfilled, (state, action) => {
                state.token = null;
                state.loading = false;
                state.error = null;
                window.location.href = '/employer/login';
            });
    },
});

export default slice.reducer;
