import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request, { authHeader } from '~/axios/request';
import { getToken } from '~/utils/LocalStorage';

const API_AUTH_EMPLOYER = 'v1/private/store';
const API_GET_AVT = 'v1/store';
const API_GET_EMPLOYER = 'v1/private/user/profile';

const getUser = async (token) => {
    let user = null;
    const response = await request.get(API_GET_EMPLOYER, {
        headers: authHeader(token),
    });
    user = response.data;
    const res = await request.get(API_AUTH_EMPLOYER + '/' + user.merchant, {
        headers: authHeader(token),
    });
    const resAvt = await request.get(API_GET_AVT + '/' + user.merchant + '/marketing/logo', {
        headers: authHeader(token),
    });
    let accessAdmin = false;
    for (let i = 0; i < user.permissions.length; i++) {
        if (user.permissions[i].name === 'SUPERADMIN') {
            accessAdmin = true;
            break;
        }
    }
    user = {
        id: user.id,
        accessAdmin,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: resAvt.data ? '/api/' + API_GET_AVT + '/' + user.merchant + '/marketing/logo' : null,
        email: user.emailAddress,
        userName: user.userName,
        active: user.active,
        code: user.merchant,
        companyName: res.data.name,
        companyEmail: res.data.email,
        phoneCompany: res.data.phone,
        addressCompany: res.data.address,
        logoCompany: res.data.logo,
    };
    return user;
};

export const employerAuth = createAsyncThunk('employerAuth/get', async () => {
    const token = getToken('employer');
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
    name: 'employerAuth',
    initialState,
    reducers: {
        clearUser: (state, action) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(employerAuth.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(employerAuth.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(employerAuth.rejected, (state, action) => {
                state.loading = false;
            });
    },
});

export const clearUser = slice.actions.clearUser;
export default slice.reducer;
