// authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '~/axios/request';

const API_GET_PAYCYCLE = 'v2/paycycles';

export const getPaycycle = createAsyncThunk('paycycle/get', async () => {
    const response = await request.get(API_GET_PAYCYCLE);
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
            // console.log('paycycles', state.paycycles);
        });
    },
});

export default slice.reducer;
