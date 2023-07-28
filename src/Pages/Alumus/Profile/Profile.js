import Avatar from '~/components/Avatar/Avatar';
import styles from './Profile.module.scss';
import className from 'classnames/bind';
import CustomButton from '~/components/CustomButton/CustomButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faMars, faPen, faVenus } from '@fortawesome/free-solid-svg-icons';
import { Form, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createProfile, getProfile, putUpdateProfile } from '~/store/reducers/profileSlice';
import { useEffect, useRef, useState } from 'react';
import UploadAvatarModal from '~/components/UploadAvatarModal/UploadAvatarModal';
import { postAvatar } from '~/store/reducers/cvSlice';
import UpdateProfileModal from '~/components/UpdateProfileModal/UpdateProfileModal';
import { BASE_URL } from '~/constant';
import Loading from '~/components/Loading/Loading';
import { RULES, validate, validateCreateProfile } from '~/utils/Validate';
import { getSkillId } from '~/store/reducers/skillSlice';
import { getCareer } from '~/store/reducers/careerSlice';
import { getExperience } from '~/store/reducers/experienceSlice';
import { getTypeWork } from '~/store/reducers/typeWorkSlice';
import { getDistrict } from '~/store/reducers/locationSlice';
import { getPaycycle } from '~/store/reducers/paycycleSlice';
import GroupInput from '~/components/GroupInput/GroupInput';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import './Profile.scss';

const cx = className.bind(styles);

