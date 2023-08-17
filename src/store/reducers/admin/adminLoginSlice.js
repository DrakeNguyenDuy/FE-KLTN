import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '~/axios/request';
import LocalStorage from '~/utils/LocalStorage';

const API_EMPLOYER_LOGIN = 'v1/private/login';

export const adminLogin = createAsyncThunk('adminLogin/post', async (data, { rejectWithValue }) => {
    try {
        console.log(data);
        const response = await request.post(API_EMPLOYER_LOGIN, {
            username: data.username,
            password: data.password,
        });
        LocalStorage.set('employerToken', response.data.token);
        return response.data.token;
    } catch (error) {
        console.log('Could not login with error', error);
        return rejectWithValue(error);
    }
});

export const adminLogout = createAsyncThunk('adminLogout/logout', async () => {
    LocalStorage.remove('employerToken');
    return null;
});

const initialState = {
    token: null,
    loading: false,
    error: null,
};

const slice = createSlice({
    name: 'adminLogin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adminLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(adminLogout.fulfilled, (state, action) => {
                state.token = null;
                state.loading = false;
                state.error = null;
                window.location.href = '/admin/login';
            });
    },
});

export default slice.reducer;
