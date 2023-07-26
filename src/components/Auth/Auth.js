import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '~/store/reducers/authSlice';

function Auth({ children, role }) {
    const dispath = useDispatch();

    useEffect(() => {
        if (role === 'alumus') {
            dispath(auth('alumus'));
        } else {
            dispath(auth('employer'));
        }
        // eslint-disable-next-line
    }, []);

    return <>{children}</>;
}

export default Auth;
