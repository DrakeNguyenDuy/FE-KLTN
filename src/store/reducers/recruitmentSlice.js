import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request, { authHeader } from '~/axios/request';
import { getToken } from '~/utils/LocalStorage';
import { getNotify } from './notifySlice';

const API_POST_APPLY_JOB = 'v1/auth/recruitment/apply';
const API_GET_STATUS_PROCESS = 'v1/status-process';

export const postApplyJob = createAsyncThunk('apply/post', async (codeJob, { dispatch }) => {
    const token = await getToken();
    const response = await request.post(
        `${API_POST_APPLY_JOB}/${codeJob}`,
        {},
        {
            headers: authHeader(token),
        },
    );
    if (response.data === 'Apply success') dispatch(getNotify());
    return response.data === 'Apply success';
});

export const getApplyStatus = createAsyncThunk('applyStatus/get', async () => {
    const response = await request.get(API_GET_STATUS_PROCESS);
    return response.data;
});

const initialState = {
    apply: null,
    status: [],
    statusLoading: false,
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
        builder.addCase(getApplyStatus.pending, (state, action) => {
            state.statusLoading = true;
        });
        builder.addCase(getApplyStatus.fulfilled, (state, action) => {
            state.status = action.payload;
            state.statusLoading = false;
        });
        builder.addCase(getApplyStatus.rejected, (state, action) => {
            state.statusLoading = true;
        });
    },
});

export default slice.reducer;
