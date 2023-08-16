import React, { useEffect, useRef, useState } from 'react';
import className from 'classnames/bind';

import styles from './ButtonPopper.module.scss';
const cx = className.bind(styles);

function ButtonPopper({
    name,
    icon,
    title,
    count,
    customBodyStyle,
    children,
    onToggle = () => null,
    onClose = () => null,
    ...props
}) {
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
    }, [notifyIconRef]);

    const toggleNotifyIcon = () => {
        setNotifyOpen(!notifyOpen);
        onToggle(!notifyOpen);
    };
    const closeNotify = () => {
        setNotifyOpen(false);
        onClose();
    };

    return (
        <div className={cx('notify-group', props.style)} onClick={toggleNotifyIcon} ref={notifyIconRef}>
            <p>{name}</p>
            <div className={cx('notify-icon')}>
                {icon}
                {count && count !== 0 ? <span>{count}</span> : null}
                <div className={cx('notify-content', notifyOpen ? 'open' : 'close')}>
                    <div className={cx('notify-header')}>{title}</div>
                    <div className={cx('notify-body', 'button-poper-body', customBodyStyle)}>{children}</div>
                    <div className={cx('notify-footer')}></div>
                </div>
            </div>
        </div>
    );
}

export default ButtonPopper;
