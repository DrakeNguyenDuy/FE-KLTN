import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '~/axios/request';

const API_GET_EXPERIENCE = 'v2/experiences';

export const getExperience = createAsyncThunk('experience/get', async () => {
    const response = await request.get(API_GET_EXPERIENCE);
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
            // console.log('experiences', state.experiences);
        });
    },
});

export default slice.reducer;
