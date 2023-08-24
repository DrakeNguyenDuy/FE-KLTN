import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Profile.module.scss';
import className from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import Avatar from '~/components/common/Avatar';
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
import NoResult from '~/components/common/NoResult/NoResult';

const cx = className.bind(styles);

function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [valIntroduce, setValIntroduce] = useState('');
    const introduceRef = useRef(null);

    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [showBackgroundModal, setShowBackgroundModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const user = useSelector((state) => state.employerAuth.user);
    const isLoading = useSelector((state) => state.employer.isLoading);
    const uploadAvtIsLoading = useSelector((state) => state.employerProfile.uploadAvtLoading);
    const uploadBgIsLoading = useSelector((state) => state.employerProfile.uploadBgLoading);
    const uploadProfileLoading = useSelector((state) => state.employerProfile.uploadProfileLoading);
    const employerDetails = useSelector((state) => state.employer.employerDetails);

    useEffect(() => {
        user && dispatch(getEmployerDetail(user?.code));

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (employerDetails) {
            setValIntroduce(employerDetails?.description);
        }
        resizeTextArea();
        // eslint-disable-next-line
    }, [valIntroduce, employerDetails]);

    const resizeTextArea = () => {
        if (!isLoading && !uploadBgIsLoading && !uploadProfileLoading && !uploadAvtIsLoading && valIntroduce) {
            introduceRef.current.style.height = introduceRef.current.scrollHeight + 'px';
        }
    };

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
                                    Quy mô:{' '}
                                    {employerDetails?.numOfEmployee ? (
                                        <span>{employerDetails?.numOfEmployee} nhân viên</span>
                                    ) : (
                                        <span>Chưa cập nhật</span>
                                    )}
                                    <br />
                                    Địa chỉ:{' '}
                                    {employerDetails?.address ? (
                                        <span>{employerDetails?.address}</span>
                                    ) : (
                                        <span>Chưa cập nhật</span>
                                    )}
                                    {/* <br />
                                    Liên hệ:{' '}
                                    {employerDetails?.phoneNumber ? (
                                        <span>SĐT: {employerDetails?.phoneNumber}</span>
                                    ) : (
                                        <span>Chưa cập nhật</span>
                                    )} */}
                                </p>
                                <div className={cx('introduce')}>
                                    <p>Giới thiệu về công ty:</p>
                                    <textarea
                                        disabled
                                        value={valIntroduce ? valIntroduce : 'Chưa cập nhật'}
                                        ref={introduceRef}
                                    ></textarea>
                                </div>
                                {/* <p className={cx('introduce')}>
                                    Giới thiệu về công ty:{' '}
                                    {employerDetails?.description ? (
                                        <span>{employerDetails?.description}</span>
                                    ) : (
                                        <span>Chưa cập nhật</span>
                                    )}
                                </p> */}
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
                                            seeDetails={true}
                                            onClick={() => navigate(`/job/${job.sku}`)}
                                        />
                                    ))
                                ) : (
                                    <NoResult message="Chưa có công việc nào" />
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
