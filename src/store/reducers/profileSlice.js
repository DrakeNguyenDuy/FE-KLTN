// authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request, { authHeader } from '~/axios/request';

const API_GET_PROFILE = 'v1/auth/profile';

export const getProfile = createAsyncThunk('profile/get', async (token) => {
    const response = await request.get(API_GET_PROFILE, {
        headers: authHeader(token),
    });
    return response.data;
});

const initialState = {
    profile: null,
};

const slice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.profile = action.payload;
            console.log('profile', state.profile);
        });
    },
});

export default slice.reducer;
