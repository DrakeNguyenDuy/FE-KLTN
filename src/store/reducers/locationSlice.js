// authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '~/axios/request';

const API_GET_PROVINCE = 'v2/provinces';
const API_GET_DISTRICT = 'v2/districts';
const API_GET_WARD = 'v2/wards';

export const getProvince = createAsyncThunk('province/get', async () => {
    const response = await request.get(API_GET_PROVINCE);
    return response.data.data;
});
export const getDistrict = createAsyncThunk('district/get', async (idProvince) => {
    const response = await request.get(API_GET_DISTRICT, {
        params: {
            id_province: idProvince,
        },
    });
    return response.data.data;
});

export const getWard = createAsyncThunk('ward/get', async (idDistrict) => {
    const response = await request.get(API_GET_WARD, {
        params: {
            id_district: idDistrict,
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
            // console.log('provinces', state.provinces);
        });
        builder.addCase(getDistrict.fulfilled, (state, action) => {
            state.districts = action.payload;
            // console.log('districts', state.districts);
        });
        builder.addCase(getWard.fulfilled, (state, action) => {
            state.wards = action.payload;
            // console.log('wards', state.wards);
        });
    },
});

export const { resetDistrict, resetWard } = slice.actions;

export default slice.reducer;
