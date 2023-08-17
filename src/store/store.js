import { configureStore } from '@reduxjs/toolkit';
import careerSlice from './reducers/common/careerSlice';
import jobSlice from './reducers/common/jobSlice';
import skillSlice from './reducers/common/skillSlice';
import typeWorkSlice from './reducers/common/typeWorkSlice';
import experienceSlice from './reducers/common/experienceSlice';
import positionSlice from './reducers/common/positionSlice';
import locationSlice from './reducers/common/locationSlice';
import paycycleSlice from './reducers/common/paycycleSlice';
import cvSlice from './reducers/alumus/cvSlice';
import profileSlice from './reducers/alumus/profileSlice';
import searchSlice from './reducers/common/searchSlice';
import recruitmentSlice from './reducers/alumus/recruitmentSlice';
import notifySlice from './reducers/common/notifySlice';
import employerSlice from './reducers/common/employerSlice';
import AlumusLoginSlice from './reducers/alumus/loginSlice';
import AlumusAuthSlice from './reducers/alumus/authSlice';
import AlumusRegisterSlice from './reducers/alumus/registerSlice';
import employerAuthSlice from './reducers/employer/employerAuthSlice';
import employerLoginSlice from './reducers/employer/employerLoginSlice';
import alumusChangePasswordSlice from './reducers/alumus/changePasswordSlice';
import employerRegisterSlice from './reducers/employer/employerRegisterSlice';
import employerProfileSlice from './reducers/employer/employerProfileSlice';
import employerManageJobSlice from './reducers/employer/employerManageJobSlice';
import employerManageCadidateSlice from './reducers/employer/employerManageCadidateSlice';
import adminLoginSlice from './reducers/admin/adminLoginSlice';
import adminListAlumnusSlice from './reducers/admin/adminListAlumnusSlice';

const store = configureStore({
    reducer: {
        alumusLogin: AlumusLoginSlice,
        alumusAuth: AlumusAuthSlice,
        alumusChangePassword: alumusChangePasswordSlice,
        alumusRegister: AlumusRegisterSlice,
        employerLogin: employerLoginSlice,
        employerAuth: employerAuthSlice,
        employerRegister: employerRegisterSlice,
        employerProfile: employerProfileSlice,
        employerManageJob: employerManageJobSlice,
        employerManageCadidate: employerManageCadidateSlice,
        adminLogin: adminLoginSlice,
        adminManageAlumnus: adminListAlumnusSlice,
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
        search: searchSlice,
        recruitment: recruitmentSlice,
        notify: notifySlice,
        employer: employerSlice,
    },
});

export default store;
