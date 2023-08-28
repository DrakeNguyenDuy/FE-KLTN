import className from 'classnames/bind';
import styles from './RecommendAlumnus.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { employerGetRecommendCadidates } from '~/store/reducers/employer/employerManageCadidateSlice';
import CadidateItem from '~/components/common/CadidateItem';
import Loading from '~/components/common/Loading/Loading';
import NoResult from '~/components/common/NoResult/NoResult';

const cx = className.bind(styles);

function RecommendAlumnus({ code }) {
    const dispatch = useDispatch();
    const recommendCadidates = useSelector((state) => state.employerManageCadidate.recommendCadidates);
    const recommendCadidateLoading = useSelector((state) => state.employerManageCadidate.recommendCadidateLoading);

    useEffect(() => {
        dispatch(employerGetRecommendCadidates(code));
    }, []);
    return recommendCadidateLoading ? (
        <Loading />
    ) : (
        <div className={cx('wrapper')}>
            {recommendCadidates.length !== 0 ? (
                recommendCadidates.map((item, index) => <CadidateItem key={index} data={item} isRecommendItem={true} />)
            ) : (
                <NoResult message={'Chưa có ứng viên'} />
            )}
        </div>
    );
}

export default RecommendAlumnus;
