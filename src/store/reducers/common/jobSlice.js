import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request, { authHeader } from '~/axios/request';
import { getToken } from '~/utils/LocalStorage';
// import { getAuthUsername, getToken } from '../alumus/AuthSlice';
import { HttpStatusCode } from 'axios';

const API_GET_JOBS = 'v2/products';
const API_GET_JOB_RECOMMNED = 'v1/auth/recommender/job';
const API_GET_JOB_DETAILS = 'v2/product';
const API_POST_JOB = 'v2/private/product';
const API_GET_JOB_LATEST = 'v2/products-lastest';
const API_GET_JOB_APPLIED = 'v1/auth/recruitment';
const API_JOB_LIKED = 'v1/auth/rating';

export const getJobs = createAsyncThunk(
    'job/get',
    async ({ search, career, area, typeWork, paycycle, experience, order, page, username = null }) => {
        const response = await request.get(API_GET_JOBS, {
            params: {
                page: page === 0 ? page : page - 1,
                count: 5,
                username,
                search: search === '' ? null : search,
                career: career === '' ? null : career,
                area: area === '' ? null : area,
                paycycle: paycycle === '' ? null : paycycle,
                typeWork: typeWork === '' ? null : typeWork,
                experience: experience === '' ? null : experience,
                order: order === '' ? null : order,
            },
        });
        response.data.products.sort((job1, job2) => new Date(job2.dateAvailable) - new Date(job1.dateAvailable));
        return response.data;
    },
);

export const getJobRecommned = createAsyncThunk('jobRecommned/get', async ({ id }) => {
    const token = getToken('alumus');
    if (token) {
        const response = await request.get(API_GET_JOB_RECOMMNED + '/' + id, {
            headers: authHeader(token),
        });
        response.data.sort((job1, job2) => new Date(job2.dateAvailable) - new Date(job1.dateAvailable));
        return response.data;
    } else return [];
});

export const postLikeJob = createAsyncThunk('like/post', async ({ codeJob, isFollow }) => {
    const token = getToken();
    const response = await request.post(
        `${API_JOB_LIKED}/${codeJob}`,
        {},
        {
            headers: authHeader(token),
        },
    );
    return {
        codeJob,
        status: response.status === HttpStatusCode.Ok ? !isFollow : isFollow,
    };
});

export const getJobDetail = createAsyncThunk('jobDetail/get', async ({ id, username }) => {
    const response = await request.get(API_GET_JOB_DETAILS + '/' + id, {
        params: username ? { username } : null,
    });
    return response.data;
});

export const getJobLastest = createAsyncThunk('jobLatest/get', async (username = null) => {
    // const user = await getAuthUsername(type);
    const response = await request.get(API_GET_JOB_LATEST, {
        params: { username },
    });
    return response.data;
});

export const getJobApplied = createAsyncThunk('jobApplied/get', async () => {
    const token = getToken();
    const response = await request.get(API_GET_JOB_APPLIED, {
        headers: authHeader(token),
    });
    const jobApplied = response.data;
    let result = [];
    for (let i = 0; i < jobApplied.length; i++) {
        const job = jobApplied[i];
        const jobDetails = await request.get(API_GET_JOB_DETAILS + '/' + job.codeJob);

        result.push({ companyLogo: jobDetails.data.logo, ...job });
    }
    return result;
});

export const getJobLiked = createAsyncThunk('jobLiked/get', async () => {
    const token = getToken();
    const response = await request.get(API_JOB_LIKED, {
        headers: authHeader(token),
    });
    const jobLiked = response.data;
    let result = [];
    for (let i = 0; i < jobLiked.length; i++) {
        const job = jobLiked[i];
        const jobDetails = await request.get(API_GET_JOB_DETAILS + '/' + job.codeJob);

        result.push({ companyLogo: jobDetails.data.logo, ...job });
    }
    return result;
});

