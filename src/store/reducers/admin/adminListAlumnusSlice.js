import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request, { authHeader } from '~/axios/request';
import { getToken } from '~/utils/LocalStorage';

const API_ALUMNUS_LIST = 'v1/private/alumnus';

export const getListAlumnus = createAsyncThunk('adminListAlumnus/get', async ({ code, page, search, status }) => {
    const token = getToken('employer');
    if (token) {
        const response = await request.get(API_ALUMNUS_LIST, {
            headers: authHeader(token),
            params: {
                page: page === 0 ? page : page - 1,
                size: 5,
                query: search === '' ? null : search,
                status: status === '' ? null : status,
            },
        });
        return response.data;
    } else return null;
});

const initialState = {
    listAlumnus: [],
    listAlumnusLoading: false,
    listAlumnusError: null,
};

const slice = createSlice({
    name: 'adminManageAlumnus',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getListAlumnus.pending, (state) => {
                state.listAlumnusLoading = true;
                state.listAlumnusError = null;
            })
            .addCase(getListAlumnus.fulfilled, (state, action) => {
                state.listAlumnus = action.payload;
                state.listAlumnusLoading = false;
            })
            .addCase(getListAlumnus.rejected, (state, action) => {
                state.listAlumnusLoading = false;
                state.listAlumnusError = action.error.message;
            });
    },
});

export default slice.reducer;
