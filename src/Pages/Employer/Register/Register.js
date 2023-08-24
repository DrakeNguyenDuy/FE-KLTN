import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import className from 'classnames/bind';
import { Col, Row, Tab, Tabs } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FcGoogle } from 'react-icons/fc';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import styles from './Register.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.scss';

import CustomPassword from '~/components/common/CustomPassword';
import CustomButton from '~/components/common/CustomButton';
import { RULES, validate } from '~/utils/validates/Validate';
import { validateCompanyInfor, validateRegisterEmployerForm } from '~/utils/validates/registerEmployer';
import { registerEmployer } from '~/store/reducers/employer/employerRegisterSlice';

const cx = className.bind(styles);

function Register() {
    const [activeTab, setActiveTab] = useState('companyInfor');

    const formRef = useRef();
    const dispath = useDispatch();
    const message = useSelector((state) => state.employerRegister.message);
    const loading = useSelector((state) => state.employerRegister.loading);

    useEffect(() => {
        console.log('message', message);
        if (message) {
            if (message === 'success') {
                toast('Đã đăng ký thành công hãy đăng nhập ngay!');
            } else {
                toast('Đã đăng ký không thành công email đã được đăng ký!');
            }
        }
    }, [message]);

    const onSubmitForm = () => {
        const data = getFormData();
        const validateMessage = validateRegisterEmployerForm({
            data,
            callback: (message) => notify(message),
            passwordValue: data.password,
        });
        validateMessage && dispath(registerEmployer(data));
    };

    const handleContinue = () => {
        const data = getFormData();
        const validateMessage = validateCompanyInfor({
            data,
            callback: (message) => notify(message),
        });
        validateMessage && setActiveTab('loginInfor');
    };

    const handleGoBack = () => {
        setActiveTab('companyInfor');
    };

    const getFormData = () => {
        const form = formRef.current;
        return {
            name: form['companyName'].value,
            phoneNumber: form['phoneNumber'].value,
            city: form['province'].value,
            address: form['address'].value,
            firstName: form['lastName'].value,
            lastName: form['firstName'].value,
            email: form['email'].value,
            password: form['password'].value,
            repeatPassword: form['confirmPassword'].value,
            country: 'CA',
            code: form['companyName'].value,
        };
    };

    const notify = (message) => toast(message);

    return (
        <>
            <ToastContainer />
            <Row className={cx('wrapper', 'employer-register')}>
                <Col lg={7}>
                    <div className={cx('page-content')}>
                        <h1>Đăng ký ngay</h1>
                        <h2>Cơ hội việc làm ngay tức thì</h2>
                        <p>
                            Nêu bạn đã có tài khoản <br />
                            <span>
                                Đăng nhập <a href="/employer/login">Tại đây!</a>
                            </span>
                        </p>
                        <img src="/assets/imgs/Saly-14.png" alt="Saly-14" />
                    </div>
                </Col>
                <Col lg={5}>
                    <div className={cx('page-form')}>
                        <h2>Đăng ký</h2>
                        <Form ref={formRef}>
                            <Tabs activeKey={activeTab} transition={false} id="login-infor" className="mb-3">
                                <Tab eventKey="companyInfor" title="Thông tin công ty" disabled>
                                    <Form.Group className="mb-3" controlId="companyName">
                                        <Form.Label>Tên công ty</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Nhập tên công ty"
                                            onBlur={(e) =>
                                                validate(
                                                    e.target,
                                                    [RULES.IS_REQUIRE],
                                                    e.target.value,
                                                    '.cv-error',
                                                    'Tên công ty',
                                                )
                                            }
                                        />
                                        <p className={cx('form-error', 'cv-error', 'my-form-hidden')}></p>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="phoneNumber">
                                        <Form.Label>Số điện thoại </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Nhập số điện thoại"
                                            onBlur={(e) =>
                                                validate(
                                                    e.target,
                                                    [RULES.IS_REQUIRE, RULES.IS_PHONE_NUMBER],
                                                    e.target.value,
                                                    '.cv-error',
                                                    'Số điện thoại',
                                                )
                                            }
                                        />
                                        <p className={cx('form-error', 'cv-error', 'my-form-hidden')}></p>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="province">
                                        <Form.Label>Tỉnh/Thành phố </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Nhập tỉnh/thành phố"
                                            onBlur={(e) =>
                                                validate(
                                                    e.target,
                                                    [RULES.IS_REQUIRE],
                                                    e.target.value,
                                                    '.cv-error',
                                                    'Tỉnh/thành phố',
                                                )
                                            }
                                        />
                                        <p className={cx('form-error', 'cv-error', 'my-form-hidden')}></p>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="address">
                                        <Form.Label>Địa chỉ </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Nhập địa chỉ ti tiết"
                                            onBlur={(e) =>
                                                validate(
                                                    e.target,
                                                    [RULES.IS_REQUIRE],
                                                    e.target.value,
                                                    '.cv-error',
                                                    'Địa chỉ',
                                                )
                                            }
                                        />
                                        <p className={cx('form-error', 'cv-error', 'my-form-hidden')}></p>
                                    </Form.Group>

                                    <CustomButton
                                        className={cx('confirm-button', 'continue-button')}
                                        onClick={handleContinue}
                                    >
                                        Tiếp tục
                                    </CustomButton>
                                    <Form.Group className={cx('login-social')}>
                                        <p>Hoặc tiếp tục với</p>
                                        <Button>
                                            <FontAwesomeIcon
                                                icon={faFacebook}
                                                style={{ color: '#6b0be0', fontSize: '40px' }}
                                            />
                                        </Button>
                                        <Button>
                                            <FcGoogle style={{ fontSize: '40px' }} />
                                        </Button>
                                    </Form.Group>
                                </Tab>
                                <Tab eventKey="loginInfor" title="Thông tin đăng nhập" disabled>
                                    <div className={cx('go-back')} onClick={handleGoBack}>
                                        <FontAwesomeIcon icon={faArrowLeft} />
                                        <span>Quay lại</span>
                                    </div>
                                    <Form.Group className="mb-3" controlId="lastName">
                                        <Form.Label>Họ </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Nhập họ"
                                            onBlur={(e) =>
                                                validate(
                                                    e.target,
                                                    [RULES.IS_REQUIRE],
                                                    e.target.value,
                                                    '.cv-error',
                                                    'Họ',
                                                )
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
                                                validate(
                                                    e.target,
                                                    [RULES.IS_REQUIRE],
                                                    e.target.value,
                                                    '.cv-error',
                                                    'Tên',
                                                )
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
                                        onBlur={(e) => {
                                            const passwordElement = formRef.current.querySelector('#password');
                                            const passwordValue = passwordElement.value;
                                            validate(
                                                e.target,
                                                [RULES.IS_REQUIRE, RULES.IS_CONFIRM_PASSWORD],
                                                e.target.value,
                                                '.cv-error',
                                                'Xác nhận mật khẩu',
                                                passwordValue,
                                            );
                                        }}
                                    />
                                    <p
                                        id="register-error"
                                        className={cx('form-error', 'cv-error', 'my-form-hidden')}
                                    ></p>
                                    <CustomButton
                                        className={cx('confirm-button')}
                                        onClick={onSubmitForm}
                                        isLoading={loading}
                                    >
                                        Đăng ký
                                    </CustomButton>
                                    {/* <Form.Group className={cx('login-social')}>
                                        <p>Hoặc tiếp tục với</p>
                                        <Button>
                                            <FontAwesomeIcon
                                                icon={faFacebook}
                                                style={{ color: '#6b0be0', fontSize: '40px' }}
                                            />
                                        </Button>
                                        <Button>
                                            <FcGoogle style={{ fontSize: '40px' }} />
                                        </Button>
                                    </Form.Group> */}
                                </Tab>
                            </Tabs>
                        </Form>
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default Register;
