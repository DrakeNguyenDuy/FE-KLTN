import classNames from 'classnames/bind';
import styles from './LikedJobTab.module.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '~/components/Loading/Loading';
import { getJobLiked } from '~/store/reducers/jobSlice';
import JobLiked from '~/components/JobLikedItem/JobLikedItem';

const cx = classNames.bind(styles);

function LikedJobTab() {
    const dispath = useDispatch();
    const jobLiked = useSelector((state) => state.job.jobLiked);
    const jobLikedLoading = useSelector((state) => state.job.jobLikedLoading);
    const followStatus = useSelector((state) => state.job.follow);

    useEffect(() => {
        dispath(getJobLiked());
        // eslint-disable-next-line
    }, [followStatus]);

    return (
        <>
            {jobLikedLoading ? (
                <Loading />
            ) : (
                <div className={cx('job-liked-wrapper')}>
                    {jobLiked && jobLiked.length !== 0 ? (
                        jobLiked.map((item) => <JobLiked key={item.id} data={item} />)
                    ) : (
                        <div className={cx('not-found')}>Chưa có công việc đã thích</div>
                    )}
                </div>
            )}
        </>
    );
}

export default LikedJobTab;