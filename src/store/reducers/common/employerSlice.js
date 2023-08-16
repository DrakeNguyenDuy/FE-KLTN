import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 } from 'uuid';
import request from '~/axios/request';
import { BASE_URL } from '~/constant';

const API_GET_EMPLOYER_DETAILS = 'v1/employer-detail';

export const getEmployerDetail = createAsyncThunk('employerDetails/get', async (code) => {
    const response = await request.get(API_GET_EMPLOYER_DETAILS + '/' + code);
    return response.data;
});

const initialState = {
    employerDetails: null,
    isLoading: false,
    error: null,
};

const slice = createSlice({
    name: 'employerDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getEmployerDetail.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getEmployerDetail.fulfilled, (state, action) => {
            state.employerDetails = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getEmployerDetail.rejected, (state, action) => {
            state.error = action.error;
            state.isLoading = false;
        });
    },
});

export default slice.reducer;
