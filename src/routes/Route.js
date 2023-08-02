import DefaultLayout from '~/Layouts/DefaultLayout';
import EmployerLayout from '~/Layouts/EmployerLayout';
import CV from '~/Pages/Alumus/CV/CV';
import Home from '~/Pages/Alumus/Home';
import Job from '~/Pages/Alumus/Job';
import JobDetail from '~/Pages/Alumus/JobDetail';
import Login from '~/Pages/Alumus/Login';
import Profile from '~/Pages/Alumus/Profile';
import Recruitment from '~/Pages/Alumus/Recruitment';
import Register from '~/Pages/Alumus/Register';

import EmployerHome from '~/Pages/Employer/Home';
import EmployerLogin from '~/Pages/Employer/Login';
import ManageJob from '~/Pages/Employer/ManageJob';
import PostJob from '~/Pages/Employer/PostJob/PostJob';

const routes = {
    alumus: [
        { path: '/', component: Home, layout: DefaultLayout, auth: true },
        { path: '/jobs', component: Job, layout: DefaultLayout, auth: true },
        { path: '/profile', component: Profile, layout: DefaultLayout, auth: true },
        { path: '/recruitment', component: Recruitment, layout: DefaultLayout, auth: true },
        { path: '/cv', component: CV, layout: DefaultLayout, auth: true },
        { path: '/full-cv/:id', component: CV, layout: null, auth: false },
        { path: '/login', component: Login, layout: DefaultLayout, auth: false },
        { path: '/register', component: Register, layout: DefaultLayout, auth: false },
        { path: '/job/:id', component: JobDetail, layout: DefaultLayout, auth: true },
    ],
    employer: [
        { path: '/employer/', component: EmployerHome, layout: EmployerLayout, auth: false },
        { path: '/employer/login', component: EmployerLogin, layout: EmployerLayout, auth: false },
        { path: '/employer/post-job', component: PostJob, layout: EmployerLayout, auth: true },
        { path: '/employer/manage-job', component: ManageJob, layout: EmployerLayout, auth: true },
    ],
};
export default routes;
