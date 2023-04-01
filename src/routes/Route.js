import DefaultLayout from '~/Layouts/DefaultLayout';
import Home from '~/Pages/Home';
import Login from '~/Pages/Login';

const employerRoutes = [
    { path: '/', component: Home, layout: DefaultLayout },
    // { path: "/job", component: null, layout: null },
    // { path: "/profile", component: null, layout: null },
    // { path: "/recruitment", component: null, layout: null },
    { path: '/login', component: Login, layout: DefaultLayout },
    // { path: "/register", component: null, layout: null },
];

const alumusRoutes = [];

export { employerRoutes, alumusRoutes };
