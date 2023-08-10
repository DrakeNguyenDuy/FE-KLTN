import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FcGoogle } from 'react-icons/fc';
import className from 'classnames/bind';
import styles from './Login.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CustomPassword from '~/components/common/CustomPassword';
import CustomButton from '~/components/common/CustomButton';
import { alumusLogin } from '~/store/reducers/alumus/loginSlice';
import { RULES, validate } from '~/utils/validates/Validate';
import { validateLogin } from '~/utils/validates/login';

const cx = className.bind(styles);

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const token = useSelector((state) => state.alumusLogin.token);
    const loading = useSelector((state) => state.alumusLogin.loading);
    const error = useSelector((state) => state.alumusLogin.error);

    const dispath = useDispatch();

    const formRef = useRef();

    useEffect(() => {
        // eslint-disable-next-line
        localStorage.removeItem('alumusToken');
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
        if (token) {
            navigate('/');
        }
        error && notify('Sai tài khoản hoặc mật khẩu.');

        // eslint-disable-next-line
    }, [error, token]);

    const submit = () => {
        const data = {
            type: 'alumus',
            username: formRef.current[0].value,
            password: formRef.current[1].value,
        };
        const validateMessage = validateLogin({
            data,
            callback: (message) => notify(message),
        });
        validateMessage && dispath(alumusLogin(data));
    };

    const notify = (message) => toast(message);

    return (
        <Row className={cx('wrapper')}>
            <ToastContainer />
            <Col lg={7}>
                <div className={cx('page-content')}>
                    <h1>Đăng nhập ngay</h1>
                    <h2>Cơ hội việc làm ngay tức thì</h2>
                    <p>
                        Nêu bạn chưa có tài khoản <br />
                        <span>
                            Đăng ký <a href="/register">Tại đây!</a>
                        </span>
                    </p>
                    <img src="/assets/imgs/Saly-14.png" alt="Saly-14" />
                </div>
            </Col>
            <Col lg={5}>
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
                        <Form.Group className={cx('login-with')}>
                            <p>Hoặc đăng nhập với</p>
                        </Form.Group>
                        <Form.Group className={cx('login-social')}>
                            <Button>
                                <FontAwesomeIcon icon={faFacebook} style={{ color: '#6b0be0', fontSize: '40px' }} />
                            </Button>
                            <Button>
                                <FcGoogle style={{ fontSize: '40px' }} />
                            </Button>
                        </Form.Group>
                    </Form>
                </div>
            </Col>
        </Row>
    );
}

export default Login;
