// authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request, { authHeader } from '~/axios/request';
import { getToken } from './authSlice';

const API_GET_PROFILE = 'v1/auth/profile';
const API_CREATE_PROFILE = 'v1/auth/profile';
const API_UPDATE_PROFILE = 'v1/auth/profile';

export const getProfile = createAsyncThunk('profile/get', async () => {
    const token = getToken();
    if (token) {
        const response = await request.get(API_GET_PROFILE, {
            headers: authHeader(token),
        });
        console.log('response.data', typeof response.data);
        return response.data;
    }
    return null;
});

export const createProfile = createAsyncThunk('profile/post', async (data) => {
    const token = getToken();
    const response = await request.post(API_CREATE_PROFILE, data, {
        headers: authHeader(token),
    });
    return response.data;
});

export const putUpdateProfile = createAsyncThunk('profile/update', async (data) => {
    const token = getToken();
    const response = await request.put(API_UPDATE_PROFILE, data, {
        headers: authHeader(token),
    });
    return response.data;
});

const initialState = {
    profile: null,
    profileIsLoading: false,
};

const slice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProfile.pending, (state, action) => {
            state.profileIsLoading = true;
        });
        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.profile = action.payload;
            state.profileIsLoading = false;
        });
        builder.addCase(getProfile.rejected, (state, action) => {
            state.profileIsLoading = false;
        });
        builder.addCase(createProfile.fulfilled, (state, action) => {
            window.location.reload();
        });
        builder.addCase(putUpdateProfile.fulfilled, (state, action) => {
            window.location.reload();
        });
    },
});

export default slice.reducer;
