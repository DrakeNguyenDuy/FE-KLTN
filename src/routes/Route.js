import DefaultLayout from '~/Layouts/DefaultLayout';
import EmployerLayout from '~/Layouts/EmployerLayout';
import Home from '~/Pages/Home';
import Job from '~/Pages/Job/Job';
import Login from '~/Pages/Login';
import Register from '~/Pages/Register';

const alumusRoutes = [
    { path: '/', component: Home, layout: DefaultLayout },
    { path: '/jobs', component: Job, layout: DefaultLayout },
    // { path: "/profile", component: null, layout: null },
    // { path: "/recruitment", component: null, layout: null },
    { path: '/login', component: Login, layout: DefaultLayout },
    { path: '/register', component: Register, layout: DefaultLayout },
];

const employerRoutes = [{ path: '/employer/', component: Home, layout: EmployerLayout }];

export { employerRoutes, alumusRoutes };
