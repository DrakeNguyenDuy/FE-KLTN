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

const alumusRoutes = [
    { path: '/', component: Home, layout: DefaultLayout },
    { path: '/jobs', component: Job, layout: DefaultLayout },
    { path: '/profile', component: Profile, layout: DefaultLayout },
    { path: '/recruitment', component: Recruitment, layout: DefaultLayout },
    { path: '/cv', component: CV, layout: DefaultLayout },
    { path: '/full-cv', component: CV, layout: null },
    { path: '/login', component: Login, layout: DefaultLayout },
    { path: '/register', component: Register, layout: DefaultLayout },
    { path: '/job/:id', component: JobDetail, layout: DefaultLayout },
];

const employerRoutes = [
    { path: '/employer/', component: EmployerHome, layout: EmployerLayout },
    { path: '/employer/login', component: EmployerLogin, layout: EmployerLayout },
    { path: '/employer/post-job', component: PostJob, layout: EmployerLayout },
    { path: '/employer/manage-job', component: ManageJob, layout: EmployerLayout },
];

export { employerRoutes, alumusRoutes };
