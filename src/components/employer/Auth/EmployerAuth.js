import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '~/components/common/Loading';
import { employerAuth } from '~/store/reducers/employer/employerAuthSlice';

function AuthEmployer({ children }) {
    const dispath = useDispatch();
    const authLoading = useSelector((state) => state.employerAuth.loading);

    useEffect(() => {
        dispath(employerAuth());
        // eslint-disable-next-line
    }, []);

    return authLoading ? <Loading /> : <div>{children}</div>;
}

export default AuthEmployer;
