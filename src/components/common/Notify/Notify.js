import React, { useEffect, useRef, useState } from 'react';
import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import styles from './Notify.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getNotify, putNotify } from '~/store/reducers/common/notifySlice';
import Loading from '../Loading/Loading';
const cx = className.bind(styles);

function Notify() {
    const dispath = useDispatch();
    const user = useSelector((state) => state.alumusAuth.user);
    const notifies = useSelector((state) => state.notify.notifies);
    const notifyLoading = useSelector((state) => state.notify.loading);
    const toggleNotify = useSelector((state) => state.notify.toggleNotify);
    const [notifyOpen, setNotifyOpen] = useState(false);
    const notifyIconRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notifyIconRef.current && !notifyIconRef.current.contains(event.target)) {
                closeNotify();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
        // eslint-disable-next-line
    }, [notifyIconRef, user]);

    useEffect(() => {
        if (user) {
            dispath(getNotify());
        }
        // eslint-disable-next-line
    }, [user, toggleNotify]);

    const toggleNotifyIcon = () => {
        setNotifyOpen(!notifyOpen);
        if (notifies && notifies.count !== 0) dispath(putNotify());
    };
    const closeNotify = () => {
        setNotifyOpen(false);
    };

    const convertFormatDate = (dateString) => {
        if (dateString && dateString.includes('-')) {
            const parts = dateString.split('-');
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        } else return dateString;
    };

    return (
        <div className={cx('fsc_1', 'notify-group')} onClick={toggleNotifyIcon} ref={notifyIconRef}>
            <p>Thông báo</p>
            <div className={cx('notify-icon')}>
                <FontAwesomeIcon icon={faBell} />
                {!notifyLoading && notifies && notifies?.count !== 0 ? <span>{notifies.count}</span> : null}
                <div className={cx('notify-content', notifyOpen ? 'open' : 'close')}>
                    <div className={cx('notify-header')}>Thông báo</div>
                    <div className={cx('notify-body')}>
                        {notifyLoading ? (
                            <Loading />
                        ) : user ? (
                            notifies?.notifies.map((notify, index) => (
                                <div className={cx('notify-item', 'new')} key={index}>
                                    <p className={cx('notify-value')}>{notify.value}</p>
                                    <p className={cx('notify-time')}>{convertFormatDate(notify.time)}</p>
                                </div>
                            ))
                        ) : (
                            <div className={cx('notify-item', 'new')}>
                                <p className={cx('notify-value')}>Không có thông báo</p>
                            </div>
                        )}
                    </div>
                    <div className={cx('notify-footer')}></div>
                </div>
            </div>
        </div>
    );
}

export default Notify;
