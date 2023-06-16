import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request, { authHeader } from '~/axios/request';

const API_GET_POSITION = 'v2/private/positions';

export const getPosition = createAsyncThunk('position/get', async (token) => {
    const response = await request.get(API_GET_POSITION, {
        headers: authHeader(token),
    });
    return response.data.data;
});

const initialState = {
    positions: [],
};

const careerSlice = createSlice({
    name: 'position',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPosition.fulfilled, (state, action) => {
            state.positions = action.payload;
        });
    },
});

export default careerSlice.reducer;
