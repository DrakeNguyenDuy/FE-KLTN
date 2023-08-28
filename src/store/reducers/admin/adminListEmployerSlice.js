import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request, { authHeader, authHeaderMultipart } from '~/axios/request';
import { formatDashName } from '~/utils/Format';
import { getToken } from '~/utils/LocalStorage';
import { dataURItoBlob } from '~/utils/dataBlob';

const API_EMPLOYER_LIST = 'v1/private/stores';
const API_ADD_EMPLOYER = 'v1/private/employer/add';
const API_CHANGE_STATUS_EMPLOYER = 'v1/private/user';
const API_UPDATE_EMPLOYER = 'v1/private/employer';
const API_UPDATE_AVATAR = 'v1/private/employer';

export const getListEmployers = createAsyncThunk('adminListEmployer/get', async ({ code, page, search, active }) => {
    const token = getToken('admin');
    if (token) {
        const response = await request.get(API_EMPLOYER_LIST, {
            headers: authHeader(token),
            params: {
                page: page === 0 ? page : page - 1,
                count: 5,
                query: search === '' ? null : search,
                active: active === '' ? null : active,
            },
        });
        // const mapRes = {
        //     id: response.data.id,
        //     code: response.data.code,
        //     name: response.data.name,
        //     email: response.data.email,
        //     phone: response.data.phone,
        //     address: response.data.address,
        //     logo: response.data.logo,
        //     username: response.data.readableAudit.user,
        // };
        return response.data;
    } else return null;
});

export const adminAddEmployer = createAsyncThunk('adminAddEmployer/post', async ({ data }, { rejectWithValue }) => {
    const token = getToken('admin');
    if (token) {
        try {
            data['code'] = formatDashName(data.name);
            const response = await request.post(API_ADD_EMPLOYER, data, {
                headers: authHeader(token),
            });
            console.log(response);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    } else return null;
});

export const adminUpdateEmployer = createAsyncThunk(
    'adminUpdateEmployer/post',
    async ({ data }, { rejectWithValue }) => {
        const token = getToken('admin');
        if (token) {
            try {
                const response = await request.put(`${API_UPDATE_EMPLOYER}/${data.id}/update`, data, {
                    headers: authHeader(token),
                });
                console.log(response);
                return response.data;
            } catch (error) {
                return rejectWithValue(error);
            }
        } else return null;
    },
);

export const adminUploadAvatar = createAsyncThunk('admin/uploadAvatarEmployer', async ({ data, username }) => {
    const token = getToken('admin');
    const blobData = dataURItoBlob(data);
    const formData = new FormData();
    formData.append('file', blobData, 'avatar.png');
    const response = await request.post(`${API_UPDATE_AVATAR}/${username}/avatar`, formData, {
        headers: authHeaderMultipart(token),
    });
    return response.data === 'Upload Success';
});

export const putchangeStatusEmployer = createAsyncThunk(
    'adminChangeStatusEmployer/put',
    async ({ code, status, id }) => {
        const token = getToken('admin');
        const response = await request.put(`${API_CHANGE_STATUS_EMPLOYER}/${code}/enabled`, null, {
            headers: authHeader(token),
        });
        return {
            codeJob: code,
            status: response.data === 'Update success',
            changeStatus: status,
            id,
        };
    },
);

const initialState = {
    listEmployers: [],
    listEmployersLoading: false,
    listEmployersError: null,

    addEmployerLoading: false,
    addEmployerStatus: null,
    addEmployerError: null,

    updateEmployerLoading: false,
    updateEmployerStatus: null,
    updateEmployerError: null,

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
        resetAddEmployer: (state) => {
            state.addEmployerStatus = null;
            state.addEmployerError = null;
        },
        resetUpdateEmployer: (state) => {
            state.updateEmployerStatus = null;
            state.updateEmployerError = null;
        },
        resetUpdateAvatar: (state) => {
            state.updateAvatarStatus = null;
            state.updateAvatarError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getListEmployers.pending, (state) => {
                state.listEmployersLoading = true;
                state.listEmployersError = null;
            })
            .addCase(getListEmployers.fulfilled, (state, action) => {
                state.listEmployers = action.payload;
                state.listEmployersLoading = false;
            })
            .addCase(getListEmployers.rejected, (state, action) => {
                state.listEmployersLoading = false;
                state.listEmployersError = action.error.message;
            })
            .addCase(adminAddEmployer.pending, (state, action) => {
                state.addEmployerLoading = true;
            })
            .addCase(adminAddEmployer.fulfilled, (state, action) => {
                state.addEmployerStatus = action.payload;
                state.addEmployerError = null;
                state.addEmployerLoading = false;
            })
            .addCase(adminAddEmployer.rejected, (state, action) => {
                state.addEmployerError = action.error.message;
                state.addEmployerStatus = null;
                state.addEmployerLoading = false;
            })
            .addCase(adminUpdateEmployer.pending, (state, action) => {
                state.updateEmployerLoading = true;
            })
            .addCase(adminUpdateEmployer.fulfilled, (state, action) => {
                state.updateEmployerStatus = action.payload;
                state.updateEmployerError = null;
                state.updateEmployerLoading = false;
            })
            .addCase(adminUpdateEmployer.rejected, (state, action) => {
                state.updateEmployerError = action.error.message;
                state.updateEmployerStatus = null;
                state.updateEmployerLoading = false;
            })
            .addCase(putchangeStatusEmployer.pending, (state, action) => {
                state.updateStatusLoading = true;
                state.updateStatusError = null;
            })
            .addCase(putchangeStatusEmployer.fulfilled, (state, action) => {
                state.updateStatus = action.payload;
                state.updateStatusLoading = false;
            })
            .addCase(putchangeStatusEmployer.rejected, (state, action) => {
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

export const { resetAddEmployer, resetUpdateEmployer, resetUpdateAvatar } = slice.actions;

export default slice.reducer;
