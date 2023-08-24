import className from 'classnames/bind';
import styles from './Candidate.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { employerGetCadidates } from '~/store/reducers/employer/employerManageCadidateSlice';
import CadidateItem from '../CadidateItem/CadidateItem';
import { getApplyStatus } from '~/store/reducers/alumus/recruitmentSlice';
import Loading from '../Loading/Loading';
import NoResult from '../NoResult/NoResult';

const cx = className.bind(styles);

function Cadidate({ code }) {
    const dispatch = useDispatch();
    const applyStatus = useSelector((state) => state.recruitment.status);
    const cadidates = useSelector((state) => state.employerManageCadidate.cadidates);
    const cadidateLoading = useSelector((state) => state.employerManageCadidate.loading);

    useEffect(() => {
        dispatch(employerGetCadidates(code));
        dispatch(getApplyStatus());
    }, []);
    return cadidateLoading ? (
        <Loading />
    ) : (
        <div className={cx('wrapper')}>
            {cadidates.length !== 0 ? (
                cadidates.map((item, index) => <CadidateItem key={index} data={item} statusList={applyStatus} />)
            ) : (
                <NoResult message={'Chưa có ứng viên'} />
            )}
        </div>
    );
}

export default Cadidate;
