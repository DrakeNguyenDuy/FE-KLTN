import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './JobManageItem.module.scss';
import className from 'classnames/bind';
import { Button, Image, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faEye, faPen, faPeopleGroup, faPlay, faStop, faTrash } from '@fortawesome/free-solid-svg-icons';
import './JobManageItem.scss';

import CustomButton from '~/components/common/CustomButton';
import { formatDateString } from '~/utils/Format';
import { BASE_URL } from '~/constant';
import ButtonPopper from '~/components/common/ButtonPopper/ButtonPopper';
import JobDetailContent from '~/components/common/JobDetailContent/JobDetailContent';
import { deleteJob, putchangeStatusJob } from '~/store/reducers/employer/employerManageJobSlice';
import Cadidate from '~/components/common/Cadidate/Cadidate';
import { useNavigate } from 'react-router-dom';
import PostJob from '~/Pages/Employer/PostJob/PostJob';
import PostJobWrapper from '~/Pages/Employer/PostJob/PostJobWrapper';
import RecommendAlumnus from '../RecommendAlumnus/RecommnedAlumnus';

const cx = className.bind(styles);

function JobManageItem({ data, userCode }) {
    const dispath = useDispatch();
    const navigate = useNavigate();
    const [status, setStatus] = useState(data?.status);
    const [showModal, setShowModal] = useState(false);
    const [showCandidateModal, setShowCandidateModal] = useState(false);
    const [showUpdateJob, setShowUpdateJob] = useState(false);
    const [showRecommendModal, setShowRecommendModal] = useState(false);
    const updateStatus = useSelector((state) => state.employerManageJob.updateStatus);

    useEffect(() => {
        updateStatus &&
            updateStatus?.status === true &&
            updateStatus?.codeJob === data.sku &&
            setStatus(updateStatus?.changeStatus);
        // eslint-disable-next-line
    }, [updateStatus]);

    const handleShowDetail = () => {
        setShowModal(true);
    };
    const handleCloseDetail = () => {
        setShowModal(false);
    };

    const handleShowCandidate = () => {
        setShowCandidateModal(true);
    };
    const handleCloseCandidate = () => {
        setShowCandidateModal(false);
    };

    const handleShowUpdateJob = () => {
        setShowUpdateJob(true);
    };
    const handleCloseUpdateJob = () => {
        setShowUpdateJob(false);
    };

    const handleOpenRecommned = () => {
        setShowRecommendModal(true);
    };
    const handleCloseRecommned = () => {
        setShowRecommendModal(false);
    };

    const handleChangeStatus = (status) => {
        dispath(putchangeStatusJob({ code: data.sku, status }));
    };
    const handleDeleteJob = () => {
        dispath(deleteJob({ id: data.id, code: userCode }));
    };
    const handleCopy = () => {
        navigate('/employer/manage-job/post-job?copy=' + data.sku);
    };
    return (
        <>
            {/* Modal chi tiết công việc */}
            <Modal show={showModal} onHide={handleCloseDetail} className="manage-detail-job">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h2>Chi tiết công việc</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <JobDetailContent code={data.sku} hideBreadcrumb={false} hideButton={false} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDetail}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Modal ứng viên */}
            <Modal show={showCandidateModal} onHide={handleCloseCandidate} className="manage-detail-job">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h2>Danh sách ứng viên</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Cadidate code={data.sku} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCandidate}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Modal update Công việc */}
            <Modal show={showUpdateJob} onHide={handleCloseUpdateJob} className={cx('manage-detail-job', 'update-job')}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h2>Cập nhật công việc</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PostJobWrapper id={data.sku} updateCallBack={handleCloseUpdateJob} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUpdateJob}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Modal đề xuất ứng viên */}
            <Modal show={showRecommendModal} onHide={handleCloseRecommned} className="manage-detail-job">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h2>Đề xuất ứng viên</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <RecommendAlumnus code={data.sku} />
                        {/* {jobRecommned.map((job) => (
                                <JobItem
                                    key={job.id}
                                    big={true}
                                    data={job}
                                    user={user}
                                    onClick={() => navigate(`/job/${job.sku}`)}
                                />
                            ))} */}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseRecommned}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className={cx('job-like-item')}>
                <div className={cx('job-like-avt')}>
                    <Image src={BASE_URL + data?.logo} alt={data?.name} />
                </div>
                <div className={cx('job-like-infor')}>
                    <p>
                        Tên công việc: <span>{data?.name}</span>
                    </p>
                    <p>
                        Ngày hết hạn:{' '}
                        <span>{formatDateString('YYYY/MM/DD', '-', 'DD/MM/YYYY', '/', data?.dateExperience)}</span>
                    </p>
                    <p>
                        Trạng thái:{' '}
                        {status === 'Tạm dừng ứng tuyển' && <span className={cx('job-inactive')}>Chờ đăng tuyển</span>}
                        {status === 'Đang ứng tuyển' && <span className={cx('job-active')}>{status}</span>}
                        {status === 'Đã hết hạn' && <span className={cx('job-outOfDate')}>{status}</span>}
                    </p>
                </div>
                <div className={cx('job-like-button')}>
                    <CustomButton onClick={handleShowDetail}>
                        <FontAwesomeIcon icon={faEye} /> Xem chi tiết
                    </CustomButton>
                    <CustomButton onClick={handleShowCandidate}>
                        <FontAwesomeIcon icon={faPeopleGroup} /> Ứng viên
                    </CustomButton>

                    {status === 'Tạm dừng ứng tuyển' && (
                        <CustomButton
                            buttonClassName={cx('btn btn-success')}
                            onClick={() => handleChangeStatus('ACTIVE')}
                        >
                            <FontAwesomeIcon icon={faPlay} /> Đăng tuyển
                        </CustomButton>
                    )}
                    {status === 'Đang ứng tuyển' && (
                        <CustomButton
                            buttonClassName={cx('btn btn-warning')}
                            onClick={() => handleChangeStatus('INACTIVE')}
                        >
                            <FontAwesomeIcon icon={faStop} /> Dừng tuyển dụng
                        </CustomButton>
                    )}
                    {status === 'Đã hết hạn' && (
                        <CustomButton buttonClassName={cx('btn btn-success')} disabled>
                            <FontAwesomeIcon icon={faPlay} /> Đăng tuyển
                        </CustomButton>
                    )}
                    <ButtonPopper
                        name={'Thêm'}
                        icon={<FontAwesomeIcon icon={faCaretDown} />}
                        customBodyStyle={cx('more-body')}
                        customPopperStyle={cx('more-wrapper')}
                    >
                        <div className={cx('more-options')}>
                            <CustomButton onClick={handleOpenRecommned}>
                                <FontAwesomeIcon icon={faPeopleGroup} /> Đề xuất Ứng viên
                            </CustomButton>
                            <CustomButton buttonClassName={cx('btn btn-secondary')} onClick={handleCopy}>
                                <FontAwesomeIcon icon={faTrash} /> Sao chép
                            </CustomButton>
                            <CustomButton buttonClassName={'btn btn-success'} onClick={handleShowUpdateJob}>
                                <FontAwesomeIcon icon={faPen} /> Cập nhật
                            </CustomButton>
                            <CustomButton wrapperStyle={cx('btn-delete')} onClick={handleDeleteJob}>
                                <FontAwesomeIcon icon={faTrash} /> Xóa
                            </CustomButton>
                        </div>
                    </ButtonPopper>
                </div>
            </div>
        </>
    );
}

export default JobManageItem;
