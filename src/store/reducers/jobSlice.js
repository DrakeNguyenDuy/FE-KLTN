// authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import request, { authHeader } from '~/axios/request';
import { getAuthUsername, getToken } from './authSlice';
import { HttpStatusCode } from 'axios';

const API_GET_JOBS = 'v2/products';
const API_GET_JOB_DETAILS = 'v2/product/';
const API_POST_JOB = 'v2/private/product';
const API_GET_JOB_LATEST = 'v2/products-lastest';
const API_GET_JOB_APPLIED = 'v1/auth/recruitment';
const API_GET_JOB_LIKED = 'v1/auth/rating';
const API_POST_JOB_LIKED = 'v1/auth/rating';

export const getJobs = createAsyncThunk('job/get', async ({ page, type }) => {
    const user = await getAuthUsername(type);
    const response = await request.get(API_GET_JOBS, {
        params: user ? { page: page, count: 5, username: user } : { page: page, count: 5 },
    });
    return response.data;
});

export const postLikeJob = createAsyncThunk('like/post', async ({ codeJob, isFollow }) => {
    const token = await getToken();
    const response = await request.post(
        `${API_POST_JOB_LIKED}/${codeJob}`,
        {},
        {
            headers: authHeader(token),
        },
    );
    console.log('isFl', isFollow, codeJob);
    return {
        codeJob,
        status: response.status === HttpStatusCode.Ok ? !isFollow : isFollow,
    };
});

export const getJobDetail = createAsyncThunk('jobDetail/get', async ({ id, type }) => {
    const user = await getAuthUsername(type);
    const response = await request.get(API_GET_JOB_DETAILS + id, {
        params: user ? { username: user } : null,
    });
    return response.data;
});

export const getJobLastest = createAsyncThunk('jobLatest/get', async (type) => {
    const user = await getAuthUsername(type);
    console.log(user);
    const response = await request.get(API_GET_JOB_LATEST, {
        params: user ? { username: user } : null,
    });
    console.log(response);
    return response.data;
});

export const getJobApplied = createAsyncThunk('jobApplied/get', async () => {
    const token = await getToken();
    const response = await request.get(API_GET_JOB_APPLIED, {
        headers: authHeader(token),
    });
    const jobApplied = response.data;
    let result = [];
    for (let i = 0; i < jobApplied.length; i++) {
        const job = jobApplied[i];
        const jobDetails = await request.get(API_GET_JOB_DETAILS + job.codeJob);

        result.push({ companyLogo: jobDetails.data.logo, ...job });
    }
    console.log('result', result);
    return result;
});

export const getJobLiked = createAsyncThunk('jobLiked/get', async () => {
    const token = await getToken();
    const response = await request.get(API_GET_JOB_LIKED, {
        headers: authHeader(token),
    });
    const jobLiked = response.data;
    console.log(jobLiked);
    let result = [];
    for (let i = 0; i < jobLiked.length; i++) {
        const job = jobLiked[i];
        const jobDetails = await request.get(API_GET_JOB_DETAILS + job.codeJob);

        result.push({ companyLogo: jobDetails.data.logo, ...job });
    }
    console.log('result', result);
    return result;
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
        idPayCycle: data.job.paycycle,
        dateExperience: data.job.exprireDate,
        identifier: getSkuJobName(data.job.name),
        sku: getSkuJobName(data.job.name),
    };
    const response = await request.post(API_POST_JOB, mapData, {
        headers: authHeader(data.token),
        params: { store: data.employer },
    });
    return response.data;
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
    jobLatest: null,
    jobLatestLoading: false,
    jobLoading: false,
    jobDetailIsLoading: false,
    jobApplied: null,
    jobAppliedLoading: false,
    jobLiked: null,
    jobLikedLoading: false,
    follow: null,
};

const slice = createSlice({
    name: 'job',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // get list job
        builder.addCase(getJobs.pending, (state, action) => {
            state.jobLoading = true;
        });
        builder.addCase(getJobs.fulfilled, (state, action) => {
            state.jobData = action.payload;
            state.jobLoading = false;
        });
        builder.addCase(getJobs.rejected, (state, action) => {
            state.jobLoading = false;
        });
        // job lasted
        builder.addCase(getJobLastest.pending, (state, action) => {
            state.jobLatest = action.payload;
            state.jobLatestLoading = true;
        });
        builder.addCase(getJobLastest.fulfilled, (state, action) => {
            state.jobLatest = action.payload;
            state.jobLatestLoading = false;
        });
        builder.addCase(getJobLastest.rejected, (state, action) => {
            state.jobLatestLoading = false;
        });
        // job details
        builder.addCase(getJobDetail.pending, (state, action) => {
            state.jobDetailIsLoading = true;
        });
        builder.addCase(getJobDetail.fulfilled, (state, action) => {
            state.jobDetails = action.payload;
            state.jobDetailIsLoading = false;
        });
        builder.addCase(getJobDetail.rejected, (state, action) => {
            state.jobDetailIsLoading = false;
        });
        // job applied
        builder.addCase(getJobApplied.pending, (state, action) => {
            state.jobAppliedLoading = true;
        });
        builder.addCase(getJobApplied.fulfilled, (state, action) => {
            state.jobApplied = action.payload;
            state.jobAppliedLoading = false;
        });
        builder.addCase(getJobApplied.rejected, (state, action) => {
            state.jobAppliedLoading = false;
        });
        //job liked
        builder.addCase(getJobLiked.pending, (state, action) => {
            state.jobLikedLoading = true;
        });
        builder.addCase(getJobLiked.fulfilled, (state, action) => {
            state.jobLiked = action.payload;
            state.jobLikedLoading = false;
        });
        builder.addCase(getJobLiked.rejected, (state, action) => {
            state.jobLikedLoading = false;
        });
        builder.addCase(postLikeJob.rejected, (state, action) => {
            state.follow = action.payload;
        });
        builder.addCase(postLikeJob.fulfilled, (state, action) => {
            state.follow = action.payload;
            console.log(state.follow);
        });
        // // like job
        // builder.addCase(postLikeJob.fulfilled, (state, action) => {
        //     state.jobLiked = action.payload;
        //     state.jobLikedLoading = false;
        // });
    },
});

export default slice.reducer;