function Profile() {
    const formRef = useRef();
    const navigate = useNavigate();
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [skills, setSkills] = useState([]);

    const dispath = useDispatch();
    const profile = useSelector((state) => state.profile.profile);
    const isLoading = useSelector((state) => state.profile.profileIsLoading);
    const careers = useSelector((state) => state.career.careers);
    const experiences = useSelector((state) => state.experience.experiences);
    const typeWorks = useSelector((state) => state.typeWork.typeWorks);
    const districts = useSelector((state) => state.location.districts);
    const paycycles = useSelector((state) => state.paycycle.paycycles);
    const skillsList = useSelector((state) => state.skill.skillsId);

    useEffect(() => {
        dispath(getProfile());

        if (!profile) {
            dispath(getSkillId());
            dispath(getCareer());
            dispath(getExperience());
            dispath(getTypeWork());
            dispath(getDistrict(1));
            dispath(getPaycycle());
        }
        // eslint-disable-next-line
    }, []);

    const handleOpenAvatarModal = () => {
        setShowAvatarModal(true);
    };

    const handleCloseAvatarModal = () => {
        setShowAvatarModal(false);
    };

    const handleSubmitAvatar = (data) => {
        dispath(postAvatar({ data }));
    };

    const handleOpenUpdateModal = () => {
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
    };

    const handleSubmitUpdate = (data) => {
        dispath(putUpdateProfile(data));
    };

    const handleUpdate = () => {
        const data = getFormData();
        const validateMessage = validateCreateProfile(data, '#cpf-update-error');
        if (validateMessage) {
            data.districts = [+data.districts];
            data.carreer = data.carrer;
            delete data.carrer;
            dispath(createProfile(data));
        }
    };

    const handleAdd = ({ list, setList, model }) => {
        setList([...list, model]);
    };
    const handleDelete = ({ list, setList, index }) => setList(list.filter((block, i) => i !== index));

    const getFormData = () => {
        const form = formRef.current;
        return {
            carrer: form['CPFCareer'].value,
            experience: form['CPFExperience'].value,
            englishLevel: form['CPFEnglishLV'].value,
            formWork: form['CPFWorkType'].value,
            paycycle: form['CPFPayCircle'].value,
            districts: form['CPFDistrict'].value,
            skills,
        };
    };

    return (
        <div className="container">
            {isLoading ? (
                <Loading />
            ) : (
                <div className={cx('wrapper')}>
                    {typeof profile !== 'string' && (
                        <>
                            <UploadAvatarModal
                                show={showAvatarModal}
                                handleClose={handleCloseAvatarModal}
                                handleSubmit={handleSubmitAvatar}
                            />

                            <UpdateProfileModal
                                data={profile}
                                show={showUpdateModal}
                                handleClose={handleCloseUpdateModal}
                                handleSubmit={handleSubmitUpdate}
                            />
                        </>
                    )}

                    <div className="row">
                        <div className="col-md-7">
                            {profile ? (
                                <>
                                    <div className={cx('overview')}>
                                        <div className={cx('overview-background')}>
                                            {typeof profile !== 'string' && (
                                                <div className={cx('action')}>
                                                    <CustomButton
                                                        wrapperStyle={cx('btn-update-avatar')}
                                                        onClick={handleOpenAvatarModal}
                                                    >
                                                        <FontAwesomeIcon icon={faCamera} />
                                                    </CustomButton>
                                                    <CustomButton
                                                        wrapperStyle={cx('btn-update-avatar')}
                                                        onClick={handleOpenUpdateModal}
                                                    >
                                                        <FontAwesomeIcon icon={faPen} />
                                                    </CustomButton>
                                                </div>
                                            )}

                                            <Avatar
                                                className={cx('avatar')}
                                                src={
                                                    profile?.avatar
                                                        ? BASE_URL + profile?.avatar
                                                        : 'static/imgs/profile-default-avatar.jpg'
                                                }
                                                base64={false}
                                            />
                                        </div>

                                        <div className={cx('overview-content')}>
                                            <h2 className={cx('full-name')}>
                                                {profile?.fullName}
                                                <span>
                                                    {profile?.gender === 'M' ? (
                                                        <FontAwesomeIcon icon={faMars} color={'blue'} />
                                                    ) : (
                                                        <FontAwesomeIcon icon={faVenus} color={'red'} />
                                                    )}
                                                </span>
                                            </h2>
                                            <p className={cx('career')}>
                                                Lĩnh vực: <span>{profile?.carreer ? profile.carreer.name : null}</span>
                                            </p>
                                            <p className={cx('introduce')}>
                                                Giới thiệu: <span>{profile?.introduce}</span>
                                            </p>
                                            <p className={cx('goal')}>
                                                Mục tiêu: <span>{profile?.goal}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className={cx('content-block')}>
                                        <h2 className={cx('block-title')}>Thông tin cá nhân</h2>
                                        <div className={cx('block-content')}>
                                            <ul>
                                                <li>
                                                    Ngày sinh: <span>{profile?.dob}</span>
                                                </li>
                                                <li>
                                                    Giới tính: <span>{profile?.gender === 'M' ? 'Nam' : 'Nữ'}</span>
                                                </li>
                                                <li>
                                                    Email: <span>{profile?.email}</span>
                                                </li>
                                                <li>
                                                    SĐT: <span>{profile?.phone}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className={cx('content-block')}>
                                        <h2 className={cx('block-title')}>Thông tin hỗ trợ tìm việc</h2>
                                        <div className={cx('block-content')}>
                                            <ul>
                                                <li>
                                                    Trình độ tiếng anh:{' '}
                                                    <span>
                                                        {profile?.englishLevel ? profile.englishLevel.name : null}
                                                    </span>
                                                </li>
                                                <li>
                                                    Kỹ năng:{' '}
                                                    <span>
                                                        {profile?.skills
                                                            ? profile.skills.map((skill, index) =>
                                                                  index === profile?.skills.length - 1
                                                                      ? skill.nameSkill
                                                                      : skill.nameSkill + ', ',
                                                              )
                                                            : null}
                                                    </span>
                                                </li>
                                                <li>
                                                    Kinh ngiệm làm việc:{' '}
                                                    <span>{profile?.experience ? profile.experience.name : null}</span>
                                                </li>
                                                <li>
                                                    Địa điểm làm việc:{' '}
                                                    <span>
                                                        {profile?.districts ? profile.districts[0].name : null}
                                                        {', '}
                                                        {profile?.provinces ? profile.provinces[0].name : null}
                                                    </span>
                                                </li>
                                                <li>
                                                    Hình thức làm việc:{' '}
                                                    <span>{profile?.formWork ? profile.formWork.name : null}</span>
                                                </li>
                                                <li>
                                                    Chu kỳ nhận lương:{' '}
                                                    <span>{profile?.paycycle ? profile.paycycle.name : null}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className={cx('overview')}>
                                    <Form ref={formRef}>
                                        <Form.Group className="mb-3" controlId="CPFCareer">
                                            <Form.Label>Chọn ngành nghề</Form.Label>
                                            <Form.Select
                                                aria-label="Chọn ngành nghề"
                                                onBlur={(e) =>
                                                    validate(
                                                        e.target,
                                                        [RULES.IS_REQUIRE],
                                                        e.target.value,
                                                        '.pf-error',
                                                        'Ngành nghề',
                                                    )
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
                                        <Form.Group className="mb-3" controlId="CPFExperience">
                                            <Form.Label>Chọn kinh nghiệm làm việc</Form.Label>
                                            <Form.Select
                                                aria-label="Chọn kinh nghiệm làm việc"
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
                                        <Form.Group className="mb-3" controlId="CPFEnglishLV">
                                            <Form.Label>Trình độ tiếng anh</Form.Label>
                                            <Form.Select
                                                aria-label="Chọn trình độ tiếng anh"
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
                                                <option value="LV1">Không biết</option>
                                                <option value="LV2">Đọc hiểu cơ bản</option>
                                                <option value="LV3">Giao tiếp tốt</option>
                                                <option value="LV4">Thành thạo các kỹ năng</option>
                                            </Form.Select>
                                            <p className={cx('form-error', 'pf-error', 'my-form-hidden')}></p>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="CPFWorkType">
                                            <Form.Label>Chọn hình thức làm việc</Form.Label>
                                            <Form.Select
                                                aria-label="Chọn hình thức làm việc"
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
                                        <Form.Group className="mb-3" controlId="CPFPayCircle">
                                            <Form.Label>Chu kỳ nhận lương</Form.Label>
                                            <Form.Select
                                                aria-label="Chọn chu kỳ nhận lương"
                                                onBlur={(e) =>
                                                    validate(
                                                        e.target,
                                                        [RULES.IS_REQUIRE],
                                                        e.target.value,
                                                        '.pf-error',
                                                        'Chu kỳ nhận lương',
                                                    )
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
                                        <Form.Group className="mb-3" controlId="CPFDistrict">
                                            <Form.Label>Địa điểm làm việc</Form.Label>
                                            <Form.Select
                                                aria-label="Chọn địa điểm làm việc"
                                                onBlur={(e) =>
                                                    validate(
                                                        e.target,
                                                        [RULES.IS_REQUIRE],
                                                        e.target.value,
                                                        '.pf-error',
                                                        'Địa điểm làm việc',
                                                    )
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
                                            onDelete={(index) =>
                                                handleDelete({ list: skills, setList: setSkills, index: index })
                                            }
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
                                                        aria-label="Mức độ thông thạo kỹ năng"
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
                                                            console.log(newList);
                                                            setSkills(newList);
                                                        }}
                                                        onBlur={(e) =>
                                                            validate(
                                                                e.target,
                                                                [RULES.IS_REQUIRE],
                                                                e.target.value,
                                                                '.pf-error',
                                                                'Mức độ ưu tiên kỹ năng',
                                                            )
                                                        }
                                                    >
                                                        <option value="">Mức độ ưu tiên gợi ý cho kỹ năng này</option>
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
                                    </Form>
                                    <p id="cpf-update-error" className={cx('form-error', 'my-form-hidden')}></p>
                                </div>
                            )}
                        </div>

                        <div className="col-md-5">
                            <div className={cx('description')}>
                                <div className={cx('description-img')}>
                                    <Image src="/static/imgs/vieclam.png" alt="vieclam" />
                                </div>
                                <div className={cx('description-content')}>
                                    <p>
                                        * Hệ thống dựa vào những thông tin trên hồ sơ để gợi ý cho bạn những công việc
                                        phù hợp.
                                    </p>
                                    <p>* Hãy cập nhật đầy đủ thông tin hồ sơ của bạn để:</p>
                                    <ul>
                                        <li>Tìm được những công việc ưng ý nhất.</li>
                                        <li>Nhà tuyển dụng sẽ tìm đến bạn thông qua thông tin trên hồ sơ.</li>
                                    </ul>
                                    {!profile && (
                                        <p>
                                            Hãy điền đầy đủ thông tin bên phải sau đó ấn nút tạo hồ sơ bên dưới để hoàn
                                            tất quá trình.
                                        </p>
                                    )}
                                    <div className={cx('group-btns')}>
                                        {profile ? (
                                            <CustomButton onClick={handleOpenUpdateModal}>Cập nhật</CustomButton>
                                        ) : (
                                            <>
                                                <CustomButton onClick={() => navigate('/jobs')}>
                                                    Để sau tìm việc ngay
                                                </CustomButton>
                                                <CustomButton onClick={handleUpdate}>Tạo hồ sơ</CustomButton>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
