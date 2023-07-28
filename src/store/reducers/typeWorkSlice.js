import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '~/axios/request';

const API_GET_TYPE_WORK = 'v1/category';

export const getTypeWork = createAsyncThunk('typeWork/get', async () => {
    const response = await request.get(API_GET_TYPE_WORK);
    return response.data.categories;
});

const initialState = {
    typeWorks: [],
};

const slice = createSlice({
    name: 'typeWork',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTypeWork.fulfilled, (state, action) => {
            state.typeWorks = action.payload;
            // console.log('typeWorks', state.typeWorks);
        });
    },
});

export default slice.reducer;
