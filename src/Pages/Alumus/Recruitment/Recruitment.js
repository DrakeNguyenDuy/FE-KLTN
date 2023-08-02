import styles from './Recruitment.module.scss';
import './Recruitment.scss';
import className from 'classnames/bind';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useSelector } from 'react-redux';
import NotLogin from '~/components/NotLogin/NotLogin';
import AppliedJobTab from './components/AppliedJobTab/AppliedJobTab';
import LikedJobTab from './components/LikedJobTab/LikedJobTab';

const cx = className.bind(styles);

function Recruitment() {
    const token = useSelector((state) => state.auth.token);

    return token ? (
        <div className={cx('wrapper', 'recruitment')}>
            <Tabs defaultActiveKey="jobApplied" transition={false} id="noanim-tab-example" className="mb-3">
                <Tab eventKey="jobApplied" title="Công việc đã ứng tuyển">
                    <AppliedJobTab />
                </Tab>
                <Tab eventKey="jobLiked" title="Công việc đã thích">
                    <LikedJobTab />
                </Tab>
            </Tabs>
        </div>
    ) : (
        <NotLogin />
    );
}

export default Recruitment;
