import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '~/components/common/Loading';
import { auth } from '~/store/reducers/alumus/authSlice';

function Auth({ children }) {
    const dispath = useDispatch();
    const authLoading = useSelector((state) => state.alumusAuth.loading);

    useEffect(() => {
        dispath(auth());
        // eslint-disable-next-line
    }, []);

    return authLoading ? <Loading /> : <div>{children}</div>;
}

export default Auth;
