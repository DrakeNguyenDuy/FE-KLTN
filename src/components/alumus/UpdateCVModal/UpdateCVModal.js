import React, { useState, useRef, useEffect } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styles from './UpdateCV.module.scss';
import className from 'classnames/bind';
import './UpdateCV.module.scss';

import GroupInput from '~/components/common/GroupInput';
import { RULES, validate, validateUpdateCV } from '~/utils/Validate';
import { getSkill } from '~/store/reducers/common/skillSlice';
import { getCareer } from '~/store/reducers/common/careerSlice';

const cx = className.bind(styles);

function UpdateCVModal({ data, show, handleClose, handleSubmit }) {
    const formRef = useRef();
    const [websites, setWebsites] = useState([]);
    const [skills, setSkills] = useState([]);
    const [educations, setEducations] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [certificates, setCertificates] = useState([]);

    const dispath = useDispatch();
    const careers = useSelector((state) => state.career.careers);

    useEffect(() => {
        dispath(getCareer());
        dispath(getSkill());

        if (data) {
            setWebsites(data.websites);
            setSkills(data.skills);
            setEducations(data.educations);
            setExperiences(data.experiences);
            setCertificates(data.certificates);
        }
        // eslint-disable-next-line
    }, [data]);

    const convertFormatDate = (dateString, d) => {
        if (dateString && dateString.includes('-')) {
            const parts = dateString.split('-');
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        } else return dateString;
    };

    const handleUpdate = () => {
        const data = getFormData();
        const validateMessage = validateUpdateCV(data, '#cv-update-error');
        if (validateMessage) {
            data.dob = convertFormatDate(data.dob);
            data.educations = data.educations.map((education) => ({
                school: education.school,
                major: education.major,
                startDate: convertFormatDate(education.startDate),
                isGraduated: education.isGraduated,
                endDate: education.isGraduated === 'false' ? null : convertFormatDate(education.endDate, 'endDate'),
                description: education.description,
            }));
            data.workExperiences = data.workExperiences.map((experience) => ({
                titlePosition: experience.titlePosition,
                companyName: experience.companyName,
                startDate: convertFormatDate(experience.startDate),
                endDate: experience.isCurrent === 'true' ? null : convertFormatDate(experience.endDate),
                description: experience.description,
            }));
            console.log('update', data);
            handleSubmit(data);
        }
    };
    const onClose = () => {
        handleClose();
    };

    const handleAdd = ({ list, setList, model }) => {
        setList([...list, model]);
    };

    const handleDelete = ({ list, setList, index }) => setList(list.filter((block, i) => i !== index));
    const handleChange = ({ element, index, list, selector, template, setList }) => {
        const inputs = formRef.current.querySelectorAll(selector);
        const result = [...list];
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i] === element.target) {
                result[index][template[i % template.length]] = element.target.value;
            }
        }
        setList(result);
    };

    const getFormData = () => {
        const form = formRef.current;
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

    return (
        <Modal show={show} onHide={onClose} className="modal-update-profile">
            <Modal.Header closeButton>
                <Modal.Title>Cập nhật CV</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form ref={formRef}>
                    <Form.Group className="mb-3" controlId="CVLastName">
                        <Form.Label>Họ </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập họ"
                            defaultValue={data?.lastName}
                            onBlur={(e) => validate(e.target, [RULES.IS_REQUIRE], e.target.value, '.cv-error', 'Họ')}
                        />
                        <p className={cx('form-error', 'cv-error', 'my-form-hidden')}></p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="CVFirstName">
                        <Form.Label>Tên </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập tên"
                            defaultValue={data?.firstName}
                            onBlur={(e) => validate(e.target, [RULES.IS_REQUIRE], e.target.value, '.cv-error', 'Tên')}
                        />
                        <p className={cx('form-error', 'cv-error', 'my-form-hidden')}></p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="CVPosition">
                        <Form.Label>Vị trí ứng tuyển </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập vị trí ứng tuyển"
                            defaultValue={data?.title}
                            onBlur={(e) =>
                                validate(e.target, [RULES.IS_REQUIRE], e.target.value, '.cv-error', 'Vị trí ứng tuyển')
                            }
                        />
                        <p className={cx('form-error', 'cv-error', 'my-form-hidden')}></p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="CVEmail">
                        <Form.Label>Email </Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Nhập email"
                            defaultValue={data?.email}
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
                    <Form.Group className="mb-3" controlId="CVPhone">
                        <Form.Label>Số điện thoại </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập số điện thoại"
                            defaultValue={data?.phoneNumber}
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
                    <Form.Group className="mb-3" controlId="CVGender">
                        <Form.Label>Chọn giới tính</Form.Label>
                        <Form.Select
                            aria-label="Chọn giới tính"
                            defaultValue={data?.gender}
                            onBlur={(e) =>
                                validate(e.target, [RULES.IS_REQUIRE], e.target.value, '.cv-error', 'Giới tính')
                            }
                        >
                            <option value="">Chọn giới tính</option>
                            <option value="M">Nam</option>
                            <option value="F">Nữ</option>
                            <option value="O">Khác</option>
                        </Form.Select>
                        <p className={cx('form-error', 'cv-error', 'my-form-hidden')}></p>
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="CVDob"
                        onBlur={(e) => validate(e.target, [RULES.IS_REQUIRE], e.target.value, '.cv-error', 'Ngày sinh')}
                    >
                        <Form.Label>Ngày sinh</Form.Label>
                        <Form.Control type="date" placeholder="Ngày sinh" defaultValue={data?.dob} />
                        <p className={cx('form-error', 'cv-error', 'my-form-hidden')}></p>
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="CVAddress"
                        onBlur={(e) => validate(e.target, [RULES.IS_REQUIRE], e.target.value, '.cv-error', 'Địa chỉ')}
                    >
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control type="text" placeholder="Nhập địa chỉ" defaultValue={data?.address} />
                        <p className={cx('form-error', 'cv-error', 'my-form-hidden')}></p>
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
                        <Form.Select
                            aria-label="Chọn trình độ tiếng anh"
                            defaultValue={data?.englishLevel.code}
                            onBlur={(e) =>
                                validate(
                                    e.target,
                                    [RULES.IS_REQUIRE],
                                    e.target.value,
                                    '.cv-error',
                                    'Trình độ tiếng anh',
                                )
                            }
                        >
                            <option value="">Trình độ tiếng anh</option>
                            <option value="LV0">Không biết</option>
                            <option value="LV1">Đọc hiểu cơ bản</option>
                            <option value="LV2">Giao tiếp tốt</option>
                            <option value="LV3">Thành thạo các kỹ năng</option>
                        </Form.Select>
                        <p className={cx('form-error', 'cv-error', 'my-form-hidden')}></p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="CVCareer">
                        <Form.Label>Chọn ngành nghề</Form.Label>
                        <Form.Select
                            aria-label="Chọn ngành nghề"
                            defaultValue={data?.carrer.code}
                            onBlur={(e) =>
                                validate(e.target, [RULES.IS_REQUIRE], e.target.value, '.cv-error', 'Ngành nghề')
                            }
                        >
                            <option value="">Chọn ngành nghề</option>
                            {careers
                                .filter((career, index) => index !== 0)
                                .map((career) => (
                                    <option key={career.code} value={career.code}>
                                        {career.name}
                                    </option>
                                ))}
                        </Form.Select>
                        <p className={cx('form-error', 'cv-error', 'my-form-hidden')}></p>
                    </Form.Group>
                    <GroupInput
                        name="Trang web"
                        data={websites}
                        onAdd={() =>
                            handleAdd({
                                list: websites,
                                setList: setWebsites,
                                model: {
                                    name: '',
                                    link: '',
                                },
                            })
                        }
                        onDelete={(index) => handleDelete({ list: websites, setList: setWebsites, index: index })}
                        onChange={(e, index) =>
                            handleChange({
                                element: e,
                                index: index,
                                list: websites,
                                selector: '.website-input',
                                template: ['name', 'link'],
                                setList: setWebsites,
                            })
                        }
                        renderItem={(data) => (
                            <>
                                <Form.Control
                                    className="website-input"
                                    type="text"
                                    placeholder="Tên trang web"
                                    defaultValue={data.name}
                                    onBlur={(e) =>
                                        validate(
                                            e.target,
                                            [RULES.IS_REQUIRE],
                                            e.target.value,
                                            '.cv-error',
                                            'Tên trang web',
                                        )
                                    }
                                />
                                <p className={cx('form-error', 'cv-error', 'my-form-hidden')}></p>
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
                        data={skills}
                        onAdd={() =>
                            handleAdd({
                                list: skills,
                                setList: setSkills,
                                model: {
                                    nameSkill: '',
                                    rate: 0.0,
                                    des: '',
                                },
                            })
                        }
                        onDelete={(index) => handleDelete({ list: skills, setList: setSkills, index: index })}
                        onChange={(e, index) =>
                            handleChange({
                                element: e,
                                index: index,
                                list: skills,
                                selector: '.skill-input',
                                template: ['nameSkill', 'rate', 'des'],
                                setList: setSkills,
                            })
                        }
                        renderItem={(data) => (
                            <>
                                <Form.Control
                                    className="skill-input"
                                    type="text"
                                    placeholder="Kỹ năng"
                                    defaultValue={data.nameSkill}
                                    onBlur={(e) =>
                                        validate(e.target, [RULES.IS_REQUIRE], e.target.value, '.cv-error', 'Kỹ năng')
                                    }
                                />
                                <p className={cx('form-error', 'cv-error', 'my-form-hidden')}></p>
                                <input type="hidden" className="skill-input" defaultValue={data.rate} />
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
                        data={educations}
                        onAdd={() =>
                            handleAdd({
                                list: educations,
                                setList: setEducations,
                                model: {
                                    school: '',
                                    major: '',
                                    startDate: '',
                                    isGraduated: 'false',
                                    endDate: '',
                                },
                            })
                        }
                        onDelete={(index) => handleDelete({ list: educations, setList: setEducations, index: index })}
                        onChange={(e, index) =>
                            handleChange({
                                element: e,
                                index: index,
                                list: educations,
                                selector: '.education-input',
                                template: ['school', 'major', 'startDate', 'isGraduated', 'endDate', 'description'],
                                setList: setEducations,
                            })
                        }
                        renderItem={(data) => (
                            <>
                                <Form.Control
                                    className="education-input"
                                    type="text"
                                    placeholder="Tên trường"
                                    defaultValue={data.school}
                                    onBlur={(e) =>
                                        validate(
                                            e.target,
                                            [RULES.IS_REQUIRE],
                                            e.target.value,
                                            '.cv-edu-name-error',
                                            'Tên trường',
                                        )
                                    }
                                />
                                <p className={cx('form-error', 'cv-edu-name-error', 'my-form-hidden')}></p>
                                <Form.Control
                                    className="education-input"
                                    type="text"
                                    placeholder="Chuyên ngành"
                                    defaultValue={data.major}
                                    onBlur={(e) =>
                                        validate(
                                            e.target,
                                            [RULES.IS_REQUIRE],
                                            e.target.value,
                                            '.cv-edu-major-error',
                                            'Chuyên ngành',
                                        )
                                    }
                                />
                                <p className={cx('form-error', 'cv-edu-major-error', 'my-form-hidden')}></p>
                                <Form.Control
                                    className="education-input"
                                    type="date"
                                    placeholder="Ngày bắt đầu"
                                    defaultValue={data?.startDate}
                                    onBlur={(e) =>
                                        validate(
                                            e.target,
                                            [RULES.IS_REQUIRE],
                                            e.target.value,
                                            '.cv-startdate-major-error',
                                            'Ngày bắt đầu',
                                        )
                                    }
                                />
                                <p className={cx('form-error', 'cv-startdate-major-error', 'my-form-hidden')}></p>
                                <Form.Select
                                    className="education-input"
                                    aria-label="Trạng thái"
                                    defaultValue={data.isGraduated}
                                >
                                    <option value="false">Đang trong quá trình học tập</option>
                                    <option value="true">Đã tốt nghiệp</option>
                                </Form.Select>
                                <Form.Control
                                    className="education-input"
                                    type="date"
                                    placeholder="Ngày kết thúc"
                                    defaultValue={data?.endDate}
                                    disabled={data.isGraduated === 'false'}
                                />
                                <Form.Control
                                    className={cx('description', 'education-input')}
                                    as="textarea"
                                    placeholder="Mô tả"
                                    defaultValue={data.description}
                                />
                            </>
                        )}
                    />
                    <GroupInput
                        name="Kinh nghiệm làm việc"
                        data={experiences}
                        onAdd={() =>
                            handleAdd({
                                list: experiences,
                                setList: setExperiences,
                                model: {
                                    titlePosition: '',
                                    companyName: '',
                                    startDate: '',
                                    isCurrent: 'false',
                                    endDate: '',
                                    description: '',
                                },
                            })
                        }
                        onDelete={(index) => handleDelete({ list: experiences, setList: setExperiences, index: index })}
                        onChange={(e, index) =>
                            handleChange({
                                element: e,
                                index: index,
                                list: experiences,
                                selector: '.experience-input',
                                template: [
                                    'titlePosition',
                                    'companyName',
                                    'startDate',
                                    'isCurrent',
                                    'endDate',
                                    'description',
                                ],
                                setList: setExperiences,
                            })
                        }
                        renderItem={(data) => (
                            <>
                                <Form.Control
                                    className="experience-input"
                                    type="text"
                                    placeholder="Vị trí công việc"
                                    defaultValue={data.titlePosition}
                                    onBlur={(e) =>
                                        validate(
                                            e.target,
                                            [RULES.IS_REQUIRE],
                                            e.target.value,
                                            '.cv-position-name-error',
                                            'Vị trí công việc',
                                        )
                                    }
                                />
                                <p className={cx('form-error', 'cv-position-name-error', 'my-form-hidden')}></p>
                                <Form.Control
                                    className="experience-input"
                                    type="text"
                                    placeholder="Tên công ty"
                                    defaultValue={data.companyName}
                                    onBlur={(e) =>
                                        validate(
                                            e.target,
                                            [RULES.IS_REQUIRE],
                                            e.target.value,
                                            '.cv-company-name',
                                            'Tên công ty',
                                        )
                                    }
                                />
                                <p className={cx('form-error', 'cv-company-name', 'my-form-hidden')}></p>
                                <Form.Control
                                    className="experience-input"
                                    type="date"
                                    placeholder="Ngày bắt đầu"
                                    defaultValue={data?.startDate}
                                    onBlur={(e) =>
                                        validate(
                                            e.target,
                                            [RULES.IS_REQUIRE],
                                            e.target.value,
                                            '.cv-experience-startdate',
                                            'Ngày bắt đầu',
                                        )
                                    }
                                />
                                <p className={cx('form-error', 'cv-experience-startdate', 'my-form-hidden')}></p>
                                <Form.Select
                                    className="experience-input"
                                    aria-label="Trạng thái"
                                    defaultValue={data.isCurrent}
                                >
                                    <option value="true">Công việc hiện tại</option>
                                    <option value="false">Công việc đã từng làm</option>
                                </Form.Select>
                                <Form.Control
                                    className="experience-input"
                                    type="date"
                                    placeholder="Ngày kết thúc"
                                    defaultValue={data?.endDate}
                                    disabled={data.isCurrent === 'true'}
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
                        data={certificates}
                        onAdd={() =>
                            handleAdd({
                                list: certificates,
                                setList: setCertificates,
                                model: {
                                    name: '',
                                    linkReference: '',
                                },
                            })
                        }
                        onDelete={(index) =>
                            handleDelete({ list: certificates, setList: setCertificates, index: index })
                        }
                        onChange={(e, index) =>
                            handleChange({
                                element: e,
                                index: index,
                                list: certificates,
                                selector: '.certificate-input',
                                template: ['name', 'linkReference'],
                                setList: setCertificates,
                            })
                        }
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
                                    onBlur={(e) =>
                                        validate(
                                            e.target,
                                            [RULES.IS_REQUIRE],
                                            e.target.value,
                                            '.cv-certificate-name',
                                            'Bằng cấp',
                                        )
                                    }
                                />
                                <p className={cx('form-error', 'cv-certificate-name', 'my-form-hidden')}></p>
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
                <p id="cv-update-error" className={cx('form-error', 'cv-certificate-name', 'my-form-hidden')}></p>
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