export const createJob = createAsyncThunk('job/post', async (data, { rejectWithValue }) => {
    const token = getToken('employer');
    if (token) {
        try {
            const mapData = {
                descriptions: [
                    {
                        description: data.description,
                        friendlyUrl: 'string',
                        highlights: 'string',
                        id: 0,
                        keyWords: 'string',
                        language: 'vn',
                        metaDescription: 'string',
                        name: data.name,
                        title: data.name,
                    },
                ],
                categories: [
                    {
                        code: data.jobType,
                    },
                ],
                type: data.career,
                manufacturer: 'string',
                price: data.salary,
                quantity: data.numberOfRecruitments,
                gender: data.gender,
                experence: data.experience,
                positionCode: [data.position],
                skillsDecription: data.skills.map((skill) => skill.value),
                locationsDecription: [data.location],
                idPayCycle: data.paycycle,
                dateExperience: data.exprireDate,
                status: data.status,
            };
            const response = await request.post(API_POST_JOB, mapData, {
                headers: authHeader(token),
                params: { store: data.employerCode },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    } else return null;
});

export const updateJob = createAsyncThunk('updateJob/put', async ({ id, code, data }, { rejectWithValue }) => {
    const token = getToken('employer');
    if (token) {
        try {
            const mapData = {
                descriptions: [
                    {
                        description: data.description,
                        friendlyUrl: 'string',
                        highlights: 'string',
                        id: 0,
                        keyWords: 'string',
                        language: 'vn',
                        metaDescription: 'string',
                        name: data.name,
                        title: data.name,
                    },
                ],
                categories: [
                    {
                        code: data.jobType,
                    },
                ],
                type: data.career,
                manufacturer: 'string',
                price: data.salary,
                quantity: data.numberOfRecruitments,
                gender: data.gender,
                experence: data.experience,
                positionCode: [data.position],
                skillsDecription: data.skills.map((skill) => skill.value),
                locationsDecription: [data.location],
                idPayCycle: data.paycycle,
                dateExperience: data.exprireDate,
                identifier: data.sku,
                sku: data.sku,
            };
            const response = await request.put(API_POST_JOB + '/' + id, mapData, {
                headers: authHeader(token),
                params: { store: code, lang: 'vn' },
            });
            return { sku: data.sku, data: response.data };
        } catch (error) {
            return rejectWithValue(error);
        }
    } else return null;
});

const initialState = {
    jobData: null,
    jobDetails: null,
    jobLatest: null,
    jobLoading: false,
    jobApplied: null,
    jobLiked: null,
    follow: null,
    followLoading: false,
    jobDetailIsLoading: false,
    jobAppliedLoading: false,
    jobLikedLoading: false,
    jobLatestLoading: false,
    createJobStatus: null,
    createJobStatusLoading: false,
    createJobStatusError: null,
    updateJobStatus: null,
    updateJobStatusLoading: false,
    updateJobStatusError: null,
    jobRecommned: [],
    jobRecommnedLoading: false,
    jobRecommnedError: null,
};

const slice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        resetCreateStatus: (state) => {
            state.createJobStatus = null;
            state.createJobStatusError = null;
        },
        resetUpdateStatus: (state) => {
            state.updateJobStatus = null;
            state.updateJobStatusError = null;
        },
    },
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
        // get list job recommned
        builder.addCase(getJobRecommned.pending, (state, action) => {
            state.jobRecommnedLoading = true;
            state.jobRecommnedError = null;
        });
        builder.addCase(getJobRecommned.fulfilled, (state, action) => {
            state.jobRecommned = action.payload;
            state.jobRecommnedError = null;
            state.jobRecommnedLoading = false;
        });
        builder.addCase(getJobRecommned.rejected, (state, action) => {
            state.jobRecommnedLoading = false;
            state.jobRecommned = [];
            state.jobRecommnedError = action.error.message;
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
        //post job like
        builder.addCase(postLikeJob.pending, (state, action) => {
            state.follow = action.payload;
            state.followLoading = true;
        });
        builder.addCase(postLikeJob.rejected, (state, action) => {
            state.follow = action.payload;
            state.followLoading = false;
        });
        builder.addCase(postLikeJob.fulfilled, (state, action) => {
            state.follow = action.payload;
            state.followLoading = false;
        });
        //createJob
        builder.addCase(createJob.pending, (state, action) => {
            state.createJobStatusLoading = true;
        });
        builder.addCase(createJob.fulfilled, (state, action) => {
            state.createJobStatus = action.payload;
            state.createJobStatusError = null;
            state.createJobStatusLoading = false;
        });
        builder.addCase(createJob.rejected, (state, action) => {
            state.createJobStatusError = action.payload;
            state.createJobStatus = null;
            state.createJobStatusLoading = false;
        });
        //update job
        builder.addCase(updateJob.pending, (state, action) => {
            state.updateJobStatusLoading = true;
        });
        builder.addCase(updateJob.fulfilled, (state, action) => {
            state.updateJobStatus = action.payload;
            state.updateJobStatusError = null;
            state.updateJobStatusLoading = false;
        });
        builder.addCase(updateJob.rejected, (state, action) => {
            state.updateJobStatusError = action.payload;
            state.updateJobStatus = null;
            state.updateJobStatusLoading = false;
        });
    },
});

export const { resetCreateStatus, resetUpdateStatus } = slice.actions;
export default slice.reducer;
