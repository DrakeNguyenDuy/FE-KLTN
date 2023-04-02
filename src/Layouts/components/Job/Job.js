import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import styles from './Job.module.scss';
import className from 'classnames/bind';
const cx = className.bind(styles);
export default function Job({ name }) {
    return (
        <div className={cx('job')}>
            <Row className="h-100">
                <Col className="d-flex justify-content-center">
                    <img className={cx('img_job')} src="static/imgs/brand.jpg" />
                </Col>
                <Col className="d-flex justify-content-space-between">
                    <Row>Bán xe chính hãng</Row>
                    <Row>Công ty Tesla</Row>
                    <Row>Lương 30 nghìn/ giờ</Row>
                    <Row>1/1/2011</Row>
                </Col>
            </Row>
        </div>
    );
}
