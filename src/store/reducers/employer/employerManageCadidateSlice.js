import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request, { authHeader } from '~/axios/request';
import { getToken } from '~/utils/LocalStorage';

const API_GET_LIST_CADIDATE = 'v1/private/recruitment';
const API_RECOMMNED_ALUNUS = 'v1/private/recommender/alumnus';
const API_GET_CV_NO_AUTH = 'v1/cv';
const API_GET_JOB_DETAILS = 'v2/product';
const API_POST_CHANGE_STATUS_CADIDATE = 'v1/private/recruitment/change';
const API_CADIDATE_LIST = 'v1/private/recruitment';

export const employerGetCadidates = createAsyncThunk('manageCadidate/get', async (code) => {
    const token = getToken('employer');
    if (token) {
        const response = await request.get(API_GET_LIST_CADIDATE + '/' + code, {
            headers: authHeader(token),
        });
        const cadidatesList = response.data;
        return cadidatesList;
    } else return null;
});

export const employerGetRecommendCadidates = createAsyncThunk('recommendCadidate/get', async (code) => {
    const token = getToken('employer');
    if (token) {
        const response = await request.get(API_RECOMMNED_ALUNUS + '/' + code, {
            headers: authHeader(token),
        });
        const cadidatesList = response.data;
        return cadidatesList;
    } else return null;
});

export const employerGetListCadidate = createAsyncThunk(
    'manageCadidateList/get',
    async ({ code, page, search, status }) => {
        const token = getToken('employer');
        if (token) {
            const response = await request.get(API_CADIDATE_LIST, {
                headers: authHeader(token),
                params: {
                    page: page === 0 ? page : page - 1,
                    size: 5,
                    query: search === '' ? null : search,
                    status: status === '' ? null : status,
                },
            });
            return response.data;
        } else return null;
    },
);

export const postChangeStatusCadidate = createAsyncThunk('manageCadidate/postChangeStatus', async (data) => {
    const token = getToken('employer');
    const response = await request.post(API_POST_CHANGE_STATUS_CADIDATE, data, {
        headers: authHeader(token),
    });
    return {
        ...data,
        resStatus: response.data === 'Change status success',
    };
});

const initialState = {
    cadidates: [],
    loading: false,
    error: null,

    recommendCadidates: [],
    recommendCadidateLoading: false,
    recomendCadidateError: null,

    listCadidate: [],
    listCadidateLoading: false,
    listCadidateError: null,

    changeStatus: null,
    changeStatusLoading: false,
    changeStatusError: null,
};

const slice = createSlice({
    name: 'employerCadidate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(employerGetCadidates.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(employerGetCadidates.fulfilled, (state, action) => {
                state.cadidates = action.payload;
                state.loading = false;
            })
            .addCase(employerGetCadidates.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(employerGetRecommendCadidates.pending, (state) => {
                state.recommendCadidateLoading = true;
                state.recomendCadidateError = null;
            })
            .addCase(employerGetRecommendCadidates.fulfilled, (state, action) => {
                state.recommendCadidates = action.payload;
                state.recommendCadidateLoading = false;
            })
            .addCase(employerGetRecommendCadidates.rejected, (state, action) => {
                state.recommendCadidateLoading = false;
                state.recomendCadidateError = action.error.message;
            })
            .addCase(postChangeStatusCadidate.pending, (state) => {
                state.changeStatusLoading = true;
                state.error = null;
            })
            .addCase(postChangeStatusCadidate.fulfilled, (state, action) => {
                state.changeStatus = action.payload;
                state.changeStatusLoading = false;
            })
            .addCase(postChangeStatusCadidate.rejected, (state, action) => {
                state.changeStatusLoading = false;
                state.error = action.error.message;
            })
            .addCase(employerGetListCadidate.pending, (state) => {
                state.listCadidateLoading = true;
                state.listCadidateError = null;
            })
            .addCase(employerGetListCadidate.fulfilled, (state, action) => {
                state.listCadidate = action.payload;
                state.listCadidateLoading = false;
            })
            .addCase(employerGetListCadidate.rejected, (state, action) => {
                state.listCadidateLoading = false;
                state.listCadidateError = action.error.message;
            });
    },
});

export default slice.reducer;
