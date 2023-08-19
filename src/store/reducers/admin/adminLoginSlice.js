import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request, { authHeader } from '~/axios/request';
import LocalStorage from '~/utils/LocalStorage';

const API_EMPLOYER_LOGIN = 'v1/private/login';
const API_GET_EMPLOYER = 'v1/private/user/profile';

export const adminLogin = createAsyncThunk('adminLogin/post', async ({ data, notify }, { rejectWithValue }) => {
    try {
        const response = await request.post(API_EMPLOYER_LOGIN, {
            username: data.username,
            password: data.password,
        });
        const res = await request.get(API_GET_EMPLOYER, {
            headers: authHeader(response.data.token),
        });
        const user = res.data;
        let accessAdmin = false;
        for (let i = 0; i < user.permissions.length; i++) {
            if (user.permissions[i].name === 'SUPERADMIN') {
                accessAdmin = true;
                break;
            }
        }
        if (accessAdmin) {
            LocalStorage.set('adminToken', response.data.token);
            return response.data.token;
        } else {
            notify('Không có quyền vui lòng đăng nhập tài khoản admin');
            return null;
        }
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const adminLogout = createAsyncThunk('adminLogout/logout', async () => {
    LocalStorage.remove('adminToken');
    return null;
});

const initialState = {
    token: null,
    loading: false,
    error: null,
};

const slice = createSlice({
    name: 'adminLogin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adminLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(adminLogout.fulfilled, (state, action) => {
                state.token = null;
                state.loading = false;
                state.error = null;
                window.location.href = '/admin/login';
            });
    },
});

export default slice.reducer;
