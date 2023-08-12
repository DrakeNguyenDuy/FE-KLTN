import AlummusLayout from '~/Layouts/Alumus/AlumusLayout';
import Login from '~/Pages/Alumus/Login';
import Register from '~/Pages/Alumus/Register';
import ChangePassword from '~/Pages/Alumus/ChangePassword/ChangePassword';
import Home from '~/Pages/Alumus/Home';
import CV from '~/Pages/Alumus/CV/CV';
import Profile from '~/Pages/Alumus/Profile';
import Job from '~/Pages/Alumus/Job';
import JobDetails from '~/Pages/Alumus/JobDetails';
import CompanyDetails from '~/Pages/Alumus/CompanyDetails/CompanyDetails';
import Recruitment from '~/Pages/Alumus/Recruitment';

import EmployerLayout from '~/Layouts/Employer/EmployerLayout';
import EmployerHome from '~/Pages/Employer/Home';
import EmployerLogin from '~/Pages/Employer/Login';
import EmployerRegister from '~/Pages/Employer/Register';
import ManageJob from '~/Pages/Employer/ManageJob';
import PostJob from '~/Pages/Employer/PostJob/PostJob';
import EmployerProfile from '~/Pages/Employer/Profile';

const routes = {
    alumus: [
        { path: '/', component: Home, layout: AlummusLayout, auth: true },
        { path: '/login', component: Login, layout: AlummusLayout, auth: false },
        { path: '/register', component: Register, layout: AlummusLayout, auth: false },
        { path: '/change-password', component: ChangePassword, layout: AlummusLayout, auth: true },
        { path: '/profile', component: Profile, layout: AlummusLayout, auth: true },
        { path: '/jobs', component: Job, layout: AlummusLayout, auth: true },
        { path: '/job/:id', component: JobDetails, layout: AlummusLayout, auth: true },
        { path: '/cv', component: CV, layout: AlummusLayout, auth: true },
        { path: '/full-cv/:id', component: CV, layout: null, auth: false },
        { path: '/recruitment', component: Recruitment, layout: AlummusLayout, auth: true },
        { path: '/company/:code', component: CompanyDetails, layout: AlummusLayout, auth: true },
    ],
    employer: [
        { path: '/employer', component: EmployerHome, layout: EmployerLayout, auth: true },
        { path: '/employer/login', component: EmployerLogin, layout: EmployerLayout, auth: false },
        { path: '/employer/register', component: EmployerRegister, layout: EmployerLayout, auth: false },
        { path: '/employer/profile', component: EmployerProfile, layout: EmployerLayout, auth: true },
        { path: '/employer/post-job', component: PostJob, layout: EmployerLayout, auth: true },
        { path: '/employer/manage-job', component: ManageJob, layout: EmployerLayout, auth: true },
    ],
};
export default routes;
