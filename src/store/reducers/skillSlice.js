import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '~/axios/request';

const API_GET_SKILL = 'v2/skills';

export const getSkill = createAsyncThunk('skill/get', async () => {
    const response = await request.get(API_GET_SKILL);
    const skillOptions = response.data.data.map((skill) => ({ value: skill.code, label: skill.name }));
    return skillOptions;
});

export const getSkillId = createAsyncThunk('skillId/get', async () => {
    const response = await request.get(API_GET_SKILL);
    const skillOptions = response.data.data.map((skill) => ({ value: skill.id, label: skill.name }));
    return skillOptions;
});

const initialState = {
    skills: [],
    skillsId: [],
};

const slice = createSlice({
    name: 'skill',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSkill.fulfilled, (state, action) => {
            state.skills = action.payload;
            // console.log('skills', state.skills);
        });
        builder.addCase(getSkillId.fulfilled, (state, action) => {
            state.skillsId = action.payload;
            // console.log('skills', state.skillsId);
        });
    },
});

export default slice.reducer;
