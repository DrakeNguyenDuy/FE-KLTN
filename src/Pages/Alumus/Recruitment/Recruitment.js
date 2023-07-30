import { useEffect } from 'react';
import styles from './Recruitment.module.scss';
import './Recruitment.scss';
import className from 'classnames/bind';
import { Form } from 'react-bootstrap';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useDispatch, useSelector } from 'react-redux';
import JobApplied from '~/components/JobAppliedItem/JobAppliedItem';
import JobLiked from '~/components/JobLikedItem/JobLikedItem';
import { getJobApplied, getJobLiked } from '~/store/reducers/jobSlice';
import Loading from '~/components/Loading/Loading';
import NotLogin from '~/components/NotLogin/NotLogin';

const cx = className.bind(styles);

function Recruitment() {
    const dispath = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const jobApplied = useSelector((state) => state.job.jobApplied);
    const isLoading = useSelector((state) => state.job.jobAppliedLoading);
    const jobLiked = useSelector((state) => state.job.jobLiked);
    const jobLikedLoading = useSelector((state) => state.job.jobLikedLoading);

    const followStatus = useSelector((state) => state.job.follow);
    useEffect(() => {
        dispath(getJobApplied());
        // eslint-disable-next-line
    }, [token]);

    useEffect(() => {
        dispath(getJobLiked());
        // eslint-disable-next-line
    }, [followStatus]);

    return token ? (
        <div className={cx('wrapper', 'recruitment')}>
            <Tabs defaultActiveKey="jobApplied" transition={false} id="noanim-tab-example" className="mb-3">
                <Tab eventKey="jobApplied" title="Công việc đã ứng tuyển">
                    <div className={cx('find-job-apply')}>
                        <Form.Select aria-label="Trạng thái ứng tuyển">
                            <option>Trạng thái ứng tuyển</option>
                        </Form.Select>
                    </div>
                    {isLoading ? (
                        <Loading />
                    ) : (
                        <div className={cx('job-apply-wrapper')}>
                            {jobApplied?.map((item) => (
                                <JobApplied key={item.id} data={item} />
                            ))}
                        </div>
                    )}
                </Tab>
                <Tab eventKey="jobLiked" title="Công việc đã thích">
                    {jobLikedLoading ? (
                        <Loading />
                    ) : (
                        <div className={cx('job-liked-wrapper')}>
                            {/* <JobLiked /> */}
                            {jobLiked?.map((item) => (
                                <JobLiked key={item.id} data={item} />
                            ))}
                        </div>
                    )}
                </Tab>
            </Tabs>
        </div>
    ) : (
        <NotLogin />
    );
}

export default Recruitment;
