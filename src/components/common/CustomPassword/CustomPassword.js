import className from 'classnames/bind';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import styles from './CustomPassword.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
const cx = className.bind(styles);

function CustomPassword({ labelName, placeholder, controlId, onBlur, ...props }) {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <Form.Group className={cx('password-field', 'mb-3')} controlId={controlId}>
            <Form.Label>{labelName}</Form.Label>
            <div className={cx('input-wrapper')}>
                <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    onBlur={onBlur}
                    onCopy={(e) => {
                        e.preventDefault();
                    }}
                    {...props}
                />
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} onClick={toggleShowPassword} />
            </div>
            <p className={cx('form-error', 'cv-error', 'my-form-hidden')}></p>
        </Form.Group>
    );
}

export default CustomPassword;
