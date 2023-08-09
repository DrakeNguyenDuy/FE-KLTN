import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './JobDetail.module.scss';
import className from 'classnames/bind';
import { Button, Image, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBriefcase,
    faChain,
    faEnvelopeCircleCheck,
    faFlask,
    faHeart,
    faMedal,
    faMoneyBill1Wave,
    faPaperPlane,
    faPeopleGroup,
    faPersonHalfDress,
    faThumbsDown,
} from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import './JobDetail.scss';
import 'react-toastify/dist/ReactToastify.css';

import CustomBreadCrumb from '~/components/common/CustomBreadCrumb';
import CustomButton from '~/components/common/CustomButton';
import InforItem from '~/components/common/InfoItem';
import Loading from '~/components/common/Loading';
import RequireLogin from '~/components/common/RequireLogin';
import { getJobDetail, postLikeJob } from '~/store/reducers/common/jobSlice';
import { postApplyJob } from '~/store/reducers/recruitmentSlice';
import { getCVWithToken } from '~/store/reducers/cvSlice';
import { BASE_URL } from '~/constant';

const cx = className.bind(styles);

function JobDetails() {
    const navigate = useNavigate();
    const dispath = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [showRequireLogin, setShowRequireLogin] = useState(false);

    const jobDetails = useSelector((state) => state.job.jobDetails);
    const jobDetailIsLoading = useSelector((state) => state.job.jobDetailIsLoading);
    const followStatus = useSelector((state) => state.job.follow);
    const applyStatus = useSelector((state) => state.recruitment.apply);
    const user = useSelector((state) => state.alumusAuth.user);
    const cv = useSelector((state) => state.cv.cv);
    const cvLoading = useSelector((state) => state.cv.isLoading);

    const { id } = useParams();
    const breadcrumbItems = [
        { name: 'Trang chủ', href: '/' },
        { name: 'Việc làm', href: '/jobs' },
        { name: jobDetails?.name, href: '/job/' + jobDetails?.sku },
    ];

    useEffect(() => {
        dispath(getCVWithToken());
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        dispath(getJobDetail({ id, type: 'alumus' }));
        // eslint-disable-next-line
    }, [followStatus, applyStatus]);

    const convertFormatDate = (dateString) => {
        if (dateString && dateString.includes('-')) {
            const parts = dateString.split('-');
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        } else return dateString;
    };

    const handleOpenModal = () => {
        if (cv && cv !== -1) {
            setShowModal(true);
        } else {
            notifyCreateProfile();
        }
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleUpdate = () => {
        dispath(postApplyJob(jobDetails.sku));
        notify();
        handleCloseModal();
    };

    const notify = () => toast('Đã ứng tuyển thành công!');
    const notifyCreateProfile = () =>
        toast(
            <p>
                Bạn hãy cập nhật cv để có thể ứng tuyển công việc.
                <br />
                <span
                    onClick={() => navigate('/cv')}
                    style={{ marginTop: '8px', color: 'blue', textDecoration: 'underline' }}
                >
                    Cập nhật ngay
                </span>
            </p>,
        );

    const handleLikeJob = (e) => {
        e.stopPropagation();
        if (user) {
            dispath(postLikeJob({ codeJob: jobDetails.sku, isFollow: false }));
        } else {
            setShowRequireLogin(true);
        }
    };

    return jobDetailIsLoading && cvLoading ? (
        <Loading />
    ) : (
        <div className={cx('wrapper')}>
            <RequireLogin
                show={showRequireLogin}
                message={'Vui lòng đăng nhập để theo dõi công việc!'}
                onClose={() => setShowRequireLogin(false)}
            />
            <ToastContainer />
            <Modal show={showModal} onHide={handleCloseModal} className="modal-apply-job">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h2>Ứng tuyển</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('apply-modal')}>
                        <p>
                            Họ tên: <span>{user?.fullName}</span>
                        </p>
                        <p>
                            Công ty: <span>{jobDetails?.merchantStore.storeName}</span>
                        </p>
                        <p>
                            Công việc: <span>{jobDetails?.name}</span>
                        </p>
                        <p>
                            Vị trí ứng tuyển: <span>{jobDetails?.positions[0].name}</span>
                        </p>
                        <p>
                            Link cv:{' '}
                            <span>
                                <a href={`/full-cv/${cv?.id}`} target="_blank" rel="noreferrer">
                                    <FontAwesomeIcon icon={faChain} /> CV của bạn
                                </a>
                            </span>
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Nộp CV
                    </Button>
                </Modal.Footer>
            </Modal>
            <CustomBreadCrumb items={breadcrumbItems} className={cx('breadcrumb')} />
            <section>
                <div className="session-title">Công việc</div>
                <div className={cx('job-overview')}>
                    <div className={cx('avatar-company')}>
                        <Image
                            fluid
                            className="d-block w-100"
                            // src={'/static/imgs/logo-banner.png'}
                            // alt={'/static/imgs/carousel_1.jpg'}
                            src={BASE_URL + jobDetails?.logo}
                            // src={jobDetails?.logo}
                        />
                    </div>
                    <div className={cx('overview-description')}>
                        {/* <h2 className={cx('job-title')}>Thực tập sinh IT</h2> */}
                        <h2 className={cx('job-title')}>{jobDetails?.name}</h2>
                        {/* <h3 className={cx('company-name')}>Công ty TNHH Công nghệ Snetel</h3> */}
                        <h3 className={cx('company-name')}>{jobDetails?.merchantStore.storeName}</h3>
                        {/* <p className={cx('exprire-date')}>Hạn nộp hồ sơ: 30/06/2023</p> */}
                        <p className={cx('exprire-date')}>
                            Hạn nộp hồ sơ: {convertFormatDate(jobDetails?.dateExperience)}
                        </p>
                        {/* <p className={cx('address')}>
                        Địa chỉ: Hồ Chí Minh: 156A Trần Quang Khải, Quận 1, TP. HCM, Quận 1
                    </p> */}
                        <p className={cx('address')}>
                            Địa chỉ:{' '}
                            {jobDetails?.locations[0].detailAddress
                                ? jobDetails?.locations[0].detailAddress + ', '
                                : '' +
                                  jobDetails?.locations[0].ward +
                                  ', ' +
                                  jobDetails?.locations[0].district +
                                  ', ' +
                                  jobDetails?.locations[0].province}
                        </p>
                    </div>
                    <div className={cx('button-group')}>
                        {/* {console.log(jobDetails)}
                        <CustomButton
                            wrapperStyle={cx('btn-follow')}
                            onClick={() => dispath(postLikeJob(jobDetails?.sku))}
                        >
                            <FontAwesomeIcon icon={jobDetails?.follow ? faThumbsDown : faHeart} />{' '}
                            {jobDetails?.follow ? 'Bỏ theo dõi' : 'Theo dõi'}
                        </CustomButton> */}
                        {jobDetails?.applied ? (
                            <CustomButton
                                onClick={(e) => e.stopPropagation()}
                                wrapperStyle={cx('btn-wrapper', 'btn-apply')}
                            >
                                <FontAwesomeIcon icon={faEnvelopeCircleCheck} /> Đã ứng tuyển
                            </CustomButton>
                        ) : jobDetails?.follow ? (
                            <CustomButton onClick={handleLikeJob} wrapperStyle={cx('btn-wrapper', 'btn-unfollow')}>
                                <FontAwesomeIcon icon={faThumbsDown} /> {'Bỏ theo dõi'}
                            </CustomButton>
                        ) : (
                            <CustomButton onClick={handleLikeJob} wrapperStyle={cx('btn-wrapper', 'btn-follow')}>
                                <FontAwesomeIcon icon={faHeart} /> {'Theo dõi'}
                            </CustomButton>
                        )}

                        {!jobDetails?.applied && (
                            <CustomButton wrapperStyle={cx('btn-wrapper')} onClick={handleOpenModal}>
                                <FontAwesomeIcon icon={faPaperPlane} /> Ứng tuyển ngay
                            </CustomButton>
                        )}
                    </div>
                </div>
            </section>
            <section>
                <div className="session-title">Thông tin chung</div>
                <div className={cx('job-infor')}>
                    <div className={cx('items-row')}>
                        <InforItem
                            icon={faMoneyBill1Wave}
                            title="Mức lương"
                            content={`${jobDetails?.price} VNĐ/${jobDetails?.paycycles}`}
                        />
                        <InforItem
                            icon={faBriefcase}
                            title="Hình thức làm việc"
                            content={jobDetails?.categories[0].code}
                        />
                        <InforItem icon={faMedal} title="Vị trí" content={jobDetails?.positions[0].name} />
                    </div>
                    <div className={cx('items-row')}>
                        <InforItem icon={faPersonHalfDress} title="Giới tính" content={jobDetails?.gender} />
                        <InforItem icon={faFlask} title="Kinh nghiệm" content={jobDetails?.experience.name} />
                        <InforItem
                            icon={faPeopleGroup}
                            title="Số lượng tuyển dụng"
                            content={`${jobDetails?.quantity} người`}
                        />
                    </div>
                </div>
            </section>
            <section>
                <div className="session-title">Chi tiết công việc</div>
                <div className="job-details">
                    <ReactQuill theme="snow" value={jobDetails?.description} readOnly={true} />
                </div>
                {/* <CustomButton wrapperStyle={cx('btn-apply')}>Ứng tuyển ngay</CustomButton> */}
            </section>
        </div>
    );
}

export default JobDetails;
