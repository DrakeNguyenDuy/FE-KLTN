// authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request, { authHeader } from '~/axios/request';

const API_GET_PROVINCE = 'v2/private/provinces';
const API_GET_DISTRICT = 'v2/private/districts';
const API_GET_WARD = 'v2/private/wards';

export const getProvince = createAsyncThunk('province/get', async (token) => {
    const response = await request.get(API_GET_PROVINCE, {
        headers: authHeader(token),
    });
    return response.data.data;
});

export const getDistrict = createAsyncThunk('district/get', async (data) => {
    const response = await request.get(API_GET_DISTRICT, {
        headers: authHeader(data.token),
        params: {
            id_province: data.idProvince,
        },
    });
    return response.data.data;
});

export const getWard = createAsyncThunk('ward/get', async (data) => {
    const response = await request.get(API_GET_WARD, {
        headers: authHeader(data.token),
        params: {
            id_district: data.idDistrict,
        },
    });
    return response.data.data;
});

const initialState = {
    provinces: [],
    districts: [],
    wards: [],
};

const slice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        resetDistrict: (state) => {
            state.districts = [];
        },
        resetWard: (state) => {
            state.wards = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProvince.fulfilled, (state, action) => {
            state.provinces = action.payload;
            console.log(action.payload);
        });
        builder.addCase(getDistrict.fulfilled, (state, action) => {
            state.districts = action.payload;
            console.log(action.payload);
        });
        builder.addCase(getWard.fulfilled, (state, action) => {
            state.wards = action.payload;
            console.log(action.payload);
        });
    },
});

export const { resetDistrict, resetWard } = slice.actions;

export default slice.reducer;
