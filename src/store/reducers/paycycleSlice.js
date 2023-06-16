// authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request, { authHeader } from '~/axios/request';

const API_GET_PAYCYCLE = 'v2/private/paycycles';

export const getPaycycle = createAsyncThunk('paycycle/get', async (token) => {
    const response = await request.get(API_GET_PAYCYCLE, {
        headers: authHeader(token),
    });
    return response.data.data;
});

const initialState = {
    paycycles: [],
};

const slice = createSlice({
    name: 'paycycle',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPaycycle.fulfilled, (state, action) => {
            state.paycycles = action.payload;
        });
    },
});

export default slice.reducer;
