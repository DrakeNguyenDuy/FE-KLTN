import classNames from 'classnames/bind';
import styles from './changePassword.module.scss';
import { Col, Form, Row } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '~/components/common/CustomButton';
import CustomPassword from '~/components/common/CustomPassword';
import CustomBreadCrumb from '~/components/common/CustomBreadCrumb';
import { alumusChangePass } from '~/store/reducers/alumus/changePasswordSlice';

const cx = classNames.bind(styles);

const breadcrumbItems = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Thay đổi mật khẩu', href: '/change-password' },
];

function ChangePassword() {
    const dispath = useDispatch();
    const formRef = useRef(null);
    const user = useSelector((state) => state.alumusAuth.user);
    const loading = useSelector((state) => state.alumusChangePassword.loading);
    const error = useSelector((state) => state.alumusChangePassword.error);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (error) {
            setErrorMessage('Sai tài khoản hoặc mật khẩu.');
        } else {
            setErrorMessage('');
        }
        // eslint-disable-next-line
    }, [error]);

    useEffect(() => {
        const handleEnter = (e) => {
            if (e.key === 'Enter') {
                submit();
            }
        };
        document.addEventListener('keydown', handleEnter);
        return () => {
            document.removeEventListener('keydown', handleEnter);
        };
        // eslint-disable-next-line
    }, []);

    const submit = () => {
        const data = {
            current: formRef.current['currentPassword'].value,
            password: formRef.current['newPassword'].value,
            repeatPassword: formRef.current['confirmPassword'].value,
            username: user?.userName,
        };
        dispath(alumusChangePass(data));
    };

    return (
        <Row className={cx('wrapper')}>
            <CustomBreadCrumb items={breadcrumbItems} className={cx('breadcrumb')} />
            <Col lg={12}>
                <div className={cx('page-form')}>
                    <Form ref={formRef}>
                        <CustomPassword
                            controlId={'currentPassword'}
                            labelName={'Mật khẩu hiện tại'}
                            placeholder={'Nhập mật khẩu hiện tại'}
                        />
                        <CustomPassword
                            controlId={'newPassword'}
                            labelName={'Mật khẩu mới'}
                            placeholder={'Nhập mật khẩu mới'}
                        />
                        <CustomPassword
                            controlId={'confirmPassword'}
                            labelName={'Nhập lại mật khẩu'}
                            placeholder={'Nhập lại mật khẩu'}
                        />
                        <Form.Group className={cx('form-error')}>
                            <p>{errorMessage}</p>
                        </Form.Group>
                        <CustomButton className={cx('confirm-button')} isLoading={loading} onClick={submit}>
                            Xác nhận
                        </CustomButton>
                    </Form>
                </div>
            </Col>
        </Row>
    );
}

export default ChangePassword;
