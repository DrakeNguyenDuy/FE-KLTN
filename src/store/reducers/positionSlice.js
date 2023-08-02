import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '~/axios/request';

const API_GET_POSITION = 'v2/positions';

export const getPosition = createAsyncThunk('position/get', async () => {
    const response = await request.get(API_GET_POSITION);
    return response.data.data;
});

const initialState = {
    positions: [],
};

const slice = createSlice({
    name: 'position',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPosition.fulfilled, (state, action) => {
            state.positions = action.payload;
        });
    },
});

export default slice.reducer;
