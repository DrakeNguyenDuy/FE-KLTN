import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Badge, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeCircleCheck, faHeart, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import className from 'classnames/bind';
import styles from './JobItem.module.scss';

import { BASE_URL } from '~/constant';
import CustomButton from '../CustomButton/CustomButton';
import { postLikeJob } from '~/store/reducers/jobSlice';
import RequireLogin from '../RequireLogin/RequireLogin';

const cx = className.bind(styles);
export default function JobItem({ big = true, data, ...props }) {
    const dispath = useDispatch();
    const [show, setShow] = useState(false);
    const { applied, sku, follow } = data;
    const [isFollow, setIsFollow] = useState(follow);

    const followStatus = useSelector((state) => state.job.follow);
    const user = useSelector((state) => state.auth.user);

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

    const convertFormatDate = (dateString) => {
        if (dateString && dateString.includes('-')) {
            const parts = dateString.split('-');
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        } else return dateString;
    };

    const orderedSkill = (skills) => {
        const coppySkills = [...skills];
        if (coppySkills && coppySkills.length > 1) {
            return coppySkills.sort((skill1, skill2) => skill1.id - skill2.id);
        }
        return [];
    };

    return (
        <>
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
                                {data?.name}
                            </Link>
                        </Row>
                        {!big && (
                            <Row className={cx('sub_row', 'infor_job')}>
                                <div className={cx('date-infor')}>
                                    <FontAwesomeIcon icon={faCalendar} />
                                    <p>
                                        {/* dateExperience */}
                                        Hạn nộp hồ sơ: {convertFormatDate(data?.dateExperience)}
                                    </p>
                                </div>
                            </Row>
                        )}
                        {big ? (
                            <Row className={cx('sub_row', 'infor_job')}>
                                {/* nameCompany */}
                                {data?.nameCompany}
                            </Row>
                        ) : null}
                        {big ? (
                            <Row className={cx('sub_row', 'salary')}>
                                {/* finalPrice */}
                                Mức lương: {data?.price} VNĐ {'/'} {data?.payCycle}
                            </Row>
                        ) : (
                            <Row className={cx('sub_row', 'salary')}>
                                {/* finalPrice */}
                                Mức lương: {data?.price} VNĐ {'/'} {data?.payCycle}
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
                                        {convertFormatDate(data?.dateExperience)}
                                    </p>
                                </div>
                            </Row>
                            {applied ? (
                                <CustomButton
                                    onClick={(e) => e.stopPropagation()}
                                    wrapperStyle={cx('button-wrapper', 'apply-btn')}
                                >
                                    <FontAwesomeIcon icon={faEnvelopeCircleCheck} /> Đã ứng tuyển
                                </CustomButton>
                            ) : isFollow ? (
                                <CustomButton onClick={toggleLike} wrapperStyle={cx('button-wrapper', 'unfollow')}>
                                    <FontAwesomeIcon icon={faThumbsDown} /> {'Bỏ theo dõi'}
                                </CustomButton>
                            ) : (
                                <CustomButton onClick={toggleLike} wrapperStyle={cx('button-wrapper', 'follow')}>
                                    <FontAwesomeIcon icon={faHeart} /> {'Theo dõi'}
                                </CustomButton>
                            )}
                        </Col>
                    )}
                </Row>
            </div>
        </>
    );
}
