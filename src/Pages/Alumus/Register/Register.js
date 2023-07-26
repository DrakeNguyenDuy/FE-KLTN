import className from 'classnames/bind';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FcGoogle } from 'react-icons/fc';
import React, { useRef } from 'react';
import styles from './Register.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import CustomPassword from '~/components/CustomPassword';
import { RULES, validate } from '~/utils/Validate';
const cx = className.bind(styles);

function Register() {
    const formRef = useRef();

    const onSubmitForm = () => {
        // const data = getFormData();
        // const validateMessage = validateRegisterForm(data, '#cv-register-error');
        // if (validateMessage) {
        //     handleSubmit(data);
        // }
    };
    const getFormData = () => {
        const form = formRef.current;
        return {
            firstName: form['lastName'].value,
            lastName: form['firstName'].value,
            email: form['email'].value,
            phoneNumber: form['password'].value,
        };
    };

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
                    <Form ref={formRef}>
                        <Form.Group className="mb-3" controlId="lastName">
                            <Form.Label>Họ </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập họ"
                                onBlur={(e) =>
                                    validate(e.target, [RULES.IS_REQUIRE], e.target.value, '.cv-error', 'Họ')
                                }
                            />
                            <p className={cx('form-error', 'cv-error', 'my-form-hidden')}></p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="firstName">
                            <Form.Label>Tên </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tên"
                                onBlur={(e) =>
                                    validate(e.target, [RULES.IS_REQUIRE], e.target.value, '.cv-error', 'Tên')
                                }
                            />
                            <p className={cx('form-error', 'cv-error', 'my-form-hidden')}></p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email </Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Nhập email"
                                onBlur={(e) =>
                                    validate(
                                        e.target,
                                        [RULES.IS_REQUIRE, RULES.IS_EMAIL],
                                        e.target.value,
                                        '.cv-error',
                                        'Email',
                                    )
                                }
                            />
                            <p className={cx('form-error', 'cv-error', 'my-form-hidden')}></p>
                        </Form.Group>
                        <CustomPassword
                            controlId="password"
                            labelName={'Mật khẩu'}
                            placeholder={'Nhập mật khẩu'}
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
                            controlId="confirmPassword"
                            labelName={'Xác nhận mật khẩu'}
                            placeholder={'Xác nhận mật khẩu'}
                            onBlur={(e) =>
                                validate(
                                    e.target,
                                    [RULES.IS_REQUIRE, RULES.IS_CONFIRM_PASSWORD],
                                    e.target.value,
                                    '.cv-error',
                                    'Xác nhận mật khẩu',
                                    '#password',
                                )
                            }
                        />
                        <p className={cx('form-error', 'cv-error', 'my-form-hidden')}></p>
                        <Button className={cx('confirm-button')} onClick={onSubmitForm}>
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
