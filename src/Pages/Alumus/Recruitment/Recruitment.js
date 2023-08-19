import styles from './Recruitment.module.scss';
import className from 'classnames/bind';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useSelector } from 'react-redux';
import './Recruitment.scss';

import NotLogin from '~/components/common/NotLogin';
import AppliedJobTab from './components/AppliedJobTab';
import LikedJobTab from './components/LikedJobTab';

const cx = className.bind(styles);

function Recruitment() {
    const user = useSelector((state) => state.alumusAuth.user);

    return user ? (
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
        <NotLogin nagivateLink={'/login'} />
    );
}

export default Recruitment;
