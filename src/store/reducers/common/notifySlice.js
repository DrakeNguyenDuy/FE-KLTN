import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request, { authHeader } from '~/axios/request';
import { getToken } from '~/utils/LocalStorage';

const API_GET_NOTIFY = 'v1/auth/notification';
const API_PUT_NOTIFY = 'v1/auth/notification/opened';

export const getNotify = createAsyncThunk('notify/get', async () => {
    const token = getToken();
    const response = await request.get(API_GET_NOTIFY, {
        headers: authHeader(token),
    });
    let countNotifies = 0;
    const notifies = response.data.reverse();
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

export const putNotify = createAsyncThunk('notify/put', async () => {
    const token = getToken();
    const response = await request.put(API_PUT_NOTIFY, null, {
        headers: authHeader(token),
    });
    return response.data;
});

const initialState = {
    notifies: { count: 0, notifies: [] },
    loading: false,
    toggleNotify: false,
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
        builder.addCase(putNotify.fulfilled, (state, action) => {
            state.toggleNotify = !state.toggleNotify;
        });
    },
});

export default slice.reducer;
