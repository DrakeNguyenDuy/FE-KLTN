// authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request, { authHeader, authHeaderMultipart } from '~/axios/request';

const API_GET_CV = 'v1/auth/cv';
const API_POST_AVATAR = 'v1/auth/profile/avatar';

export const getCVWithToken = createAsyncThunk('cv/get', async (token) => {
    const response = await request.get(API_GET_CV, {
        headers: authHeader(token),
    });
    return response.data;
});

export const postAvatar = createAsyncThunk('cv/postAvatar', async ({ token, data }) => {
    const blobData = dataURItoBlob(data);
    console.log(blobData);
    const formData = new FormData();
    formData.append('file', blobData, 'avatar.png');
    const response = await request.post(API_POST_AVATAR, formData, {
        headers: authHeaderMultipart(token),
    });
    return response.data;
});

function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/png' });
}

const initialState = {
    cv: null,
};

const slice = createSlice({
    name: 'cv',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCVWithToken.fulfilled, (state, action) => {
            state.cv = action.payload;
            console.log('cv', state.cv);
        });
        builder.addCase(postAvatar.fulfilled, (state, action) => {
            console.log('res', action.payload);
        });
        builder.addCase(postAvatar.rejected, (state, action) => {
            console.log('err');
        });
    },
});

export default slice.reducer;
