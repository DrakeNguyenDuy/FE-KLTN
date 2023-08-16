import className from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const cx = className.bind(styles);

function SideBar({ ...props }) {
    const { id } = useParams();
    const [activeItem, setActiveItem] = useState(id);
    const navigate = useNavigate();

    useEffect(() => {
        setActiveItem(id);
    }, [id]);

    const handleLogout = () => {};
    return (
        <div className={cx('wrapper', props.className)}>
            <div className={cx('sidebar-content')}>
                <p>Quản lý</p>
                <ul>
                    <li
                        className={cx(activeItem === 'dashboard' && 'active')}
                        onClick={() => navigate('/admin/dashboard')}
                    >
                        Dashboard
                    </li>
                    <li
                        className={cx(activeItem === 'employers' && 'active')}
                        onClick={() => navigate('/admin/employers')}
                    >
                        quản lý nhà tuyển dụng
                    </li>
                    <li
                        className={cx(activeItem === 'cadidates' && 'active')}
                        onClick={() => navigate('/admin/cadidates')}
                    >
                        quản lý nhà ứng viên
                    </li>
                    <li className={cx(activeItem === 'jobs' && 'active')} onClick={() => navigate('/admin/jobs')}>
                        quản lý công việc
                    </li>
                    <li onClick={handleLogout}>Đăng xuất</li>
                </ul>
            </div>
        </div>
    );
}

export default SideBar;
