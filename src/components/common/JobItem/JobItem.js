import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Badge, Button, Col, Modal, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeCircleCheck, faEye, faHeart, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import className from 'classnames/bind';
import styles from './JobItem.module.scss';

import { BASE_URL } from '~/constant';
import CustomButton from '../CustomButton/CustomButton';
import { postLikeJob } from '~/store/reducers/common/jobSlice';
import RequireLogin from '../RequireLogin/RequireLogin';
import { cutLongText, formatCurrency, formatDateString } from '~/utils/Format';
import JobDetailContent from '../JobDetailContent/JobDetailContent';

const cx = className.bind(styles);
export default function JobItem({ big = true, data, seeDetails = false, user, ...props }) {
    const dispath = useDispatch();
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const { applied, sku, follow } = data;
    const [isFollow, setIsFollow] = useState(follow);

    const [showModal, setShowModal] = useState(false);

    const followStatus = useSelector((state) => state.job.follow);

    useEffect(() => {
        if (followStatus && followStatus.codeJob === sku) {
            setIsFollow(followStatus.status);
        }
        // eslint-disable-next-line
    }, [followStatus]);
    const toggleLike = (e) => {
        e.stopPropagation();
        if (user) {
            dispath(postLikeJob({ codeJob: sku, isFollow }));
        } else {
            setShow(true);
        }
    };

    const orderedSkill = (skills) => {
        const coppySkills = [...skills];
        if (coppySkills && coppySkills.length > 1) {
            return coppySkills.sort((skill1, skill2) => skill1.id - skill2.id);
        }
        return [];
    };

    const handleShowDetail = (e) => {
        e.stopPropagation();
        setShowModal(true);
    };
    const handleCloseDetail = () => {
        setShowModal(false);
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
            <RequireLogin
                show={show}
                message={'Vui lòng đăng nhập để theo dõi công việc!'}
                onClose={() => setShow(false)}
            />
            <div className={cx('job', 'mw-100', 'mb-2', big ? null : 'small', props.className)} {...props}>
                <Row className={cx('content_job')}>
                    <Col className={cx('col1', big ? null : 'small')}>
                        <img
                            className={cx('img_job', big ? null : 'small')}
                            src={BASE_URL + data?.logo}
                            alt={data?.name}
                        />
                    </Col>

                    <Col className={cx('col2')}>
                        <Row className={cx('sub_row')}>
                            <Link className={cx('fsc_2', 'ms-0', 'ps-0', 'name_job')} to={'/job/' + data.sku}>
                                {/* name */}
                                {big ? data?.name : cutLongText(data?.name, 30)}
                            </Link>
                        </Row>
                        {!big && (
                            <Row className={cx('sub_row', 'infor_job')}>
                                <div className={cx('date-infor')}>
                                    <FontAwesomeIcon icon={faCalendar} />
                                    <p>
                                        {/* dateExperience */}
                                        Hạn nộp hồ sơ:{' '}
                                        {formatDateString('YYYY/MM/DD', '-', 'DD/MM/YYYY', '/', data?.dateExperience)}
                                    </p>
                                </div>
                            </Row>
                        )}
                        {big ? (
                            <Row
                                className={cx('sub_row', 'infor_job', 'name-job')}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/company/${data?.codeCompany}`);
                                }}
                            >
                                {/* nameCompany */}
                                {data?.nameCompany}
                            </Row>
                        ) : null}
                        {big ? (
                            <Row className={cx('sub_row', 'salary')}>
                                {/* finalPrice */}
                                Mức lương: {formatCurrency(data?.price)} {'/'} {data?.payCycle}
                            </Row>
                        ) : (
                            <Row className={cx('sub_row', 'salary')}>
                                {/* finalPrice */}
                                Mức lương: {formatCurrency(data?.price)} {'/'} {data?.payCycle}
                            </Row>
                        )}
                        {big ? (
                            <Row className={cx('sub_row', 'infor_job')}>
                                {/* locationDescription */}
                                Kỹ năng: {data?.locationDescription}
                            </Row>
                        ) : null}
                        <Row className={cx('sub_row', 'infor_job', '')}>
                            {/* <Badge className="w-auto me-1">Sale</Badge>
                        <Badge className="w-auto me-1">Bán hàng</Badge>
                        <Badge className="w-auto me-1">Marketing</Badge>
                        <Badge className="w-auto me-1">+3</Badge> */}
                            {/* skillsDecription */}
                            {orderedSkill(data?.skillsDecription).map((skill, index) =>
                                index < 3 ? (
                                    <Badge key={skill.code} className={cx('w-auto me-1', 'badge-job')}>
                                        {skill.name}
                                    </Badge>
                                ) : null,
                            )}
                            {orderedSkill(data?.skillsDecription).length > 3 && (
                                <Badge className="w-auto me-1">+{data?.skillsDecription.length - 3}</Badge>
                            )}
                        </Row>
                        {!big && (
                            <Row className="align-items-center">
                                {seeDetails ? (
                                    <>
                                        <CustomButton
                                            onClick={handleShowDetail}
                                            wrapperStyle={cx('button-wrapper', 'follow')}
                                        >
                                            <FontAwesomeIcon icon={faEye} /> {'Xem chi tiết'}
                                        </CustomButton>
                                    </>
                                ) : (
                                    <>
                                        {applied ? (
                                            <CustomButton
                                                onClick={(e) => e.stopPropagation()}
                                                wrapperStyle={cx('button-wrapper', 'small-btn', 'apply-btn')}
                                            >
                                                <FontAwesomeIcon icon={faEnvelopeCircleCheck} /> Đã ứng tuyển
                                            </CustomButton>
                                        ) : isFollow ? (
                                            <CustomButton
                                                onClick={toggleLike}
                                                wrapperStyle={cx('button-wrapper', 'small-btn', 'unfollow')}
                                            >
                                                <FontAwesomeIcon icon={faThumbsDown} /> {'Bỏ theo dõi'}
                                            </CustomButton>
                                        ) : (
                                            <CustomButton
                                                onClick={toggleLike}
                                                wrapperStyle={cx('button-wrapper', 'small-btn', 'follow')}
                                            >
                                                <FontAwesomeIcon icon={faHeart} /> {'Theo dõi'}
                                            </CustomButton>
                                        )}
                                    </>
                                )}
                            </Row>
                        )}
                    </Col>

                    {big && (
                        <Col className={cx('ps-0', 'col3')}>
                            <Row className={cx('sub_row', 'infor_job', 'date-big')}>
                                <div className={cx('date-infor')}>
                                    <FontAwesomeIcon icon={faCalendar} />
                                    <p>
                                        {/* dateExperience */}
                                        {formatDateString('YYYY/MM/DD', '-', 'DD/MM/YYYY', '/', data?.dateExperience)}
                                    </p>
                                </div>
                            </Row>
                            <div className={cx('actions-group')}>
                                {seeDetails ? (
                                    <>
                                        <CustomButton
                                            onClick={handleShowDetail}
                                            wrapperStyle={cx('button-wrapper', 'follow')}
                                        >
                                            <FontAwesomeIcon icon={faEye} /> {'Xem chi tiết'}
                                        </CustomButton>
                                    </>
                                ) : (
                                    <>
                                        {applied && (
                                            <CustomButton
                                                onClick={(e) => e.stopPropagation()}
                                                wrapperStyle={cx('button-wrapper', 'apply-btn')}
                                            >
                                                <FontAwesomeIcon icon={faEnvelopeCircleCheck} /> Đã ứng tuyển
                                            </CustomButton>
                                        )}
                                        {isFollow ? (
                                            <CustomButton
                                                onClick={toggleLike}
                                                wrapperStyle={cx('button-wrapper', 'unfollow')}
                                            >
                                                <FontAwesomeIcon icon={faThumbsDown} /> {'Bỏ theo dõi'}
                                            </CustomButton>
                                        ) : (
                                            <CustomButton
                                                onClick={toggleLike}
                                                wrapperStyle={cx('button-wrapper', 'follow')}
                                            >
                                                <FontAwesomeIcon icon={faHeart} /> {'Theo dõi'}
                                            </CustomButton>
                                        )}
                                    </>
                                )}
                            </div>
                        </Col>
                    )}
                </Row>
            </div>
        </>
    );
}
