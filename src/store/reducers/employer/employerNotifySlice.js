import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request, { authHeader } from '~/axios/request';
import { getToken } from '~/utils/LocalStorage';

const API_GET_NOTIFY_EMPLOYER = 'v1/private/notification';
const API_PUT_NOTIFY_EMPLOYER = 'v1/private/notification/opened';

export const getNotifyEmployer = createAsyncThunk('notifyEmployer/get', async () => {
    const token = getToken('employer');
    const response = await request.get(API_GET_NOTIFY_EMPLOYER, {
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

export const putNotifyEmployer = createAsyncThunk('notifyEmployer/put', async () => {
    const token = getToken('employer');
    const response = await request.put(API_PUT_NOTIFY_EMPLOYER, null, {
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
    name: 'notifyEmployer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getNotifyEmployer.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getNotifyEmployer.fulfilled, (state, action) => {
            state.notifies = action.payload;
            state.loading = false;
        });
        builder.addCase(getNotifyEmployer.rejected, (state, action) => {
            state.loading = false;
        });
        builder.addCase(putNotifyEmployer.fulfilled, (state, action) => {
            state.toggleNotify = !state.toggleNotify;
        });
    },
});

export default slice.reducer;
