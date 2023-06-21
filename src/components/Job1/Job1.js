import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import className from 'classnames/bind';

import styles from './Job.module.scss';

const cx = className.bind(styles);
export default function Job({ big = true, data, ...props }) {
    return (
        <div className={cx('job', 'mw-100', 'mb-2', props.className)} {...props}>
            <Row className={cx('content_job')}>
                <Col className={cx('col1')}>
                    <img className={cx('img_job')} src="static/imgs/brand.jpg" alt="" />
                </Col>
                <Col className={cx('col2')}>
                    <Row className={cx('sub_row')}>
                        <Link className={cx('fsc_2', 'ms-0', 'ps-0', 'name_job')} to="#">
                            {/* name */}
                            {data?.name}
                        </Link>
                    </Row>
                    <Row className={cx('sub_row', 'infor_job')}>
                        {/* nameCompany */}
                        {data?.nameCompany}
                    </Row>
                    <Row className={cx('sub_row', 'salary')}>
                        {/* finalPrice */}
                        Mức lương: {data?.finalPrice}
                    </Row>
                    <Row className={cx('sub_row', 'infor_job')}>
                        {/* locationDescription */}
                        Kỹ năng: {data?.locationDescription}
                    </Row>
                    <Row className={cx('sub_row', 'infor_job', '')}>
                        {/* <Badge className="w-auto me-1">Sale</Badge>
                        <Badge className="w-auto me-1">Bán hàng</Badge>
                        <Badge className="w-auto me-1">Marketing</Badge>
                        <Badge className="w-auto me-1">+3</Badge> */}
                        {/* skillsDecription */}
                        {data?.skillsDecription.map((skill) => (
                            <Badge key={skill.code} className="w-auto me-1">
                                {skill.name}
                            </Badge>
                        ))}
                    </Row>
                </Col>
                {big ? (
                    <Col className={cx('ps-0', 'col3')}>
                        <Row className={cx('sub_row', 'infor_job')}>
                            <div className={cx('date-infor')}>
                                <FontAwesomeIcon icon={faCalendar} />
                                <p>
                                    {/* dateExperience */}
                                    {data?.dateExperience}
                                </p>
                            </div>
                        </Row>
                        <Button>Theo dõi</Button>
                    </Col>
                ) : null}
            </Row>
        </div>
    );
}
// d-flex justify-content-center
