import className from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminLogout } from '~/store/reducers/admin/adminLoginSlice';
import { useDispatch, useSelector } from 'react-redux';

const cx = className.bind(styles);

function SideBar({ name, ...props }) {
    const dispath = useDispatch();
    const user = useSelector((state) => state.adminAuth.user);
    // const authLoading = useSelector((state) => state.alumusAuth.loading);

    console.log(user);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispath(adminLogout('alumus'));
    };
    return (
        <div className={cx('wrapper', props.className)}>
            {user ? (
                <div className={cx('sidebar-content')}>
                    <p>Quản lý</p>
                    <ul>
                        <li className={cx(name === 'dashboard' && 'active')} onClick={() => navigate('/admin')}>
                            Trang chủ
                        </li>
                        <li
                            className={cx(name === 'employers' && 'active')}
                            onClick={() => navigate('/admin/employers')}
                        >
                            quản lý nhà tuyển dụng
                        </li>
                        <li
                            className={cx(name === 'cadidates' && 'active')}
                            onClick={() => navigate('/admin/cadidates')}
                        >
                            quản lý nhà ứng viên
                        </li>
                    </ul>
                </div>
            ) : (
                <>
                    <img src="/assets/imgs/Saly-14.png" alt="Saly-14" />
                </>
            )}
        </div>
    );
}

export default SideBar;
