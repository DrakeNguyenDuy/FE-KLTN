import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Profile.module.scss';
import className from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import Avatar from '~/components/common/Avatar';
import CustomBreadCrumb from '~/components/common/CustomBreadCrumb/CustomBreadCrumb';
import JobItem from '~/components/common/JobItem/JobItem';
import { BASE_URL } from '~/constant';
import { getEmployerDetail } from '~/store/reducers/common/employerSlice';
import { faCamera, faPen } from '@fortawesome/free-solid-svg-icons';
import CustomButton from '~/components/common/CustomButton/CustomButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UploadAvatarModal from '~/components/common/UploadAvatarModal/UploadAvatarModal';
import Loading from '~/components/common/Loading/Loading';
import {
    postAvatarEmployer,
    postBackgroundEmployer,
    updateProfileEmployer,
} from '~/store/reducers/employer/employerProfileSlice';
import UpdateProfileEmployerModal from '~/components/employer/UploadProfileEmployerModal/UpdateProfileEmployerModal';
import UploadBackgroundEmployer from '~/components/employer/UploadBackgroundEmployer/UploadBackgroundEmployer';
import NotLogin from '~/components/common/NotLogin/NotLogin';

const cx = className.bind(styles);

function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [showBackgroundModal, setShowBackgroundModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const user = useSelector((state) => state.employerAuth.user);
    const isLoading = useSelector((state) => state.employer.isLoading);
    const uploadAvtIsLoading = useSelector((state) => state.employerProfile.uploadAvtLoading);
    const uploadBgIsLoading = useSelector((state) => state.employerProfile.uploadBgLoading);
    const uploadProfileLoading = useSelector((state) => state.employerProfile.uploadProfileLoading);
    const employerDetails = useSelector((state) => state.employer.employerDetails);

    const breadcrumbItems = [
        { name: 'Trang chủ', href: '/' },
        { name: employerDetails?.name, href: '/' },
    ];
    useEffect(() => {
        user && dispatch(getEmployerDetail(user?.code));
        // eslint-disable-next-line
    }, []);

    const handleOpenAvatarModal = () => {
        setShowAvatarModal(true);
    };

    const handleOpenBackgroundModal = () => {
        setShowBackgroundModal(true);
    };

    const handleCloseAvatarModal = () => {
        setShowAvatarModal(false);
    };

    const handleCloseBackgroundModal = () => {
        setShowBackgroundModal(false);
    };

    const handleSubmitAvatar = (data) => {
        dispatch(postAvatarEmployer({ code: user?.code, data }));
    };

    const handleSubmitBackground = (data) => {
        dispatch(postBackgroundEmployer({ code: user?.code, data }));
    };

    const handleOpenUpdateModal = () => {
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
    };

    const handleSubmitUpdate = (data) => {
        dispatch(updateProfileEmployer({ code: user?.code, data }));
    };

    return isLoading || uploadBgIsLoading || uploadProfileLoading || uploadAvtIsLoading ? (
        <Loading />
    ) : user ? (
        <div className="container">
            <>
                <UploadAvatarModal
                    show={showAvatarModal}
                    handleClose={handleCloseAvatarModal}
                    handleSubmit={handleSubmitAvatar}
                />
                <UploadBackgroundEmployer
                    show={showBackgroundModal}
                    data={employerDetails}
                    handleClose={handleCloseBackgroundModal}
                    handleSubmit={handleSubmitBackground}
                />
                <UpdateProfileEmployerModal
                    data={employerDetails}
                    show={showUpdateModal}
                    handleClose={handleCloseUpdateModal}
                    handleSubmit={handleSubmitUpdate}
                />
            </>
            {/* <CustomBreadCrumb items={breadcrumbItems} className={cx('breadcrumb')} /> */}
            <div className={cx('wrapper')}>
                <div className="row">
                    <div className="col-md-12">
                        <div className={cx('overview')}>
                            <div
                                className={cx('overview-background')}
                                style={{
                                    backgroundImage: employerDetails?.background
                                        ? `url(${BASE_URL + employerDetails?.background})`
                                        : null,
                                }}
                            >
                                <Avatar
                                    className={cx('avatar')}
                                    src={
                                        employerDetails?.logo
                                            ? BASE_URL + employerDetails?.logo
                                            : '/static/imgs/profile-default-avatar.jpg'
                                    }
                                    base64={false}
                                />

                                <div className={cx('actions')}>
                                    <CustomButton
                                        wrapperStyle={cx('btn-update-avatar')}
                                        onClick={handleOpenAvatarModal}
                                    >
                                        <FontAwesomeIcon icon={faCamera} />
                                        Cập nhật logo công ty
                                    </CustomButton>
                                    <CustomButton
                                        wrapperStyle={cx('btn-update-avatar')}
                                        onClick={handleOpenBackgroundModal}
                                    >
                                        <FontAwesomeIcon icon={faCamera} />
                                        Cập nhật ảnh nền công ty
                                    </CustomButton>
                                    <CustomButton
                                        wrapperStyle={cx('btn-update-avatar')}
                                        onClick={handleOpenUpdateModal}
                                    >
                                        <FontAwesomeIcon icon={faPen} />
                                        Cập nhật thông tin công ty
                                    </CustomButton>
                                </div>
                            </div>

                            <div className={cx('overview-content')}>
                                <h2 className={cx('full-name')}>{employerDetails?.name}</h2>
                                <p className={cx('slogan')}>{employerDetails?.sologan}</p>
                                <p className={cx('infor')}>
                                    Quy mô: <span>{employerDetails?.numOfEmployee} nhân viên</span>
                                    <br />
                                    Địa chỉ: <span>{employerDetails?.address}</span>
                                    <br />
                                    Liên hệ: <span>SĐT: {employerDetails?.phoneNumber}</span>
                                </p>
                                <p className={cx('introduce')}>
                                    Giới thiệu về công ty: <span>{employerDetails?.description}</span>
                                </p>
                            </div>
                        </div>
                        <div className={cx('content-block')}>
                            <h2 className={cx('block-title')}>Danh sách công việc</h2>
                            <div className={cx('jobs')}>
                                {employerDetails?.jobs && employerDetails?.jobs.length !== 0 ? (
                                    employerDetails?.jobs.map((job) => (
                                        <JobItem
                                            key={job.id}
                                            big={true}
                                            data={job}
                                            onClick={() => navigate(`/job/${job.sku}`)}
                                        />
                                    ))
                                ) : (
                                    <div className={cx('job-not-found')}>Không tìm thấy</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <NotLogin nagivateLink={'/employer/login'} />
    );
}

export default Profile;
