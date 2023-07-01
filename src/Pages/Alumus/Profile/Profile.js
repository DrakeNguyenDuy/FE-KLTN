import Avatar from '~/components/Avatar/Avatar';
import styles from './Profile.module.scss';
import className from 'classnames/bind';
import CustomButton from '~/components/CustomButton/CustomButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faMars, faPen, faVenus } from '@fortawesome/free-solid-svg-icons';
import { Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '~/store/reducers/profileSlice';
import { useEffect, useState } from 'react';
import UploadAvatarModal from '~/components/UploadAvatarModal/UploadAvatarModal';
import { postAvatar } from '~/store/reducers/cvSlice';
import UpdateProfileModal from '~/components/UpdateProfileModal/UpdateProfileModal';

const cx = className.bind(styles);

function Profile() {
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const dispath = useDispatch();

    const token = useSelector((state) => state.auth.token);
    const profile = useSelector((state) => state.profile.profile);

    const handleOpenAvatarModal = () => {
        setShowAvatarModal(true);
    };

    const handleCloseAvatarModal = () => {
        setShowAvatarModal(false);
    };

    const handleSubmitAvatar = (data) => {
        dispath(postAvatar({ token, data }));
    };

    const handleOpenUpdateModal = () => {
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
    };

    const handleSubmitUpdate = (data) => {};

    useEffect(() => {
        if (token) {
            dispath(getProfile(token));
        }
        // eslint-disable-next-line
    }, [token]);
    return (
        <div className="container">
            <div className={cx('wrapper')}>
                <UploadAvatarModal
                    show={showAvatarModal}
                    handleClose={handleCloseAvatarModal}
                    handleSubmit={handleSubmitAvatar}
                />
                <UpdateProfileModal
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
                                <Avatar className={cx('avatar')} src={'/static/imgs/logo-banner.png'} base64={false} />
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
                                <p className={cx('career')}>{profile?.carreer.name}</p>
                                {/* <p className={cx('introduce')}>- Giới thiệu: Tôi muốn kiếm 30 triệu mỗi ngày</p> */}
                                <p className={cx('introduce')}>{profile?.introduce}</p>
                                {/* <p className={cx('goal')}>- Mục tiêu: Tôi sẽ đi ăn cướp</p> */}
                                <p className={cx('goal')}>{profile?.goal}</p>
                            </div>
                        </div>
                        <div className={cx('content-block')}>
                            <h2 className={cx('block-title')}>Thông tin cá nhân</h2>
                            <div className={cx('block-content')}>
                                <ul>
                                    <li>Ngày sinh: 27/07/2001</li>
                                    <li>Giới tính: Nam</li>
                                    <li>Email: luongluanmpt@gmail.com</li>
                                    <li>SĐT: 0914067629</li>
                                </ul>
                            </div>
                        </div>
                        <div className={cx('content-block')}>
                            <h2 className={cx('block-title')}>Ngoại ngữ</h2>
                            <div className={cx('block-content')}>
                                <ul>
                                    <li>Tiếng anh - Lv: đọc hiểu cơ bản</li>
                                </ul>
                            </div>
                        </div>
                        <div className={cx('content-block')}>
                            <h2 className={cx('block-title')}>Kỹ năng</h2>
                            <div className={cx('block-content')}>
                                <ul>
                                    <li>Java</li>
                                    <li>HTML</li>
                                    <li>CSS</li>
                                    <li>JavaScript</li>
                                </ul>
                            </div>
                        </div>
                        <div className={cx('content-block')}>
                            <h2 className={cx('block-title')}>Kinh nghiệm</h2>
                            <div className={cx('block-content')}>
                                <ul>
                                    <li>
                                        <h4>Thực tập IT - Công ty xxxxx(20/8/2023 - 20/12/2023)</h4>
                                        <p>Tôi ngồi chơi suốt 6 tháng</p>
                                    </li>
                                    <li>Thực tập IT - Công ty yyyyy(20/8/2023 - 20/12/2023)</li>
                                    <li>Thực tập IT - Công ty zzzzz(20/8/2023 - 20/12/2023)</li>
                                </ul>
                            </div>
                        </div>
                        <div className={cx('content-block')}>
                            <h2 className={cx('block-title')}>Mong muốn về công việc cần tìm</h2>
                            <div className={cx('block-content')}>
                                <ul>
                                    <li>Địa điểm làm việc: Tp.HCM</li>
                                    <li>Hình thức làm việc: remote</li>
                                    <li>Chu kỳ nhận lương: tháng</li>
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
                                <CustomButton>Cập nhật ngay</CustomButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;