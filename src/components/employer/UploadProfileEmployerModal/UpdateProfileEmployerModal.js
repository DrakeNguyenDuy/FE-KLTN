import React, { useRef } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import className from 'classnames/bind';
import styles from './UpdateProfileEmployer.module.scss';
import './UpdateProfileEmployer.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { RULES, validate } from '~/utils/validates/Validate';
import { validateUpdateProfileEmployer } from '~/utils/validates/updateProfileEmployer';

const cx = className.bind(styles);

function UpdateProfileEmployerModal({ data, show, handleClose, handleSubmit }) {
    const formRef = useRef();
    const handleUpdate = () => {
        const data = getFormData();

        const validateMessage = validateUpdateProfileEmployer({
            data,
            callback: (message) => notify(message),
        });
        validateMessage && handleSubmit(data);
    };

    const notify = (message) => toast(message);
    const onClose = () => {
        handleClose();
    };
    const getFormData = () => {
        const form = formRef.current;
        return {
            name: form['companyName'].value,
            numOfEmployee: form['numEmployee'].value,
            phoneNumber: form['phoneNumber'].value,
            address: form['address'].value,
            sologan: form['slogan'].value,
            description: form['description'].value,
        };
    };
    return (
        <Modal show={show} onHide={onClose} className="modal-update-profile">
            <Modal.Header closeButton>
                <Modal.Title>Cập nhật Hồ sơ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ToastContainer />
                <Form ref={formRef}>
                    <Form.Group className="mb-3" controlId="companyName">
                        <Form.Label>Tên công ty</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập tên công ty"
                            defaultValue={data?.name}
                            onBlur={(e) => validate(e.target, [RULES.IS_REQUIRE], e.target.value, '.pf-error', 'Họ')}
                        />
                        <p className={cx('form-error', 'pf-error', 'my-form-hidden')}></p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="numEmployee">
                        <Form.Label>Số lượng nhân viên</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập số lượng nhân viên"
                            defaultValue={data?.numOfEmployee}
                            onBlur={(e) =>
                                validate(e.target, [RULES.IS_NUMBER], e.target.value, '.pf-error', 'Số lượng nhân viên')
                            }
                        />
                        <p className={cx('form-error', 'pf-error', 'my-form-hidden')}></p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="phoneNumber">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập số điện thoại"
                            defaultValue={data?.phoneNumber}
                            onBlur={(e) =>
                                validate(
                                    e.target,
                                    [RULES.IS_REQUIRE, RULES.IS_PHONE_NUMBER],
                                    e.target.value,
                                    '.pf-error',
                                    'Số điện thoại',
                                )
                            }
                        />
                        <p className={cx('form-error', 'pf-error', 'my-form-hidden')}></p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập địa chỉ"
                            defaultValue={data?.address}
                            onBlur={(e) =>
                                validate(e.target, [RULES.IS_REQUIRE], e.target.value, '.pf-error', 'Địa chỉ')
                            }
                        />
                        <p className={cx('form-error', 'pf-error', 'my-form-hidden')}></p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="slogan">
                        <Form.Label>Slogan</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập slogan"
                            defaultValue={data?.sologan}
                            onBlur={(e) =>
                                validate(e.target, [RULES.IS_REQUIRE], e.target.value, '.pf-error', 'Slogan')
                            }
                        />
                        <p className={cx('form-error', 'pf-error', 'my-form-hidden')}></p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Nhập giới thiệu công ty</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Nhập mô tả công ty"
                            defaultValue={data?.description}
                            onBlur={(e) =>
                                validate(e.target, [RULES.IS_REQUIRE], e.target.value, '.pf-error', 'Mô tả công ty')
                            }
                        />
                        <p className={cx('form-error', 'pf-error', 'my-form-hidden')}></p>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleUpdate}>
                    Cập nhật
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateProfileEmployerModal;
