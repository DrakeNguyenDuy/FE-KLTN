import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '~/axios/request';
import { formatDashName } from '~/utils/Format';

const API_REGISTER_EMPLOYER = 'v1/store/signup';

export const registerEmployer = createAsyncThunk('employerRegister/post', async (data) => {
    data.code = formatDashName(data.code);
    console.log(data);
    const response = await request.post(API_REGISTER_EMPLOYER, data);
    return response.data;
});

const initialState = {
    register: null,
    loading: false,
    message: null,
};

const slice = createSlice({
    name: 'register',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerEmployer.pending, (state, action) => {
                state.message = null;
                state.register = true;
            })
            .addCase(registerEmployer.fulfilled, (state, action) => {
                state.register = action.payload;
                state.message = 'success';
                state.loading = false;
            })
            .addCase(registerEmployer.rejected, (state, action) => {
                state.loading = false;
                state.message = 'fail';
            });
    },
});

export default slice.reducer;
