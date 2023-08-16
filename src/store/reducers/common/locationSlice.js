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
    provinceLoading: false,
    districtLoading: false,
    wardLoading: false,
    provinceError: null,
    districtError: null,
    wardError: null,
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
            state.provinceLoading = false;
        });
        builder.addCase(getDistrict.fulfilled, (state, action) => {
            state.districts = action.payload;
            state.districtLoading = false;
        });
        builder.addCase(getWard.fulfilled, (state, action) => {
            state.wards = action.payload;
            state.wardLoading = false;
        });
        builder.addCase(getProvince.pending, (state, action) => {
            state.provinceLoading = true;
        });
        builder.addCase(getDistrict.pending, (state, action) => {
            state.districtLoading = true;
        });
        builder.addCase(getWard.pending, (state, action) => {
            state.wardLoading = true;
        });
        builder.addCase(getProvince.rejected, (state, action) => {
            state.provinceError = action.error;
            state.provinceLoading = false;
        });
        builder.addCase(getDistrict.rejected, (state, action) => {
            state.districtError = action.error;
            state.provinceLoading = false;
        });
        builder.addCase(getWard.rejected, (state, action) => {
            state.wardError = action.error;
            state.wardLoading = false;
        });
    },
});

export const { resetDistrict, resetWard } = slice.actions;

export default slice.reducer;
