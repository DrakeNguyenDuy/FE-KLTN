import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import styles from './Job.module.scss';
import className from 'classnames/bind';
import { Link } from 'react-router-dom';
const cx = className.bind(styles);
export default function Job({ name }) {
    return (
        <div className={cx('job', 'mw-100')}>
            <Row className={cx('content_job')}>
                <Col className={cx('col1')}>
                    <img className={cx('img_job')} src="static/imgs/brand.jpg" />
                </Col>
                <Col className={cx('col2')}>
                    <Row className={cx('sub_row')}>
                        <Link className={cx('fsc_2', 'p-0', 'name_job')} to="#">
                            Bán xe chính hãng
                        </Link>
                    </Row>
                    <Row className={cx('sub_row', 'infor_job')}>Công ty Tesla</Row>
                    <Row className={cx('sub_row', 'salary')}>Lương 30 nghìn/ giờ</Row>
                    <Row className={cx('sub_row', 'infor_job')}>Thủ Đức/TP.HCM</Row>
                    <Row className={cx('sub_row', 'infor_job')}>1/1/2011</Row>
                </Col>
            </Row>
        </div>
    );
}
// d-flex justify-content-center
