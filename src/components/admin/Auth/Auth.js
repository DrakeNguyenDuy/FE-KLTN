import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import Loading from '~/components/common/Loading';
import NotFound from '~/components/common/NotFound/NotFound';
import { adminAuth } from '~/store/reducers/admin/adminAuthSlice';
import { adminLogout } from '~/store/reducers/admin/adminLoginSlice';
import { employerAuth } from '~/store/reducers/employer/employerAuthSlice';

function Auth({ children }) {
    const dispath = useDispatch();
    const navigate = useNavigate();
    const authLoading = useSelector((state) => state.adminAuth.loading);
    const user = useSelector((state) => state.adminAuth.user);

    useEffect(() => {
        dispath(adminAuth());
        // eslint-disable-next-line
    }, []);
    return authLoading ? <Loading /> : user ? <div>{children}</div> : <NotFound />;
}

export default Auth;
