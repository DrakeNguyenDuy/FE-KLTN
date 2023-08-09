import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request, { authHeader } from '~/axios/request';
import { getToken } from '~/utils/LocalStorage';

const API_ALUMUS_CHANGE_PASS = 'v1/auth/customer/password';

export const alumusChangePass = createAsyncThunk('alumusChangePass/post', async (data) => {
    try {
        const token = getToken('alumus');
        const response = await request.post(API_ALUMUS_CHANGE_PASS, data, {
            headers: authHeader(token),
        });
        return response.data.token;
    } catch (error) {
        console.log('Could not login with error', error);
        return null;
    }
});

const initialState = {
    changePass: null,
    loading: false,
    error: null,
};

const slice = createSlice({
    name: 'alumusChangePass',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(alumusChangePass.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(alumusChangePass.fulfilled, (state, action) => {
                state.changePass = action.payload;
                state.loading = false;
            })
            .addCase(alumusChangePass.rejected, (state, action) => {
                state.error = action.error;
                state.loading = false;
            });
    },
});

export const clearUser = slice.actions.clearUser;
export default slice.reducer;
