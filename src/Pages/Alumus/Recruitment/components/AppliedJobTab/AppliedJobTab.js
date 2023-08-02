import classNames from 'classnames/bind';
import styles from './AppliedJobTab.module.scss';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '~/components/Loading/Loading';
import JobApplied from '~/components/JobAppliedItem/JobAppliedItem';
import { getApplyStatus } from '~/store/reducers/recruitmentSlice';
import { getJobApplied } from '~/store/reducers/jobSlice';

const cx = classNames.bind(styles);

function AppliedJobTab() {
    const dispath = useDispatch();
    const jobApplied = useSelector((state) => state.job.jobApplied);
    const applyStatus = useSelector((state) => state.recruitment.status);
    const isLoading = useSelector((state) => state.job.jobAppliedLoading);
    const [statusSelected, setStatusSelected] = useState('');
    const [jobApplyFilter, setJobApplyFilter] = useState([]);

    useEffect(() => {
        dispath(getApplyStatus());
        dispath(getJobApplied());
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setJobApplyFilter(jobApplied);
    }, [jobApplied]);

    const handleChangeStatus = (e) => {
        const value = e.target.value;
        setStatusSelected(value);
        setJobApplyFilter(getJobByStatus(value));
    };

    const getJobByStatus = (statusCode) => {
        return statusCode ? jobApplied.filter((job) => job.status === statusCode) : jobApplied;
    };
    return (
        <>
            <div className={cx('find-job-apply')}>
                <Form.Select aria-label="Trạng thái ứng tuyển" value={statusSelected} onChange={handleChangeStatus}>
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
        </>
    );
}

export default AppliedJobTab;
