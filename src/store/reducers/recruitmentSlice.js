import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request, { authHeader } from '~/axios/request';
import { getToken } from './authSlice';

const API_POST_APPLY_JOB = 'v1/auth/recruitment/apply';

export const postApplyJob = createAsyncThunk('apply/post', async (codeJob) => {
    const token = await getToken();
    const response = await request.post(
        `${API_POST_APPLY_JOB}/${codeJob}`,
        {},
        {
            headers: authHeader(token),
        },
    );
    return response.data === 'Apply success';
});

const initialState = {
    apply: null,
};

const slice = createSlice({
    name: 'recruitment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(postApplyJob.rejected, (state, action) => {
            state.apply = action.payload;
        });
        builder.addCase(postApplyJob.fulfilled, (state, action) => {
            state.apply = action.payload;
        });
    },
});

export default slice.reducer;
