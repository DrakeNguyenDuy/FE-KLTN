import React, { useState, useRef } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import styles from './UpdateProfile.module.scss';
import className from 'classnames/bind';
import Select from 'react-select';
import './UpdateProfile.scss';

const cx = className.bind(styles);

function UpdateProfileModal({ show, handleClose, handleSubmit }) {
    const formRef = useRef();
    const [skillSelected, setSkillSelected] = useState('');

    const handleUpdate = () => {
        handleSubmit();
        handleClose();
    };
    const onClose = () => {
        handleClose();
    };
    return (
        <Modal show={show} onHide={onClose} className="modal-update-profile">
            <Modal.Header closeButton>
                <Modal.Title>Cập nhật Hồ sơ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                    <Form.Group className="mb-3" controlId="JobGender">
                        <Form.Label>Chọn giới tính</Form.Label>
                        <Form.Select aria-label="Chọn giới tính">
                            <option>Chọn giới tính</option>
                            <option value="M">Nam</option>
                            <option value="FM">Nữ</option>
                            <option value="O">Khác</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="JobExpriedDate">
                        <Form.Label>Ngày sinh</Form.Label>
                        <Form.Control type="date" placeholder="Ngày sinh" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="JobGender">
                        <Form.Label>Trình độ tiếng anh</Form.Label>
                        <Form.Select aria-label="Chọn giới tính">
                            <option>Trình độ tiếng anh</option>
                            <option value="LV1">Không biết</option>
                            <option value="LV2">Đọc hiểu cơ bản</option>
                            <option value="LV3">Giao tiếp tốt</option>
                            <option value="LV4">Thành thạo các kỹ năng</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="jobCareer">
                        <Form.Label>Chọn ngành nghề</Form.Label>
                        <Form.Select aria-label="Chọn ngành nghề">
                            <option>Chọn ngành nghề</option>
                            {/* {careers
                            .filter((career, index) => index !== 0)
                            .map((career) => (
                                <option key={career.code} value={career.code}>
                                    {career.name}
                                </option>
                            ))} */}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Chọn kỹ năng</Form.Label>
                        <Select
                            isMulti
                            name="jobSkill"
                            // options={skills}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            value={skillSelected}
                            onChange={(value) => setSkillSelected(value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="JobExperience">
                        <Form.Label>Chọn kinh nghiệm làm việc</Form.Label>
                        <Form.Select aria-label="Chọn kinh nghiệm làm việc">
                            <option>Chọn kinh nghiệm làm việc</option>
                            {/* {experiences.map((experience) => (
                            <option key={experience.id} value={experience.code}>
                                {experience.name}
                            </option>
                        ))} */}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="JobWorkType">
                        <Form.Label>Chọn hình thức làm việc</Form.Label>
                        <Form.Select aria-label="Chọn hình thức làm việc">
                            <option>Chọn hình thức làm việc</option>
                            {/* {typeWorks.map((typeWork) => (
                                <option key={typeWork.code} value={typeWork.code}>
                                    {typeWork.code}
                                </option>
                            ))} */}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="JobGender">
                        <Form.Label>Địa điểm làm việc</Form.Label>
                        <Form.Select aria-label="Chọn giới tính">
                            <option>Địa điểm làm việc</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="JobGender">
                        <Form.Label>Chu kỳ nhận lương</Form.Label>
                        <Form.Select aria-label="Chọn giới tính">
                            <option>Chu kỳ nhận lương</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Giới thiệu bản thân</Form.Label>
                        <Form.Control type="text" placeholder="Nhập giới thiệu" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Mục tiêu mong muốn</Form.Label>
                        <Form.Control type="text" placeholder="Nhập mục tiêu" />
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

export default UpdateProfileModal;
