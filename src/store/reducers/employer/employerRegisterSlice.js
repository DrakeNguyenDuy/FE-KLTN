// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import request from '~/axios/request';

// const API_EMPLOYER_LOGIN = 'v1/private/login';
// const API_ALUMUS_LOGIN = 'v1/customer/login';
// const API_GET_EMPLOYER = 'v1/private/user/profile';
// const API_AUTH_EMPLOYER = 'v1/private/store';
// const API_AUTH_ALUMUS = 'v1/auth/customer/profile';
// const API_AUTH_ALUMUS_PROFILE = 'v1/auth/profile';
// const API_REGISTER_ALUMUS = 'v1/customer/register';

// export const registerAlumus = createAsyncThunk('employerRegister/post', async (data) => {
//     const response = await request.post(API_REGISTER_ALUMUS, data);
//     return response.data;
// });

// const initialState = {
//     register: null,
//     loading: false,
//     message: null,
// };

// const slice = createSlice({
//     name: 'register',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(registerAlumus.pending, (state, action) => {
//                 state.message = null;
//                 state.register = true;
//             })
//             .addCase(registerAlumus.fulfilled, (state, action) => {
//                 state.register = action.payload;
//                 state.message = 'success';
//                 state.loading = false;
//             })
//             .addCase(registerAlumus.rejected, (state, action) => {
//                 state.loading = false;
//                 state.message = 'fail';
//             });
//     },
// });

// export default slice.reducer;
