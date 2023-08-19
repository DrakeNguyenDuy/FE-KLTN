import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request, { authHeader, authHeaderMultipart } from '~/axios/request';
import { getToken } from '~/utils/LocalStorage';
import { dataURItoBlob } from '~/utils/dataBlob';

const API_ALUMNUS_LIST = 'v1/private/alumnus';
const API_ADD_ALUMNUS = 'v1/private/alumnus/add';
const API_CHANGE_STATUS_ALUMNUS = 'v1/private/alumnus';
const API_UPDATE_ALUMNUS = 'v1/private/alumnus/update';
const API_UPDATE_AVATAR = 'v1/private/alumnus';

export const getListAlumnus = createAsyncThunk('adminListAlumnus/get', async ({ code, page, search, active }) => {
    const token = getToken('admin');
    if (token) {
        const response = await request.get(API_ALUMNUS_LIST, {
            headers: authHeader(token),
            params: {
                page: page === 0 ? page : page - 1,
                size: 5,
                query: search === '' ? null : search,
                active: active === '' ? null : active,
            },
        });
        return response.data;
    } else return null;
});

export const adminAddAlumnus = createAsyncThunk('adminAddAlumnus/post', async ({ data }, { rejectWithValue }) => {
    const token = getToken('admin');
    const mapData = {
        userName: data.email,
        emailAddress: data.email,
        gender: data.gender,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
    };
    if (token) {
        try {
            const response = await request.post(API_ADD_ALUMNUS, mapData, {
                headers: authHeader(token),
            });
            console.log(response);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    } else return null;
});

export const adminUpdateAlumnus = createAsyncThunk('adminUpdateAlumnus/post', async ({ data }, { rejectWithValue }) => {
    const token = getToken('admin');
    if (token) {
        try {
            const response = await request.post(API_UPDATE_ALUMNUS, data, {
                headers: authHeader(token),
            });
            console.log(response);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    } else return null;
});

export const adminUploadAvatar = createAsyncThunk('admin/uploadAvatar', async ({ data, username }) => {
    const token = getToken('admin');
    const blobData = dataURItoBlob(data);
    const formData = new FormData();
    formData.append('file', blobData, 'avatar.png');
    const response = await request.post(`${API_UPDATE_AVATAR}/${username}/avatar`, formData, {
        headers: authHeaderMultipart(token),
    });
    return response.data === 'Upload Success';
});

export const putchangeStatusAlumnus = createAsyncThunk('adminChangeStatusAlumnus/put', async ({ code, status, id }) => {
    const token = getToken('admin');
    const response = await request.put(`${API_CHANGE_STATUS_ALUMNUS}/${code}/is_block`, null, {
        headers: authHeader(token),
    });
    return {
        codeJob: code,
        status: response.data === 'Update Success',
        changeStatus: status,
        id,
    };
});

const initialState = {
    listAlumnus: [],
    listAlumnusLoading: false,
    listAlumnusError: null,

    addAlumnusLoading: false,
    addAlumnusStatus: null,
    addAlumnusError: null,

    updateAlumnusLoading: false,
    updateAlumnusStatus: null,
    updateAlumnusError: null,

    updateStatus: null,
    updateStatusLoading: false,
    updateStatusError: null,

    updateAvatarStatus: null,
    updateAvatarIsLoading: false,
    updateAvatarError: null,
};

const slice = createSlice({
    name: 'adminManageAlumnus',
    initialState,
    reducers: {
        resetAddAlumnus: (state) => {
            state.addAlumnusStatus = null;
            state.addAlumnusError = null;
        },
        resetUpdateAlumnus: (state) => {
            state.updateAlumnusStatus = null;
            state.updateAlumnusError = null;
        },
        resetUpdateAvatar: (state) => {
            state.updateAvatarStatus = null;
            state.updateAvatarError = null;
        },
    },
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
            })
            .addCase(adminAddAlumnus.pending, (state, action) => {
                state.addAlumnusLoading = true;
            })
            .addCase(adminAddAlumnus.fulfilled, (state, action) => {
                state.addAlumnusStatus = action.payload;
                state.addAlumnusError = null;
                state.addAlumnusLoading = false;
            })
            .addCase(adminAddAlumnus.rejected, (state, action) => {
                state.addAlumnusError = action.error.message;
                state.addAlumnusStatus = null;
                state.addAlumnusLoading = false;
            })
            .addCase(adminUpdateAlumnus.pending, (state, action) => {
                state.updateAlumnusLoading = true;
            })
            .addCase(adminUpdateAlumnus.fulfilled, (state, action) => {
                state.updateAlumnusStatus = action.payload;
                state.updateAlumnusError = null;
                state.updateAlumnusLoading = false;
            })
            .addCase(adminUpdateAlumnus.rejected, (state, action) => {
                state.updateAlumnusError = action.error.message;
                state.updateAlumnusStatus = null;
                state.updateAlumnusLoading = false;
            })
            .addCase(putchangeStatusAlumnus.pending, (state, action) => {
                state.updateStatusLoading = true;
                state.updateStatusError = null;
            })
            .addCase(putchangeStatusAlumnus.fulfilled, (state, action) => {
                state.updateStatus = action.payload;
                state.updateStatusLoading = false;
            })
            .addCase(putchangeStatusAlumnus.rejected, (state, action) => {
                state.updateStatusError = action.error.message;
                state.updateStatusLoading = false;
            })
            .addCase(adminUploadAvatar.pending, (state, action) => {
                state.updateAvatarIsLoading = true;
                state.updateAvatarError = null;
            })
            .addCase(adminUploadAvatar.fulfilled, (state, action) => {
                state.updateAvatarStatus = action.payload;
                state.updateAvatarIsLoading = false;
            })
            .addCase(adminUploadAvatar.rejected, (state, action) => {
                state.updateAvatarError = action.error.message;
                state.updateAvatarIsLoading = false;
            });
    },
});

export const { resetAddAlumnus, resetUpdateAlumnus, resetUpdateAvatar } = slice.actions;

export default slice.reducer;
