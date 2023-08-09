import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '~/components/common/Loading';
import { auth } from '~/store/reducers/alumus/authSlice';
// import { auth } from '~/store/reducers/authSlice';

function Auth({ children }) {
    const dispath = useDispatch();
    const authLoading = useSelector((state) => state.alumusAuth.loading);

    useEffect(() => {
        dispath(auth());
        // if (type === 'alumus') {
        //     dispath(auth('alumus'));
        // } else {
        //     dispath(auth('employer'));
        // }
        // eslint-disable-next-line
    }, []);

    return authLoading ? <Loading /> : <div>{children}</div>;
}

export default Auth;
