// authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request, { authHeader } from '~/axios/request';

const API_GET_CAREER = 'v1/private/product/types';

export const getCareer = createAsyncThunk('career/get', async (token) => {
    const response = await request.get(API_GET_CAREER, {
        headers: authHeader(token),
    });
    return response.data;
});

const initialState = {
    careers: [],
};

const slice = createSlice({
    name: 'career',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCareer.fulfilled, (state, action) => {
            state.careers = action.payload.list;
        });
    },
});

export default slice.reducer;
