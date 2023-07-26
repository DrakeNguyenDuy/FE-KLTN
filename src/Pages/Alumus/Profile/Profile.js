import Avatar from '~/components/Avatar/Avatar';
import styles from './Profile.module.scss';
import className from 'classnames/bind';
import CustomButton from '~/components/CustomButton/CustomButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faMars, faPen, faVenus } from '@fortawesome/free-solid-svg-icons';
import { Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, putUpdateProfile } from '~/store/reducers/profileSlice';
import { useEffect, useState } from 'react';
import UploadAvatarModal from '~/components/UploadAvatarModal/UploadAvatarModal';
import { postAvatar } from '~/store/reducers/cvSlice';
import UpdateProfileModal from '~/components/UpdateProfileModal/UpdateProfileModal';
import { BASE_URL } from '~/constant';
import Loading from '~/components/Loading/Loading';

const cx = className.bind(styles);

function Profile() {
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const dispath = useDispatch();

    const profile = useSelector((state) => state.profile.profile);
    const isLoading = useSelector((state) => state.profile.profileIsLoading);

    const handleOpenAvatarModal = () => {
        setShowAvatarModal(true);
    };

    const handleCloseAvatarModal = () => {
        setShowAvatarModal(false);
    };

    const handleSubmitAvatar = (data) => {
        dispath(postAvatar({ data }));
        window.location.reload();
    };

    const handleOpenUpdateModal = () => {
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
    };

    const handleSubmitUpdate = (data) => {
        dispath(putUpdateProfile(data));
        window.location.reload();
    };

    useEffect(() => {
        dispath(getProfile());
        // eslint-disable-next-line
    }, []);
    return (
        <div className="container">
            {isLoading ? (
                <Loading />
            ) : (
                <div className={cx('wrapper')}>
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
                    <div className="row">
                        <div className="col-md-7">
                            <div className={cx('overview')}>
                                <div
                                    className={cx('overview-background')}
                                    // style={{ backgroundImage: 'url(/static/imgs/carousel_1.jpg)' }}
                                >
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
                                    <Avatar className={cx('avatar')} src={BASE_URL + profile?.avatar} base64={false} />
                                    {/* <Avatar
                                    className={cx('avatar')}
                                    src={profile?.avatar}
                                    base64={true}
                                    name={profile?.fullName}
                                /> */}
                                </div>
                                <div className={cx('overview-content')}>
                                    <h2 className={cx('full-name')}>
                                        {/* Lương Hữu Luân{' '} */}
                                        {profile?.fullName}
                                        <span>
                                            {profile?.gender === 'M' ? (
                                                <FontAwesomeIcon icon={faMars} color={'blue'} />
                                            ) : (
                                                <FontAwesomeIcon icon={faVenus} color={'red'} />
                                            )}
                                            {/* <FontAwesomeIcon icon={faMars} color={'blue'} /> */}
                                            {/* <FontAwesomeIcon icon={faVenus} color={'red'} /> */}
                                            {/* <FontAwesomeIcon icon={faVenusMars} color={'#8975ea'} /> */}
                                        </span>
                                    </h2>
                                    {/* <p className={cx('career')}>Thực tập sinh IT</p> */}
                                    <p className={cx('career')}>
                                        Lĩnh vực: <span>{profile?.carreer ? profile.carreer.name : null}</span>
                                    </p>
                                    {/* <p className={cx('introduce')}>- Giới thiệu: Tôi muốn kiếm 30 triệu mỗi ngày</p> */}
                                    <p className={cx('introduce')}>
                                        Giới thiệu: <span>{profile?.introduce}</span>
                                    </p>
                                    {/* <p className={cx('goal')}>- Mục tiêu: Tôi sẽ đi ăn cướp</p> */}
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
                                            <span>{profile?.englishLevel ? profile.englishLevel.name : null}</span>
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
                        </div>
                        <div className="col-md-5">
                            <div className={cx('description')}>
                                <div className={cx('description-img')}>
                                    <Image src="/static/imgs/vieclam.png" alt="vieclam" />
                                </div>
                                <div className={cx('description-content')}>
                                    <p>* Hãy cập nhật đầy đủ thông tin của bạn để:</p>
                                    <ul>
                                        <li>Tìm được những công việc ưng ý nhất.</li>
                                        <li>Nhà tuyển dụng sẽ tìm đến bạn thông qua thông tin trên profile.</li>
                                    </ul>
                                    <CustomButton onClick={handleOpenUpdateModal}>Cập nhật ngay</CustomButton>
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
