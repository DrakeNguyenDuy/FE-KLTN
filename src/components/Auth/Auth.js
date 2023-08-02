import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '~/store/reducers/authSlice';
import Loading from '../Loading/Loading';

function Auth({ children, type }) {
    const dispath = useDispatch();
    const authLoading = useSelector((state) => state.auth.authLoading);

    useEffect(() => {
        if (type === 'alumus') {
            dispath(auth('alumus'));
        } else {
            dispath(auth('employer'));
        }
        // eslint-disable-next-line
    }, []);

    return authLoading ? <Loading /> : <div>{children}</div>;
}

export default Auth;
