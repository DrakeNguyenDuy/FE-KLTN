import React, { useState, useRef, useEffect } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import styles from './UpdateCV.module.scss';
import className from 'classnames/bind';
import './UpdateCV.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getCareer } from '~/store/reducers/careerSlice';
import { getSkill } from '~/store/reducers/skillSlice';
import GroupInput from '../GroupInput/GroupInput';

const cx = className.bind(styles);

function UpdateCVModal({ data, show, handleClose, handleSubmit }) {
    const formRef = useRef();
    const [skillSelected, setSkillSelected] = useState('');

    const dispath = useDispatch();
    const careers = useSelector((state) => state.career.careers);
    const skills = useSelector((state) => state.skill.skills);

    useEffect(() => {
        dispath(getCareer());
        dispath(getSkill());
        // eslint-disable-next-line
    }, []);

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
                    <Form.Group className="mb-3" controlId="CVLastName">
                        <Form.Label>Họ </Form.Label>
                        <Form.Control type="text" placeholder="Nhập họ" defaultValue={data?.firstName} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="CVFirstName">
                        <Form.Label>Tên </Form.Label>
                        <Form.Control type="text" placeholder="Nhập tên" defaultValue={data?.lastName} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="CVEmail">
                        <Form.Label>Email </Form.Label>
                        <Form.Control type="email" placeholder="Nhập email" defaultValue={data?.email} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="CVGender">
                        <Form.Label>Chọn giới tính</Form.Label>
                        <Form.Select aria-label="Chọn giới tính" defaultValue={data?.gender}>
                            <option>Chọn giới tính</option>
                            <option value="M">Nam</option>
                            <option value="FM">Nữ</option>
                            <option value="O">Khác</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="CVDob">
                        <Form.Label>Ngày sinh</Form.Label>
                        <Form.Control type="date" placeholder="Ngày sinh" defaultValue={data?.dob} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="CVEnglishLV">
                        <Form.Label>Trình độ tiếng anh</Form.Label>
                        <Form.Select aria-label="Chọn trình độ tiếng anh" defaultValue={data?.englishLevel.code}>
                            <option>Trình độ tiếng anh</option>
                            <option value="LV0">Không biết</option>
                            <option value="LV1">Đọc hiểu cơ bản</option>
                            <option value="LV2">Giao tiếp tốt</option>
                            <option value="LV3">Thành thạo các kỹ năng</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="CVCareer">
                        <Form.Label>Chọn ngành nghề</Form.Label>
                        <Form.Select aria-label="Chọn ngành nghề" defaultValue={data?.carrer.code}>
                            <option>Chọn ngành nghề</option>
                            {careers
                                .filter((career, index) => index !== 0)
                                .map((career) => (
                                    <option key={career.code} value={career.code}>
                                        {career.name}
                                    </option>
                                ))}
                        </Form.Select>
                    </Form.Group>
                    {/* <Form.Group className="mb-3">
                        <Form.Label>Chọn kỹ năng</Form.Label>
                        <Select
                            isMulti
                            name="CVSkill"
                            options={skills}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            value={skillSelected}
                            onChange={(value) => {
                                console.log('value', value);
                                return setSkillSelected(value);
                            }}
                        />
                    </Form.Group> */}
                    <GroupInput />
                    <Form.Group className="mb-3" controlId="CVExperience">
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
                    <Form.Group className="mb-3" controlId="CVWorkType">
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
                    <Form.Group className="mb-3" controlId="CVAddress">
                        <Form.Label>Địa điểm làm việc</Form.Label>
                        <Form.Select aria-label="Chọn địa điểm làm việc">
                            <option>Địa điểm làm việc</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="CVIntroduce">
                        <Form.Label>Giới thiệu bản thân</Form.Label>
                        <Form.Control type="text" placeholder="Nhập giới thiệu" defaultValue={data?.introduce} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="CVGoal">
                        <Form.Label>Mục tiêu mong muốn</Form.Label>
                        <Form.Control type="text" placeholder="Nhập mục tiêu" defaultValue={data?.goal} />
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

export default UpdateCVModal;
