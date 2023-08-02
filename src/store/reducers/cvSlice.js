// authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request, { authHeader, authHeaderMultipart } from '~/axios/request';
import { getToken } from './authSlice';

const API_GET_CV = 'v1/auth/cv';
const API_GET_CV_NO_AUTH = 'v1/cv';
const API_UPDATE_CV = 'v1/auth/cv';
const API_CREATE_CV = 'v1/auth/cv';
const API_POST_AVATAR = 'v1/auth/profile/avatar';

export const getCVWithToken = createAsyncThunk('cv/get', async () => {
    const token = getToken();
    const response = await request.get(API_GET_CV, {
        headers: authHeader(token),
    });
    if (typeof response.data === 'string') return -1;
    return response.data;
});

export const getCVWithId = createAsyncThunk('cvid/get', async (id) => {
    const response = await request.get(API_GET_CV_NO_AUTH + '/' + id);
    if (typeof response.data === 'string') return -1;
    return response.data;
});

export const putUpdateCV = createAsyncThunk('cv/update', async ({ id, data }) => {
    const token = getToken();
    const response = await request.put(API_UPDATE_CV + '/' + id, data, {
        headers: authHeader(token),
    });
    return response.data;
});

export const createCV = createAsyncThunk('cv/create', async (data) => {
    const token = getToken();
    const response = await request.post(API_CREATE_CV, data, {
        headers: authHeader(token),
    });
    return response.data;
});

export const postAvatar = createAsyncThunk('cv/postAvatar', async ({ data }) => {
    const token = getToken();
    const blobData = dataURItoBlob(data);
    const formData = new FormData();
    formData.append('file', blobData, 'avatar.png');
    const response = await request.post(API_POST_AVATAR, formData, {
        headers: authHeaderMultipart(token),
    });
    return response.data;
});

const dataURItoBlob = (dataURI) => {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/png' });
};

const initialState = {
    cv: null,
    isLoading: false,
    error: null,
};

const slice = createSlice({
    name: 'cv',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCVWithToken.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getCVWithToken.fulfilled, (state, action) => {
            state.cv = action.payload;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(getCVWithToken.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
        builder.addCase(getCVWithId.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getCVWithId.fulfilled, (state, action) => {
            state.cv = action.payload;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(getCVWithId.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
        builder.addCase(postAvatar.fulfilled, (state, action) => {
            // console.log('res', action.payload);
            window.location.reload();
        });
        builder.addCase(postAvatar.rejected, (state, action) => {
            // console.log('err');
        });
        builder.addCase(putUpdateCV.fulfilled, (state, action) => {
            // console.log('res', action.payload);
            window.location.reload();
        });
        builder.addCase(putUpdateCV.rejected, (state, action) => {
            // console.log('err');
        });
        builder.addCase(createCV.fulfilled, (state, action) => {
            window.location.reload();
        });
    },
});

export default slice.reducer;
