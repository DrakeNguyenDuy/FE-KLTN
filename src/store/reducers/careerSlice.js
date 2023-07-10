// authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '~/axios/request';

const API_GET_CAREER = 'v1/product/types';

export const getCareer = createAsyncThunk('career/get', async () => {
    const response = await request.get(API_GET_CAREER);
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
            console.log('careers', state.careers);
        });
    },
});

export default slice.reducer;
