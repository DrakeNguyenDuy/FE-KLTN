import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Modal, Button } from 'react-bootstrap';
import styles from './UpdateProfile.module.scss';
import className from 'classnames/bind';
import Select from 'react-select';
import './UpdateProfile.scss';

import GroupInput from '~/components/common/GroupInput';
import { RULES, validate } from '~/utils/validates/Validate';
import { getCareer } from '~/store/reducers/common/careerSlice';
import { getDistrict } from '~/store/reducers/common/locationSlice';
import { getExperience } from '~/store/reducers/common/experienceSlice';
import { getTypeWork } from '~/store/reducers/common/typeWorkSlice';
import { getPaycycle } from '~/store/reducers/common/paycycleSlice';
import { getSkillId } from '~/store/reducers/common/skillSlice';
import { validateUpdateProfile } from '~/utils/validates/updateProfileModal';

const cx = className.bind(styles);

function UpdateProfileModal({ data, show, handleClose, handleSubmit }) {
    const formRef = useRef();
    const [skills, setSkills] = useState(
        data?.skills
            ? data.skills.map((skill) => ({
                  idSkill: skill.idSkill,
                  skill: { label: skill.nameSkill, value: skill.idSkill },
                  rate: skill.rate,
                  des: skill.des,
              }))
            : [],
    );

    const dispath = useDispatch();
    const skillsList = useSelector((state) => state.skill.skillsId);
    const careers = useSelector((state) => state.career.careers);
    const experiences = useSelector((state) => state.experience.experiences);
    const typeWorks = useSelector((state) => state.typeWork.typeWorks);
    const districts = useSelector((state) => state.location.districts);
    const paycycles = useSelector((state) => state.paycycle.paycycles);
    useEffect(() => {
        dispath(getSkillId());
        dispath(getCareer());
        dispath(getExperience());
        dispath(getTypeWork());
        dispath(getDistrict(1));
        dispath(getPaycycle());
        // eslint-disable-next-line
    }, []);

    const handleUpdate = () => {
        const data = getFormData();
        const validateMessage = validateUpdateProfile(data, '#pf-update-error');
        if (validateMessage) {
            data.districts = [+data.districts];
            data.skills = skills.map((skill) => ({
                idSkill: skill.idSkill + '',
                rate: skill.rate,
                des: skill.des,
            }));
            data.career = data.carrer;
            console.log('data', data);
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

    const getFormData = () => {
        const form = formRef.current;
        return {
            firstName: form['PFFirstName'].value,
            lastName: form['PFLastName'].value,
            gender: form['PFGender'].value,
            englishLevel: form['PFEnglishLV'].value,
            carrer: form['PFCareer'].value,
            experince: form['PFExperience'].value,
            formWork: form['PFWorkType'].value,
            districts: form['PFDistrict'].value,
            payCycle: form['PFPayCircle'].value,
            introduce: form['PFIntroduce'].value,
            goal: form['PFGoal'].value,
            skills,
        };
    };
    return (
        <Modal show={show} onHide={onClose} className="modal-update-profile">
            <Modal.Header closeButton>
                <Modal.Title>Cập nhật Hồ sơ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form ref={formRef}>
                    <Form.Group className="mb-3" controlId="PFLastName">
                        <Form.Label>Họ </Form.Label>
                        {console.log(data)}
                        <Form.Control
                            type="text"
                            placeholder="Nhập họ"
                            defaultValue={data?.lastname}
                            onBlur={(e) => validate(e.target, [RULES.IS_REQUIRE], e.target.value, '.pf-error', 'Họ')}
                        />
                        <p className={cx('form-error', 'pf-error', 'my-form-hidden')}></p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="PFFirstName">
                        <Form.Label>Tên </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập tên"
                            defaultValue={data?.firstname}
                            onBlur={(e) => validate(e.target, [RULES.IS_REQUIRE], e.target.value, '.pf-error', 'Tên')}
                        />
                        <p className={cx('form-error', 'pf-error', 'my-form-hidden')}></p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="PFGender">
                        <Form.Label>Chọn giới tính</Form.Label>
                        <Form.Select
                            aria-label="Chọn giới tính"
                            defaultValue={data?.gender}
                            onBlur={(e) =>
                                validate(e.target, [RULES.IS_REQUIRE], e.target.value, '.pf-error', 'Giới tính')
                            }
                        >
                            <option value="">Chọn giới tính</option>
                            <option value="M">Nam</option>
                            <option value="F">Nữ</option>
                            <option value="O">Khác</option>
                        </Form.Select>
                        <p className={cx('form-error', 'pf-error', 'my-form-hidden')}></p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="PFEnglishLV">
                        <Form.Label>Trình độ tiếng anh</Form.Label>
                        <Form.Select
                            aria-label="Chọn trình độ tiếng anh"
                            defaultValue={data?.englishLevel ? data.englishLevel.code : null}
                            onBlur={(e) =>
                                validate(
                                    e.target,
                                    [RULES.IS_REQUIRE],
                                    e.target.value,
                                    '.pf-error',
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
                        <p className={cx('form-error', 'pf-error', 'my-form-hidden')}></p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="PFCareer">
                        <Form.Label>Chọn ngành nghề</Form.Label>
                        <Form.Select
                            aria-label="Chọn ngành nghề"
                            defaultValue={data?.carreer ? data.carreer.code : null}
                            onBlur={(e) =>
                                validate(e.target, [RULES.IS_REQUIRE], e.target.value, '.pf-error', 'Ngành nghề')
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
                        <p className={cx('form-error', 'pf-error', 'my-form-hidden')}></p>
                    </Form.Group>
                    <GroupInput
                        name="Kỹ năng"
                        data={skills}
                        onAdd={() =>
                            handleAdd({
                                list: skills,
                                setList: setSkills,
                                model: {
                                    idSkill: 0,
                                    skill: null,
                                    rate: 0.0,
                                    des: '',
                                },
                            })
                        }
                        onDelete={(index) => handleDelete({ list: skills, setList: setSkills, index: index })}
                        renderItem={(data, index) => (
                            <>
                                <Select
                                    name="jobSkill"
                                    options={skillsList}
                                    className="basic-multi-select skill-input"
                                    classNamePrefix="select"
                                    value={skills[index].skill}
                                    onChange={(value) => {
                                        const newList = [...skills];
                                        for (let i = 0; i < newList.length; i++) {
                                            if (i === index) {
                                                newList[i].skill = value;
                                                newList[i].idSkill = value.value;
                                                break;
                                            }
                                        }
                                        setSkills(newList);
                                    }}
                                />
                                <Form.Select
                                    aria-label="Đánh giá kỹ năng"
                                    defaultValue={data.rate}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const newList = [...skills];
                                        for (let i = 0; i < newList.length; i++) {
                                            if (i === index) {
                                                newList[i].rate = +value;
                                                break;
                                            }
                                        }
                                        setSkills(newList);
                                    }}
                                    onBlur={(e) =>
                                        validate(
                                            e.target,
                                            [RULES.IS_REQUIRE],
                                            e.target.value,
                                            '.pf-error',
                                            'Đánh giá kỹ năng',
                                        )
                                    }
                                >
                                    <option value="">Đánh giá kỹ năng</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Form.Select>
                                <p className={cx('form-error', 'pf-error', 'my-form-hidden')}></p>
                            </>
                        )}
                    />
                    <Form.Group className="mb-3" controlId="PFExperience">
                        <Form.Label>Chọn kinh nghiệm làm việc</Form.Label>
                        <Form.Select
                            aria-label="Chọn kinh nghiệm làm việc"
                            defaultValue={data?.experience ? data.experience.code : null}
                            onBlur={(e) =>
                                validate(
                                    e.target,
                                    [RULES.IS_REQUIRE],
                                    e.target.value,
                                    '.pf-error',
                                    'Kinh nghiệm làm việc',
                                )
                            }
                        >
                            <option value="">Chọn kinh nghiệm làm việc</option>
                            {experiences.map((experience) => (
                                <option key={experience.id} value={experience.code}>
                                    {experience.name}
                                </option>
                            ))}
                        </Form.Select>
                        <p className={cx('form-error', 'pf-error', 'my-form-hidden')}></p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="PFWorkType">
                        <Form.Label>Chọn hình thức làm việc</Form.Label>
                        <Form.Select
                            aria-label="Chọn hình thức làm việc"
                            defaultValue={data?.formWork ? data.formWork.code : null}
                            onBlur={(e) =>
                                validate(
                                    e.target,
                                    [RULES.IS_REQUIRE],
                                    e.target.value,
                                    '.pf-error',
                                    'Hình thức làm việc',
                                )
                            }
                        >
                            <option value="">Chọn hình thức làm việc</option>
                            {typeWorks.map((typeWork) => (
                                <option key={typeWork.code} value={typeWork.code}>
                                    {typeWork.name}
                                </option>
                            ))}
                        </Form.Select>
                        <p className={cx('form-error', 'pf-error', 'my-form-hidden')}></p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="PFDistrict">
                        <Form.Label>Địa điểm làm việc</Form.Label>
                        <Form.Select
                            aria-label="Chọn địa điểm làm việc"
                            defaultValue={data?.districts ? data.districts[0].id : null}
                            onBlur={(e) =>
                                validate(e.target, [RULES.IS_REQUIRE], e.target.value, '.pf-error', 'Địa điểm làm việc')
                            }
                        >
                            <option value="">Địa điểm làm việc</option>
                            {districts.map((district) => (
                                <option key={district.id} value={district.id}>
                                    {district.name}
                                </option>
                            ))}
                        </Form.Select>
                        <p className={cx('form-error', 'pf-error', 'my-form-hidden')}></p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="PFPayCircle">
                        <Form.Label>Chu kỳ nhận lương</Form.Label>
                        <Form.Select
                            aria-label="Chọn chu kỳ nhận lương"
                            defaultValue={data?.paycycle ? data.paycycle.code : null}
                            onBlur={(e) =>
                                validate(e.target, [RULES.IS_REQUIRE], e.target.value, '.pf-error', 'Chu kỳ nhận lương')
                            }
                        >
                            <option value="">Chu kỳ nhận lương</option>
                            {paycycles.map((paycycle) => (
                                <option key={paycycle.code} value={paycycle.code}>
                                    {paycycle.name}
                                </option>
                            ))}
                        </Form.Select>
                        <p className={cx('form-error', 'pf-error', 'my-form-hidden')}></p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="PFIntroduce">
                        <Form.Label>Giới thiệu bản thân</Form.Label>
                        <Form.Control as="textarea" placeholder="Nhập giới thiệu" defaultValue={data?.introduce} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="PFGoal">
                        <Form.Label>Mục tiêu mong muốn</Form.Label>
                        <Form.Control as="textarea" placeholder="Nhập mục tiêu" defaultValue={data?.goal} />
                    </Form.Group>
                </Form>
                <p id="pf-update-error" className={cx('form-error', 'cv-certificate-name', 'my-form-hidden')}></p>
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
