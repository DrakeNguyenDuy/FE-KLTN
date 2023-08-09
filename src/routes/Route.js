import AlummusLayout from '~/Layouts/Alumus/AlumusLayout';
import EmployerLayout from '~/Layouts/Employer/EmployerLayout';
import CV from '~/Pages/Alumus/CV/CV';
import ChangePassword from '~/Pages/Alumus/ChangePassword/ChangePassword';
import CompanyDetails from '~/Pages/Alumus/CompanyDetails/CompanyDetails';
import Home from '~/Pages/Alumus/Home';
import Job from '~/Pages/Alumus/Job';
import JobDetails from '~/Pages/Alumus/JobDetails';
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
        { path: '/', component: Home, layout: AlummusLayout, auth: true },
        { path: '/jobs', component: Job, layout: AlummusLayout, auth: true },
        { path: '/profile', component: Profile, layout: AlummusLayout, auth: true },
        { path: '/recruitment', component: Recruitment, layout: AlummusLayout, auth: true },
        { path: '/cv', component: CV, layout: AlummusLayout, auth: true },
        { path: '/full-cv/:id', component: CV, layout: null, auth: false },
        { path: '/login', component: Login, layout: AlummusLayout, auth: false },
        { path: '/register', component: Register, layout: AlummusLayout, auth: false },
        { path: '/job/:id', component: JobDetails, layout: AlummusLayout, auth: true },
        { path: '/company/:code', component: CompanyDetails, layout: AlummusLayout, auth: true },
        { path: '/change-password', component: ChangePassword, layout: AlummusLayout, auth: true },
    ],
    employer: [
        { path: '/employer', component: EmployerHome, layout: EmployerLayout, auth: true },
        { path: '/employer/login', component: EmployerLogin, layout: EmployerLayout, auth: false },
        { path: '/employer/post-job', component: PostJob, layout: EmployerLayout, auth: true },
        { path: '/employer/manage-job', component: ManageJob, layout: EmployerLayout, auth: true },
    ],
};
export default routes;
