import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '~/axios/request';

const API_GET_TOP_EMPLOYER = 'v1/top-employer';
const API_GET_FILTER_DISPLAY = 'v2/filters-display';

export const getTopEmlpyer = createAsyncThunk('topEmloyer/get', async () => {
    const response = await request.get(API_GET_TOP_EMPLOYER);
    return response.data;
});

export const getFilterDisplay = createAsyncThunk('filterDisplay/get', async () => {
    const response = await request.get(API_GET_FILTER_DISPLAY);
    return response.data;
});

const initialState = {
    topEmployers: null,
    topEmloyerIsLoading: false,
    topEmployerError: null,
    filters: [],
};

const slice = createSlice({
    name: 'search',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTopEmlpyer.pending, (state, action) => {
            state.topEmloyerIsLoading = true;
            state.topEmployerError = null;
        });
        builder.addCase(getTopEmlpyer.fulfilled, (state, action) => {
            state.topEmployers = action.payload;
            state.topEmloyerIsLoading = false;
            state.topEmployerError = null;
        });
        builder.addCase(getTopEmlpyer.rejected, (state, action) => {
            state.isLoading = false;
            state.topEmployerError = action.error;
        });
        builder.addCase(getFilterDisplay.fulfilled, (state, action) => {
            state.filters = action.payload;
        });
    },
});

export default slice.reducer;
