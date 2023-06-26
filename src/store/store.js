import { configureStore } from '@reduxjs/toolkit';
import authSlice from './reducers/authSlice';
import careerSlice from './reducers/careerSlice';
import jobSlice from './reducers/jobSlice';
import skillSlice from './reducers/skillSlice';
import typeWorkSlice from './reducers/typeWorkSlice';
import experienceSlice from './reducers/experienceSlice';
import positionSlice from './reducers/positionSlice';
import locationSlice from './reducers/locationSlice';
import paycycleSlice from './reducers/paycycleSlice';
import cvSlice from './reducers/cvSlice';
import profileSlice from './reducers/profileSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        career: careerSlice,
        job: jobSlice,
        skill: skillSlice,
        typeWork: typeWorkSlice,
        experience: experienceSlice,
        position: positionSlice,
        location: locationSlice,
        paycycle: paycycleSlice,
        cv: cvSlice,
        profile: profileSlice,
    },
});

export default store;
