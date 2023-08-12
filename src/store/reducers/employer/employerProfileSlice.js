import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request, { authHeader, authHeaderMultipart } from '~/axios/request';
import { getToken } from '~/utils/LocalStorage';
import { dataURItoBlob } from '~/utils/dataBlob';

const API_PROFILE_EMPLOYER = 'v1/private/store';

export const postAvatarEmployer = createAsyncThunk('employerProfile/postAvatar', async ({ code, data }) => {
    const token = getToken('employer');
    console.log('code', code);
    const blobData = dataURItoBlob(data);
    const formData = new FormData();
    formData.append('file', blobData, code + '-logo.png');
    const response = await request.post(API_PROFILE_EMPLOYER + '/' + code + '/marketing/logo', formData, {
        headers: authHeaderMultipart(token),
    });
    return response.data;
});

export const postBackgroundEmployer = createAsyncThunk('employerProfile/postBackground', async ({ code, data }) => {
    const token = getToken('employer');
    console.log('code', code);
    const blobData = dataURItoBlob(data);
    const formData = new FormData();
    formData.append('file', blobData, code + '-background.png');
    const response = await request.post(API_PROFILE_EMPLOYER + '/' + code + '/background', formData, {
        headers: authHeaderMultipart(token),
    });
    return response.data;
});

export const updateProfileEmployer = createAsyncThunk('employerProfile/update', async ({ code, data }) => {
    const token = getToken('employer');
    const response = await request.put(API_PROFILE_EMPLOYER + '/' + code + '/edit', data, {
        headers: authHeader(token),
    });
    return response.data;
});

const initialState = {
    uploadBgLoading: false,
};

const slice = createSlice({
    name: 'employerProfile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(postAvatarEmployer.fulfilled, (state, action) => {
            // console.log('res', action.payload);
            window.location.reload();
        });
        builder.addCase(postBackgroundEmployer.pending, (state, action) => {
            state.uploadBgLoading = true;
        });
        builder.addCase(postBackgroundEmployer.fulfilled, (state, action) => {
            state.uploadBgLoading = false;
            window.location.reload();
        });
        builder.addCase(postBackgroundEmployer.rejected, (state, action) => {
            state.uploadBgLoading = false;
        });
        builder.addCase(postAvatarEmployer.rejected, (state, action) => {
            // console.log('err');
        });
        builder.addCase(updateProfileEmployer.fulfilled, (state, action) => {
            // console.log('res', action.payload);
            window.location.reload();
        });
        builder.addCase(updateProfileEmployer.rejected, (state, action) => {
            // console.log('err');
        });
    },
});

export default slice.reducer;