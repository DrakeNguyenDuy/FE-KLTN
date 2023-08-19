import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request, { authHeader } from '~/axios/request';
import { getToken } from '~/utils/LocalStorage';

const API_PRODUCTS_LIST = 'v2/private/products';
const API_CHANGE_STATUS_PROUCT = 'v2/private/product/update-status';
const API_DELETE_JOB = 'v2/private/product';
// 50?store=nhahangmoi&lang=vn"

export const employerGetProducts = createAsyncThunk('employerProducts/get', async ({ code, page, search, status }) => {
    const token = getToken('employer');
    if (token) {
        const response = await request.get(API_PRODUCTS_LIST + '/' + code, {
            headers: authHeader(token),
            params: {
                page: page === 0 ? page : page - 1,
                count: 5,
                query: search === '' ? null : search,
                status: status === '' ? null : status,
            },
        });
        return response.data;
    } else return null;
});

export const putchangeStatusJob = createAsyncThunk('employerChangeStatusJob/put', async ({ code, status }) => {
    const token = getToken('employer');
    const response = await request.put(API_CHANGE_STATUS_PROUCT + '/' + code, null, {
        headers: authHeader(token),
        params: { status },
    });
    console.log(status === 'Đang ứng tuyển' ? 'Tạm dừng ứng tuyển' : 'Đang ứng tuyển');
    return {
        codeJob: code,
        status: response.data === 'Update sucess',
        changeStatus: status === 'ACTIVE' ? 'Đang ứng tuyển' : 'Tạm dừng ứng tuyển',
    };
});

export const deleteJob = createAsyncThunk('employerDeleteJob/delete', async ({ id, code }) => {
    const token = getToken('employer');
    const response = await request.delete(API_DELETE_JOB + '/' + id, {
        headers: authHeader(token),
        params: { store: code, lang: 'vn' },
    });
    return { id, status: response.data };
});

const initialState = {
    products: [],
    loading: false,
    error: null,

    updateStatus: null,
    updateStatusLoading: false,
    updateStatusError: null,

    deleteStatus: null,
    deleteStatusLoading: false,
    deleteStatusError: null,
};

const slice = createSlice({
    name: 'employerProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(employerGetProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(employerGetProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.loading = false;
            })
            .addCase(employerGetProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(putchangeStatusJob.pending, (state, action) => {
                state.updateStatusLoading = true;
                state.updateStatusError = null;
            })
            .addCase(putchangeStatusJob.fulfilled, (state, action) => {
                state.updateStatus = action.payload;
                state.updateStatusLoading = false;
            })
            .addCase(putchangeStatusJob.rejected, (state, action) => {
                state.updateStatusError = action.error.message;
                state.updateStatusLoading = false;
            })
            .addCase(deleteJob.pending, (state, action) => {
                state.deleteStatusLoading = true;
                state.deleteStatusError = null;
            })
            .addCase(deleteJob.fulfilled, (state, action) => {
                state.deleteStatus = action.payload;
                state.deleteStatusLoading = false;
            })
            .addCase(deleteJob.rejected, (state, action) => {
                state.deleteStatusError = action.error.message;
                state.deleteStatusLoading = false;
            });
    },
});

export default slice.reducer;
