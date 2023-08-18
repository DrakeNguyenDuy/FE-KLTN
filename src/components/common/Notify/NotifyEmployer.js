import React, { useEffect } from 'react';
import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import styles from './Notify.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getNotify, putNotify } from '~/store/reducers/common/notifySlice';
import Loading from '../Loading/Loading';
import ButtonPopper from '../ButtonPopper/ButtonPopper';
import { getNotifyEmployer, putNotifyEmployer } from '~/store/reducers/employer/employerNotifySlice';
const cx = className.bind(styles);

function NotifyEmployer() {
    const dispath = useDispatch();
    const user = useSelector((state) => state.employerAuth.user);
    const notifies = useSelector((state) => state.employerNotify.notifies);
    const notifyLoading = useSelector((state) => state.employerNotify.loading);
    const toggleNotify = useSelector((state) => state.employerNotify.toggleNotify);

    useEffect(() => {
        if (user) {
            dispath(getNotifyEmployer());
        }
        // eslint-disable-next-line
    }, [user, toggleNotify]);

    const toggleNotifyIcon = (toggleValue) => {
        if (notifies && notifies.count !== 0) dispath(putNotifyEmployer());
    };

    const convertFormatDate = (dateString) => {
        if (dateString && dateString.includes('-')) {
            const parts = dateString.split('-');
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        } else return dateString;
    };

    return (
        <ButtonPopper
            name={'Thông báo'}
            icon={<FontAwesomeIcon icon={faBell} />}
            title={'Thông báo'}
            style={cx('fsc_1')}
            onToggle={toggleNotifyIcon}
            count={notifies?.count}
        >
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
        </ButtonPopper>
    );
}

export default NotifyEmployer;
