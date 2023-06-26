// authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request, { authHeader } from '~/axios/request';

const API_GET_CV = 'v1/auth/cv';

export const getCVWithToken = createAsyncThunk('cv/get', async (token) => {
    const response = await request.get(API_GET_CV, {
        headers: authHeader(token),
    });
    return response.data;
});

const initialState = {
    cv: null,
};

const slice = createSlice({
    name: 'cv',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCVWithToken.fulfilled, (state, action) => {
            state.cv = action.payload;
            console.log('cv', state.cv);
        });
    },
});

export default slice.reducer;
