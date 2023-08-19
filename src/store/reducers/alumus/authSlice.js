import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request, { authHeader } from '~/axios/request';
import { getToken } from '~/utils/LocalStorage';

const API_AUTH_ALUMUS = 'v1/auth/customer/profile';
const API_AUTH_ALUMUS_PROFILE = 'v1/auth/profile';

const getUser = async (token) => {
    let user = null;
    const response = await request.get(API_AUTH_ALUMUS, {
        headers: authHeader(token),
    });
    user = response.data;
    const res = await request.get(API_AUTH_ALUMUS_PROFILE, {
        headers: authHeader(token),
    });
    user = { ...user, ...res.data };
    return user;
};

export const auth = createAsyncThunk('AlumusAuth/get', async () => {
    const token = getToken('alumus');
    if (token) {
        try {
            return await getUser(token);
        } catch (error) {
            return null;
        }
    } else return null;
});

const initialState = {
    user: null,
    loading: false,
    error: null,
};

const slice = createSlice({
    name: 'alumusAuth',
    initialState,
    reducers: {
        clearUser: (state, action) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(auth.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(auth.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(auth.rejected, (state, action) => {
                state.loading = false;
            });
    },
});

export const clearUser = slice.actions.clearUser;
export default slice.reducer;
