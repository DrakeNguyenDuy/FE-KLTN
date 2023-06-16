import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request, { authHeader } from '~/axios/request';

const API_GET_TYPE_WORK = 'v1/category';

export const getTypeWork = createAsyncThunk('typeWork/get', async (token) => {
    const response = await request.get(API_GET_TYPE_WORK, {
        headers: authHeader(token),
    });
    return response.data.categories;
});

const initialState = {
    typeWorks: [],
};

const careerSlice = createSlice({
    name: 'typeWork',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTypeWork.fulfilled, (state, action) => {
            state.typeWorks = action.payload;
        });
    },
});

export default careerSlice.reducer;
