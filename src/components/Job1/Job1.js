import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import className from 'classnames/bind';

import styles from './Job.module.scss';

const cx = className.bind(styles);
export default function Job(props) {
    return (
        <div className={cx('job', 'mw-100', 'mb-2', props.className)}>
            <Row className={cx('content_job')}>
                <Col className={cx('col1')}>
                    <img className={cx('img_job')} src="static/imgs/brand.jpg" alt="" />
                </Col>
                <Col className={cx('col2')}>
                    <Row className={cx('sub_row')}>
                        <Link className={cx('fsc_2', 'ms-0', 'ps-0', 'name_job')} to="#">
                            Bán xe chính hãng
                        </Link>
                    </Row>
                    <Row className={cx('sub_row', 'infor_job')}>Công ty Tesla</Row>
                    <Row className={cx('sub_row', 'salary')}>Lương 30 nghìn/ giờ</Row>
                    <Row className={cx('sub_row', 'infor_job')}>Thủ Đức/TP.HCM</Row>
                    <Row className={cx('sub_row', 'infor_job', '')}>
                        <Badge className="w-auto me-1">Sale</Badge>
                        <Badge className="w-auto me-1">Bán hàng</Badge>
                        <Badge className="w-auto me-1">Marketing</Badge>
                        <Badge className="w-auto me-1">+3</Badge>
                    </Row>
                </Col>
                {props.big ? (
                    <Col className={cx('ps-0', 'col3')}>
                        <Row className={cx('sub_row', 'infor_job')}>
                            <div className={cx('date-infor')}>
                                <FontAwesomeIcon icon={faCalendar} />
                                <p>01/01/2012</p>
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
