import className from 'classnames/bind';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FcGoogle } from 'react-icons/fc';
import React from 'react';
import styles from './Login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
const cx = className.bind(styles);

function Login() {
    return (
        <Row>
            <Col lg={7}>
                <div className={cx('login-content', 'position-relative')}>
                    <h1>Đăng nhập ngay</h1>
                    <h2>Cơ hội việc làm ngay tức thì</h2>
                    <p>
                        Nêu bạn chưa có tài khoản <br />
                        <span>
                            Đăng ký{' '}
                            <a
                                href="https://figma.com/file/kdU1fpvg127UGy0b7QLXjy/Khóa-luận-tốt-nghiệp?node-id=0-1&t=kdHyQIdDkTGQBUMr-0"
                                target="blank"
                            >
                                Tại đây!
                            </a>
                        </span>
                    </p>
                    <img src="/assets/imgs/Saly-14.png" alt="Saly-14" />
                </div>
            </Col>
            <Col lg={5}>
                <div className={cx('login-form')}>
                    <h2>Đăng nhập</h2>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email </Form.Label>
                            <Form.Control type="email" placeholder="Nhập email" />
                            {/* <Form.Text className="text-danger">
                                We'll never share your email with anyone else.
                            </Form.Text> */}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control type="password" placeholder="Nhập mật khẩu" />
                        </Form.Group>
                        <Form.Group className={cx('login-fogotpass')}>
                            <a href="forgotpass">Quên mật khẩu?</a>
                        </Form.Group>
                        <Button className={cx('login-button')} type="submit">
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
