import className from 'classnames/bind';
import styles from './ManageJob.module.scss';
import './ManageJob.scss';
import { Tab, Tabs } from 'react-bootstrap';
import PostJob from '../PostJob/PostJob';
import ListJob from './components/ListJob/ListJob';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ListAlumnus from './components/ListAlumus/ListAlumnus';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { resetUpdateStatus } from '~/store/reducers/common/jobSlice';
import PostJobWrapper from '../PostJob/PostJobWrapper';
import NotLogin from '~/components/common/NotLogin/NotLogin';

const cx = className.bind(styles);

function ManageJob() {
    const { tab } = useParams();
    const navigate = useNavigate();
    const dispath = useDispatch();
    const [searchParam] = useSearchParams();
    const copy = searchParam.get('copy');
    const [activeTab, setActiveTab] = useState(tab);
    const user = useSelector((state) => state.employerAuth.user);

    const updateJobStatus = useSelector((state) => state.job.updateJobStatus);
    const updateJobStatusLoading = useSelector((state) => state.job.updateJobStatusLoading);
    const updateJobStatusError = useSelector((state) => state.job.updateJobStatusError);

    useEffect(() => {
        updateJobStatus && toast('Đã cập nhật công việc thành công!');
        updateJobStatusError && toast('Đã cập nhật công việc thất bại hãy điền đủ thông tin!');
        dispath(resetUpdateStatus());
    }, [updateJobStatus, updateJobStatusError]);

    useEffect(() => {
        setActiveTab(tab);
    }, [tab]);
    return user ? (
        <div className={cx('wrapper', 'manageJob')}>
            <ToastContainer />
            <Tabs
                activeKey={activeTab}
                transition={true}
                id="noanim-tab-example"
                className={cx('mb-3', 'tabs')}
                onSelect={(tab) => {
                    navigate('/employer/manage-job/' + tab);
                    setActiveTab(tab);
                }}
            >
                <Tab eventKey="post-job" title="Đăng tuyển">
                    <PostJobWrapper id={copy ? copy : null} update={false} active={activeTab} />
                </Tab>
                <Tab eventKey="list-job" title="Danh sách công việc">
                    <ListJob active={activeTab} />
                </Tab>
                <Tab eventKey="list-cadidate" title="Danh sách ứng viên">
                    <ListAlumnus active={activeTab} />
                </Tab>
            </Tabs>
        </div>
    ) : (
        <NotLogin nagivateLink={'/employer/login'} />
    );
}

export default ManageJob;
