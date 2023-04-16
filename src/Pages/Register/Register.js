import className from 'classnames/bind';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FcGoogle } from 'react-icons/fc';
import React from 'react';
import styles from './Register.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import CustomPassword from '~/components/CustomPassword';
const cx = className.bind(styles);

function Register() {
    return (
        <Row className={cx('wrapper')}>
            <Col lg={7}>
                <div className={cx('page-content')}>
                    <h1>Đăng ký ngay</h1>
                    <h2>Cơ hội việc làm ngay tức thì</h2>
                    <p>
                        Nêu bạn đã có tài khoản <br />
                        <span>
                            Đăng nhập <a href="/login">Tại đây!</a>
                        </span>
                    </p>
                    <img src="/assets/imgs/Saly-14.png" alt="Saly-14" />
                </div>
            </Col>
            <Col lg={5}>
                <div className={cx('page-form')}>
                    <h2>Đăng ký</h2>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Họ </Form.Label>
                            <Form.Control type="text" placeholder="Nhập họ" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Tên </Form.Label>
                            <Form.Control type="text" placeholder="Nhập tên" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email </Form.Label>
                            <Form.Control type="email" placeholder="Nhập email" />
                        </Form.Group>
                        <CustomPassword
                            controlId={'formBasicPassword'}
                            labelName={'Mật khẩu'}
                            placeholder={'Nhập mật khẩu'}
                        />
                        <CustomPassword
                            controlId={'formBasicPassword'}
                            labelName={'Xác nhận mật khẩu'}
                            placeholder={'Xác nhận mật khẩu'}
                        />
                        <Button className={cx('confirm-button')} type="submit">
                            Đăng ký
                        </Button>
                        <Form.Group className={cx('login-social')}>
                            <p>Hoặc tiếp tục với</p>
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

export default Register;
