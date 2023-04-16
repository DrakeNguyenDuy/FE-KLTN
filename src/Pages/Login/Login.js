import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FcGoogle } from 'react-icons/fc';
import className from 'classnames/bind';
import styles from './Login.module.scss';

import CustomPassword from '~/components/CustomPassword';

const cx = className.bind(styles);

function Login() {
    // const [showPassword, setShowPassword] = useState(false);

    // const toggleShowPassword = () => {
    //     setShowPassword(!showPassword);
    // };
    return (
        <Row className={cx('wrapper')}>
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
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email </Form.Label>
                            <Form.Control type="email" placeholder="Nhập email" />
                        </Form.Group>
                        <CustomPassword
                            controlId={'formBasicPassword'}
                            labelName={'Mật khẩu'}
                            placeholder={'Nhập mật khẩu'}
                        />
                        <Form.Group className={cx('fogotpass')}>
                            <a href="forgotpass">Quên mật khẩu?</a>
                        </Form.Group>
                        <Button className={cx('confirm-button')} type="submit">
                            Đăng nhập
                        </Button>
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
