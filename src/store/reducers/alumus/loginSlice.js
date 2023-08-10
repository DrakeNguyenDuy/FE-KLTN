import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '~/axios/request';
import LocalStorage from '~/utils/LocalStorage';

const API_ALUMUS_LOGIN = 'v1/customer/login';

export const alumusLogin = createAsyncThunk('alumusLogin/post', async (data, { rejectWithValue }) => {
    try {
        const response = await request.post(API_ALUMUS_LOGIN, {
            username: data.username,
            password: data.password,
        });
        LocalStorage.set('alumusToken', response.data.token);
        return response.data.token;
    } catch (error) {
        console.log('Could not login with error', error);
        return rejectWithValue(error);
    }
});

export const AlumusLogout = createAsyncThunk('alumusLogout/logout', async () => {
    LocalStorage.remove('alumusToken');
    return null;
});

const initialState = {
    token: null,
    loading: false,
    error: null,
};

const slice = createSlice({
    name: 'alumusLogin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(alumusLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(alumusLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
            })
            .addCase(alumusLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(AlumusLogout.fulfilled, (state, action) => {
                state.token = null;
                state.loading = false;
                state.error = null;
                window.location.href = '/login';
            });
    },
});

export default slice.reducer;
