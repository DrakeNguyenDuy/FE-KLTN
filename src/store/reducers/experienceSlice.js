import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request, { authHeader } from '~/axios/request';

const API_GET_EXPERIENCE = 'v2/private/experiences';

export const getExperience = createAsyncThunk('experience/get', async (token) => {
    const response = await request.get(API_GET_EXPERIENCE, {
        headers: authHeader(token),
    });
    return response.data.data;
});

const initialState = {
    experiences: [],
};

const slice = createSlice({
    name: 'experience',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getExperience.fulfilled, (state, action) => {
            state.experiences = action.payload;
        });
    },
});

export default slice.reducer;
