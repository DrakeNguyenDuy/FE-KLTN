import className from 'classnames/bind';
import styles from './ManageJob.module.scss';
import './ManageJob.scss';
import { Tab, Tabs } from 'react-bootstrap';
import PostJob from '../PostJob/PostJob';
import ListJob from './components/ListJob/ListJob';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ListAlumnus from './components/ListAlumus/ListAlumnus';

const cx = className.bind(styles);

function ManageJob() {
    const { tab } = useParams();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState(tab);

    useEffect(() => {
        setActiveTab(tab);
    }, [tab]);
    return (
        <div className={cx('wrapper', 'manageJob')}>
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
                    <PostJob />
                </Tab>
                <Tab eventKey="list-job" title="Danh sách công việc">
                    <ListJob />
                </Tab>
                <Tab eventKey="list-cadidate" title="Danh sách ứng viên">
                    <ListAlumnus />
                </Tab>
            </Tabs>
        </div>
    );
}

export default ManageJob;
