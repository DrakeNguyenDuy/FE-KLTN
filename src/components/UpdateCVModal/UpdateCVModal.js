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
    const [conactFields, setConactFields] = useState(0);
    const [skillFields, setSkillFields] = useState(0);
    const [experienceFields, setExperienceFields] = useState(0);
    const [educationFields, setEducationFields] = useState(0);
    const [certificateFields, setCertificateFields] = useState(0);

    const dispath = useDispatch();
    const careers = useSelector((state) => state.career.careers);

    useEffect(() => {
        dispath(getCareer());
        dispath(getSkill());

        if (data) {
            setConactFields(data.contacts.length);
            setSkillFields(data.skills.length);
            setEducationFields(data.educations.length);
            setExperienceFields(data.workExperiences.length);
            setCertificateFields(data.certificates.length);
        }
        // eslint-disable-next-line
    }, [data]);

    const handleUpdate = () => {
        const data = getFormData();
        handleSubmit(data);
        handleClose();
    };
    const onClose = () => {
        handleClose();
    };
    const getFormData = () => {
        const form = formRef.current;
        const websites = getData(form, conactFields, '.website-input', ['name', 'link']);
        const skills = getData(form, skillFields, '.skill-input', ['code', 'des']);
        const educations = getData(form, educationFields, '.education-input', [
            'school',
            'major',
            'startDate',
            'endDate',
        ]);
        const experiences = getData(form, experienceFields, '.experience-input', [
            'titlePosition',
            'companyName',
            'startDate',
            'description',
        ]);
        const certificates = getData(form, certificateFields, '.certificate-input', ['name', 'linkReference']);
        return {
            firstName: form['CVFirstName'].value,
            lastName: form['CVLastName'].value,
            email: form['CVEmail'].value,
            phoneNumber: form['CVPhone'].value,
            gender: form['CVGender'].value,
            title: form['CVPosition'].value,
            dob: form['CVDob'].value,
            address: form['CVAddress'].value,
            introduce: form['CVIntroduce'].value,
            goal: form['CVGoal'].value,
            englishLevel: {
                code: form['CVEnglishLV'].value,
            },
            carrer: {
                code: form['CVCareer'].value,
            },
            contacts: websites,
            skills,
            educations,
            workExperiences: experiences,
            certificates,
        };
    };

    const getData = (formRef, numFields, selector, template) => {
        const inputs = formRef.querySelectorAll(selector);
        const result = [];
        for (let i = 0; i < numFields; i++) {
            const objectMapper = {};
            template.forEach((field, index) => {
                objectMapper[field] = inputs[i * template.length + index].value;
            });
            result.push(objectMapper);
        }
        return result;
    };

    return (
        <Modal show={show} onHide={onClose} className="modal-update-profile">
            <Modal.Header closeButton>
                <Modal.Title>Cập nhật Hồ sơ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form ref={formRef}>
                    <Form.Group className="mb-3" controlId="CVLastName">
                        <Form.Label>Họ </Form.Label>
                        <Form.Control type="text" placeholder="Nhập họ" defaultValue={data?.lastName} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="CVFirstName">
                        <Form.Label>Tên </Form.Label>
                        <Form.Control type="text" placeholder="Nhập tên" defaultValue={data?.firstName} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="CVPosition">
                        <Form.Label>Vị trí ứng tuyển </Form.Label>
                        <Form.Control type="text" placeholder="Nhập vị trí ứng tuyển" defaultValue={data?.title} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="CVEmail">
                        <Form.Label>Email </Form.Label>
                        <Form.Control type="email" placeholder="Nhập email" defaultValue={data?.email} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="CVPhone">
                        <Form.Label>Số điện thoại </Form.Label>
                        <Form.Control type="text" placeholder="Nhập số điện thoại" defaultValue={data?.phoneNumber} />
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
                    <Form.Group className="mb-3" controlId="CVAddress">
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control type="text" placeholder="Nhập địa chỉ" defaultValue={data?.address} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="CVIntroduce">
                        <Form.Label>Giới thiệu bản thân</Form.Label>
                        <Form.Control as="textarea" placeholder="Nhập giới thiệu" defaultValue={data?.introduce} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="CVGoal">
                        <Form.Label>Mục tiêu mong muốn</Form.Label>
                        <Form.Control as="textarea" placeholder="Nhập mục tiêu" defaultValue={data?.goal} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="CVEnglishLV">
                        <Form.Label>Trình độ tiếng anh</Form.Label>
                        <Form.Select aria-label="Chọn trình độ tiếng anh" defaultValue={data?.englishLevel.code}>
                            <option>Trình độ tiếng anh</option>
                            <option value="LV0">Không biết</option>
                            <option value="LV1">Đọc hiểu cơ bản</option>
                            <option value="LV2">Giao tiếp tốt</option>
                            <option value="LV3">Thành thạo các kỹ năng</option>
                            <option value="LV4">Master</option>
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
                    <GroupInput
                        name="Trang web"
                        data={data?.contacts}
                        onAdd={() => setConactFields(conactFields + 1)}
                        onDelete={() => setConactFields(conactFields - 1)}
                        model={{
                            name: '',
                            link: '',
                        }}
                        renderItem={(data) => (
                            <>
                                <Form.Control
                                    className="website-input"
                                    type="text"
                                    placeholder="Tên trang web"
                                    defaultValue={data.name}
                                />
                                <Form.Control
                                    className="website-input"
                                    type="text"
                                    placeholder="Link trang web"
                                    defaultValue={data.link}
                                />
                            </>
                        )}
                    />
                    <GroupInput
                        name="Kỹ năng"
                        data={data?.skills}
                        onAdd={() => setSkillFields(skillFields + 1)}
                        onDelete={() => setSkillFields(skillFields - 1)}
                        model={{
                            nameSkill: '',
                            rate: 0.0,
                            des: '',
                        }}
                        renderItem={(data) => (
                            <>
                                <Form.Control
                                    className="skill-input"
                                    type="text"
                                    placeholder="Kỹ năng"
                                    defaultValue={data.nameSkill}
                                />
                                <Form.Control
                                    className={cx('description', 'skill-input')}
                                    as="textarea"
                                    placeholder="Mô tả"
                                    defaultValue={data.des}
                                />
                            </>
                        )}
                    />
                    <GroupInput
                        name="Học vấn"
                        data={data?.educations}
                        onAdd={() => setEducationFields(educationFields + 1)}
                        onDelete={() => setEducationFields(educationFields - 1)}
                        model={{
                            school: '',
                            isGraduated: false,
                            major: '',
                            startDate: '',
                            endDate: '',
                        }}
                        renderItem={(data) => (
                            <>
                                <Form.Control
                                    className="education-input"
                                    type="text"
                                    placeholder="Tên trường"
                                    defaultValue={data.school}
                                />
                                <Form.Control
                                    className="education-input"
                                    type="text"
                                    placeholder="Chuyên ngành"
                                    defaultValue={data.major}
                                />
                                <Form.Control
                                    className="education-input"
                                    type="date"
                                    placeholder="Ngày bắt đầu"
                                    defaultValue={data.startDate}
                                />
                                <Form.Control
                                    className="education-input"
                                    type="date"
                                    placeholder="Ngày kết thúc"
                                    defaultValue={data.endDate}
                                />
                            </>
                        )}
                    />
                    <GroupInput
                        name="Kinh nghiệm làm việc"
                        data={data?.workExperiences}
                        onAdd={() => setExperienceFields(experienceFields + 1)}
                        onDelete={() => setExperienceFields(experienceFields - 1)}
                        model={{
                            titlePosition: '',
                            companyName: '',
                            startDate: '',
                            description: '',
                        }}
                        renderItem={(data) => (
                            <>
                                <Form.Control
                                    className="experience-input"
                                    type="text"
                                    placeholder="Vị trí công việc"
                                    defaultValue={data.titlePosition}
                                />
                                <Form.Control
                                    className="experience-input"
                                    type="text"
                                    placeholder="Tên công ty"
                                    defaultValue={data.companyName}
                                />
                                <Form.Control
                                    className="experience-input"
                                    type="date"
                                    placeholder="Ngày bắt đầu"
                                    defaultValue={data.startDate}
                                />
                                <Form.Control
                                    className={cx('description', 'experience-input')}
                                    as="textarea"
                                    placeholder="Mô tả"
                                    defaultValue={data.description}
                                />
                            </>
                        )}
                    />
                    <GroupInput
                        name="Bằng cấp"
                        data={data?.certificates}
                        onAdd={() => setCertificateFields(certificateFields + 1)}
                        onDelete={() => setCertificateFields(certificateFields - 1)}
                        model={{
                            name: '',
                            linkReference: '',
                        }}
                        renderItem={(data) => (
                            <>
                                <Form.Control
                                    className="certificate-input"
                                    type="text"
                                    placeholder="Tên bằng cấp"
                                    defaultValue={data.name}
                                />
                                <Form.Control
                                    className="certificate-input"
                                    type="text"
                                    placeholder="Link bằng cấp"
                                    defaultValue={data.linkReference}
                                />
                            </>
                        )}
                    />
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
