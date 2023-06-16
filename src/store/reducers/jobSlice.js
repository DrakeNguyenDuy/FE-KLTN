// authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import request, { authHeader } from '~/axios/request';

const API_GET_JOBS = 'v2/products';
const API_GET_JOB_DETAILS = 'v2/product/';
const API_POST_JOB = 'v2/private/product?store=nhahangmoi';

export const getJobs = createAsyncThunk('job/get', async (page) => {
    const response = await request.get(API_GET_JOBS, {
        data: { page },
    });
    console.log(response.data);
    return response.data;
});

export const getJobDetail = createAsyncThunk('jobDetail/get', async (id) => {
    const response = await request.get(API_GET_JOB_DETAILS + id);
    console.log(response.data);
    return response.data;
});

export const createJob = createAsyncThunk('job/post', async (data) => {
    const mapData = {
        descriptions: [
            {
                description: data.job.description,
                friendlyUrl: 'string',
                highlights: 'string',
                id: 0,
                keyWords: 'string',
                language: 'vn',
                metaDescription: 'string',
                name: data.job.name,
                title: data.job.name,
            },
        ],
        categories: [
            {
                code: data.job.jobType,
            },
        ],
        type: data.job.career,
        manufacturer: 'string',
        price: data.job.salary,
        quantity: data.job.numberOfRecruitments,
        gender: data.job.gender,
        experence: data.job.experience,
        positionCode: [data.job.position],
        skillsDecription: data.job.skills.map((skill) => skill.value),
        locationsDecription: [data.job.location],
        idPayCycl: data.job.paycycle,
        dateExperience: data.job.exprireDate,
        identifier: getSkuJobName(data.job.name),
        sku: getSkuJobName(data.job.name),
    };
    console.log(mapData);
    // const response = await request.post(API_POST_JOB, mapData, {
    //     headers: authHeader(data.token),
    // });
    // return response.data;
});

const getSkuJobName = (jobName) => {
    let convertedName = jobName
        .normalize('NFD') // Chuyển đổi sang Unicode tổ hợp
        .replace(/[\u0300-\u036f]/g, '') // Loại bỏ các dấu thanh và dấu huyền
        .toLowerCase() // Chuyển đổi thành chữ thường
        .replace(/\s+/g, '-'); // Thay thế khoảng trắng bằng dấu gạch ngang
    //thêm uuid
    convertedName = convertedName + '-' + uuidv4();
    return convertedName;
};

const initialState = {
    jobData: null,
    jobDetails: null,
};

const slice = createSlice({
    name: 'job',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getJobs.fulfilled, (state, action) => {
            state.jobData = action.payload;
        });
        builder.addCase(getJobDetail.fulfilled, (state, action) => {
            state.jobDetails = action.payload;
        });
    },
});

export default slice.reducer;
