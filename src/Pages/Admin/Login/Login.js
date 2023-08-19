import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import className from 'classnames/bind';
import styles from './Login.module.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { validate, RULES } from '~/utils/validates/Validate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CustomPassword from '~/components/common/CustomPassword';
import CustomButton from '~/components/common/CustomButton';
import { employerlogin } from '~/store/reducers/employer/employerLoginSlice';
import { validateLogin } from '~/utils/validates/login';
import { adminLogin } from '~/store/reducers/admin/adminLoginSlice';
import { employerAuth } from '~/store/reducers/employer/employerAuthSlice';

const cx = className.bind(styles);

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const token = useSelector((state) => state.adminLogin.token);
    const loading = useSelector((state) => state.adminLogin.loading);
    const error = useSelector((state) => state.adminLogin.error);

    const dispath = useDispatch();

    const formRef = useRef();

    useEffect(() => {
        localStorage.removeItem('employerToken');
        const handleEnter = (e) => {
            if (e.key === 'Enter') {
                submit();
            }
        };
        document.addEventListener('keydown', handleEnter);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('keydown', handleEnter);
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        token && token !== -1 && navigate('/admin');
        // token && token === -1 && notify('Không có quyền vui lòng đăng nhập tài khoản admin');
        error && notify('Sai tài khoản hoặc mật khẩu.');
        // eslint-disable-next-line
    }, [error, token]);

    const submit = () => {
        const data = {
            username: formRef.current[0].value,
            password: formRef.current[1].value,
        };
        const validateMessage = validateLogin({
            data,
            callback: (message) => notify(message),
        });
        validateMessage && dispath(adminLogin({ data, notify }));
    };

    const notify = (message) => toast(message);

    return (
        <Row className={cx('wrapper')}>
            <ToastContainer />
            <Col lg={12}>
                <div className={cx('page-form')}>
                    <h2>Đăng nhập</h2>
                    <Form ref={formRef}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email </Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Nhập email"
                                onBlur={(e) =>
                                    validate(e.target, [RULES.IS_REQUIRE], e.target.value, '.lg-error', 'Email')
                                }
                            />
                            <p className={cx('lg-error', 'form-error', 'input-error')}></p>
                        </Form.Group>
                        <CustomPassword
                            controlId={'formBasicPassword'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            labelName={'Mật khẩu'}
                            placeholder={'Nhập mật khẩu'}
                            onBlur={(e) =>
                                validate(e.target, [RULES.IS_REQUIRE], e.target.value, '.cv-error', 'Mật khẩu')
                            }
                        />
                        <Form.Group className={cx('fogotpass')}>
                            <a href="forgotpass">Quên mật khẩu?</a>
                        </Form.Group>
                        <CustomButton isLoading={loading} className={cx('confirm-button')} onClick={submit}>
                            Đăng nhập
                        </CustomButton>
                        {/* <Form.Group className={cx('login-with')}>
                            <p>Hoặc đăng nhập với</p>
                        </Form.Group>
                        <Form.Group className={cx('login-social')}>
                            <Button>
                                <FontAwesomeIcon icon={faFacebook} style={{ color: '#6b0be0', fontSize: '40px' }} />
                            </Button>
                            <Button>
                                <FcGoogle style={{ fontSize: '40px' }} />
                            </Button>
                        </Form.Group> */}
                    </Form>
                </div>
            </Col>
        </Row>
    );
}

export default Login;
