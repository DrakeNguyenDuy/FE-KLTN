// authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request, { authHeader } from '~/axios/request';

const API_GET_SKILL = 'v2/private/skills';

export const getSkill = createAsyncThunk('skill/get', async (token) => {
    const response = await request.get(API_GET_SKILL, {
        headers: authHeader(token),
    });
    const skillOptions = response.data.data.map((skill) => ({ value: skill.code, label: skill.name }));
    return skillOptions;
});

const initialState = {
    skills: [],
};

const slice = createSlice({
    name: 'skill',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSkill.fulfilled, (state, action) => {
            state.skills = action.payload;
        });
    },
});

export default slice.reducer;
