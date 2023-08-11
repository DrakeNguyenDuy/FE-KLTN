import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './JobLikedItem.module.scss';
import className from 'classnames/bind';
import { Button, Image, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChain, faEye, faPaperPlane, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CustomButton from '~/components/common/CustomButton';
import Loading from '~/components/common/Loading';
import { getJobDetail, postLikeJob } from '~/store/reducers/common/jobSlice';
import { postApplyJob } from '~/store/reducers/alumus/recruitmentSlice';
import { getCVWithToken } from '~/store/reducers/alumus/cvSlice';
import { formatDateString } from '~/utils/Format';
import { BASE_URL } from '~/constant';

const cx = className.bind(styles);

function JobLiked({ data }) {
    const { codeJob } = data;
    const [showModal, setShowModal] = useState(false);
    const jobDetails = useSelector((state) => state.job.jobDetails);
    const jobDetailIsLoading = useSelector((state) => state.job.jobDetailIsLoading);
    const cv = useSelector((state) => state.cv.cv);
    const cvLoading = useSelector((state) => state.cv.isLoading);

    useEffect(() => {
        dispath(getCVWithToken());
        dispath(getJobDetail({ id: codeJob, type: 'alumus' }));
        // eslint-disable-next-line
    }, []);

    const dispath = useDispatch();
    const navigate = useNavigate();

    const handleUnLike = (e) => {
        e.stopPropagation();
        dispath(postLikeJob({ codeJob, isFollow: true }));
    };

    const notify = () => toast('Đã ứng tuyển thành công!');
    const handleOpenModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleUpdate = () => {
        dispath(postApplyJob(data.codeJob));
        notify();
    };

    return cvLoading && jobDetailIsLoading ? (
        <Loading />
    ) : (
        <>
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
                            Họ tên: <span>{data?.nameAlumnus}</span>
                        </p>
                        <p>
                            Công ty: <span>{data?.nameCompany}</span>
                        </p>
                        <p>
                            Công việc: <span>{data?.nameJob}</span>
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
            <div className={cx('job-like-item')}>
                <div className={cx('job-like-avt')}>
                    <Image src={BASE_URL + data?.companyLogo} alt={data?.nameJob} />
                </div>
                <div className={cx('job-like-infor')}>
                    <p>
                        Tên công việc: <span>{data?.nameJob}</span>
                    </p>
                    <p>
                        Tên công ty: <span>{data?.nameCompany}</span>
                    </p>
                    <p>
                        Hạn nộp hồ sơ:{' '}
                        <span>{formatDateString('YYYY/MM/DD', '-', 'DD/MM/YYYY', '/', data?.dateRating)}</span>
                    </p>
                </div>
                <div className={cx('job-like-button')}>
                    <CustomButton onClick={handleOpenModal}>
                        <FontAwesomeIcon icon={faPaperPlane} /> Ứng tuyển ngay
                    </CustomButton>
                    <CustomButton onClick={handleUnLike}>
                        <FontAwesomeIcon icon={faThumbsDown} /> Bỏ thích
                    </CustomButton>
                    <CustomButton onClick={() => navigate(`/job/${data?.codeJob}`)}>
                        <FontAwesomeIcon icon={faEye} /> Xem chi tiết
                    </CustomButton>
                </div>
            </div>
        </>
    );
}

export default JobLiked;
