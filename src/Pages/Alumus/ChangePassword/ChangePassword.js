import classNames from 'classnames/bind';
import styles from './changePassword.module.scss';
import { Col, Form, Row } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CustomButton from '~/components/common/CustomButton';
import CustomPassword from '~/components/common/CustomPassword';
import CustomBreadCrumb from '~/components/common/CustomBreadCrumb';
import { alumusChangePass } from '~/store/reducers/alumus/changePasswordSlice';
import { RULES, validate } from '~/utils/validates/Validate';
import { validateChangePassword } from '~/utils/validates/changePassword';

const cx = classNames.bind(styles);

const breadcrumbItems = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Thay đổi mật khẩu', href: '/change-password' },
];

function ChangePassword() {
    const dispath = useDispatch();
    const formRef = useRef(null);
    const user = useSelector((state) => state.alumusAuth.user);
    const changePass = useSelector((state) => state.alumusChangePassword.changePass);
    const loading = useSelector((state) => state.alumusChangePassword.loading);
    const error = useSelector((state) => state.alumusChangePassword.error);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        error && notify('Không thể đổi mật khẩu, vui lòng thử lại!');
        if (changePass) {
            setErrorMessage('');
            notify('Đã đổi mật khẩu thành công!');
        }
        // eslint-disable-next-line
    }, [error, changePass]);

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
        const validateMessage = validateChangePassword({
            data,
            selector: '#cpw-error',
            passwordValue: data.repeatPassword,
            callback: (message) => notify(message),
        });
        validateMessage && dispath(alumusChangePass(data));
    };

    const notify = (message) => toast(message);

    return (
        <Row className={cx('wrapper')}>
            <ToastContainer />
            <CustomBreadCrumb items={breadcrumbItems} className={cx('breadcrumb')} />
            <Col lg={12}>
                <div className={cx('page-form')}>
                    <Form ref={formRef}>
                        <CustomPassword
                            controlId={'currentPassword'}
                            labelName={'Mật khẩu hiện tại'}
                            placeholder={'Nhập mật khẩu hiện tại'}
                            onBlur={(e) =>
                                validate(e.target, [RULES.IS_REQUIRE], e.target.value, '.cv-error', 'Mật khẩu hiện tại')
                            }
                        />
                        <CustomPassword
                            controlId={'newPassword'}
                            labelName={'Mật khẩu mới'}
                            placeholder={'Nhập mật khẩu mới'}
                            onBlur={(e) =>
                                validate(
                                    e.target,
                                    [RULES.IS_REQUIRE, RULES.IS_PASSWORD],
                                    e.target.value,
                                    '.cv-error',
                                    'Mật khẩu',
                                )
                            }
                        />
                        <CustomPassword
                            controlId={'confirmPassword'}
                            labelName={'Nhập lại mật khẩu'}
                            placeholder={'Nhập lại mật khẩu'}
                            onBlur={(e) => {
                                const passwordElement = formRef.current.querySelector('#newPassword');
                                const passwordValue = passwordElement.value;
                                validate(
                                    e.target,
                                    [RULES.IS_REQUIRE, RULES.IS_CONFIRM_PASSWORD],
                                    e.target.value,
                                    '.cv-error',
                                    'Nhập lại mật khẩu',
                                    passwordValue,
                                );
                            }}
                        />
                        <Form.Group className={cx('form-error')}>
                            <p id="cpw-error"></p>
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
