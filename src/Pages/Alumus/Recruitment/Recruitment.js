import { useEffect, useState } from 'react';
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
import { getApplyStatus } from '~/store/reducers/recruitmentSlice';

const cx = className.bind(styles);

function Recruitment() {
    const dispath = useDispatch();
    const [statusSelected, setStatusSelected] = useState('');
    const [jobApplyFilter, setJobApplyFilter] = useState([]);
    const token = useSelector((state) => state.auth.token);
    const jobApplied = useSelector((state) => state.job.jobApplied);
    const isLoading = useSelector((state) => state.job.jobAppliedLoading);
    const jobLiked = useSelector((state) => state.job.jobLiked);
    const jobLikedLoading = useSelector((state) => state.job.jobLikedLoading);
    const applyStatus = useSelector((state) => state.recruitment.status);
    const followStatus = useSelector((state) => state.job.follow);

    useEffect(() => {
        setJobApplyFilter(jobApplied);
    }, [jobApplied]);
    useEffect(() => {
        dispath(getApplyStatus());
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        dispath(getJobApplied());
        // eslint-disable-next-line
    }, [token]);

    useEffect(() => {
        dispath(getJobLiked());
        // eslint-disable-next-line
    }, [followStatus]);

    const handleChangeStatus = (e) => {
        const value = e.target.value;
        setStatusSelected(value);
        setJobApplyFilter(getJobByStatus(value));
    };

    const getJobByStatus = (statusCode) => {
        return statusCode ? jobApplied.filter((job) => job.status === statusCode) : jobApplied;
    };

    return token ? (
        <div className={cx('wrapper', 'recruitment')}>
            <Tabs defaultActiveKey="jobApplied" transition={false} id="noanim-tab-example" className="mb-3">
                <Tab eventKey="jobApplied" title="Công việc đã ứng tuyển">
                    <div className={cx('find-job-apply')}>
                        <Form.Select
                            aria-label="Trạng thái ứng tuyển"
                            value={statusSelected}
                            onChange={handleChangeStatus}
                        >
                            <option value="">Trạng thái ứng tuyển</option>
                            {applyStatus.map((status) => (
                                <option key={status.code} value={status.code}>
                                    {status.name}
                                </option>
                            ))}
                        </Form.Select>
                    </div>
                    {isLoading ? (
                        <Loading />
                    ) : (
                        <div className={cx('job-apply-wrapper')}>
                            {jobApplyFilter && jobApplyFilter.length !== 0 ? (
                                jobApplyFilter.map((item) => <JobApplied key={item.id} data={item} />)
                            ) : (
                                <div className={cx('not-found')}>Chưa có công việc đã thích</div>
                            )}
                        </div>
                    )}
                </Tab>
                <Tab eventKey="jobLiked" title="Công việc đã thích">
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
                </Tab>
            </Tabs>
        </div>
    ) : (
        <NotLogin />
    );
}

export default Recruitment;
