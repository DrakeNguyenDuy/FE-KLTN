import DefaultLayout from '~/Layouts/DefaultLayout';
import EmployerLayout from '~/Layouts/EmployerLayout';
import Home from '~/Pages/Alumus/Home';
import Job from '~/Pages/Alumus/Job';
import JobDetail from '~/Pages/Alumus/JobDetail/JobDetail';
import Login from '~/Pages/Alumus/Login';
import Register from '~/Pages/Alumus/Register';

import EmployerHome from '~/Pages/Employer/Home';
import EmployerLogin from '~/Pages/Employer/Login';
import PostJob from '~/Pages/Employer/PostJob/PostJob';

const alumusRoutes = [
    { path: '/', component: Home, layout: DefaultLayout },
    { path: '/jobs', component: Job, layout: DefaultLayout },
    // { path: "/profile", component: null, layout: null },
    // { path: "/recruitment", component: null, layout: null },
    { path: '/login', component: Login, layout: DefaultLayout },
    { path: '/register', component: Register, layout: DefaultLayout },
    { path: '/job/:id', component: JobDetail, layout: DefaultLayout },
];

const employerRoutes = [
    { path: '/employer/', component: EmployerHome, layout: EmployerLayout },
    { path: '/employer/login', component: EmployerLogin, layout: EmployerLayout },
    { path: '/employer/post-job', component: PostJob, layout: EmployerLayout },
];

export { employerRoutes, alumusRoutes };
