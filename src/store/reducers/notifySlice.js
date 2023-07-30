import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request, { authHeader } from '~/axios/request';
import { getToken } from './authSlice';

const API_GET_NOTIFY = 'v1/auth/notification';

export const getNotify = createAsyncThunk('notify/get', async () => {
    const token = getToken();
    const response = await request.get(API_GET_NOTIFY, {
        headers: authHeader(token),
    });
    let countNotifies = 0;
    const notifies = response.data;
    for (let i = 0; i < notifies.length; i++) {
        if (!notifies[i].opened) {
            countNotifies++;
        }
    }
    return {
        notifies: notifies,
        count: countNotifies,
    };
});

const initialState = {
    notifies: { count: 0, notifies: [] },
    loading: false,
};

const slice = createSlice({
    name: 'notify',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getNotify.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getNotify.fulfilled, (state, action) => {
            state.notifies = action.payload;
            state.loading = false;
        });
        builder.addCase(getNotify.rejected, (state, action) => {
            state.loading = false;
        });
    },
});

export default slice.reducer;
