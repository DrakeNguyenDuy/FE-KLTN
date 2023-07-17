import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import className from 'classnames/bind';

import styles from './Job1.module.scss';
import { BASE_URL } from '~/constant';
import CustomButton from '../CustomButton/CustomButton';

const cx = className.bind(styles);
export default function Job1({ big = true, data, ...props }) {
    const convertFormatDate = (dateString) => {
        if (dateString && dateString.includes('-')) {
            const parts = dateString.split('-');
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        } else return dateString;
    };

    return (
        <div className={cx('job', 'mw-100', 'mb-2', big ? null : 'small', props.className)} {...props}>
            <Row className={cx('content_job')}>
                <Col className={cx('col1')}>
                    <img className={cx('img_job')} src={BASE_URL + data?.logo} alt={data?.name} />
                </Col>
                <Col className={cx('col2')}>
                    <Row className={cx('sub_row')}>
                        <Link className={cx('fsc_2', 'ms-0', 'ps-0', 'name_job')} to={'/job/' + data.sku}>
                            {/* name */}
                            {data?.name}
                        </Link>
                    </Row>
                    {big ? (
                        <Row className={cx('sub_row', 'infor_job')}>
                            {/* nameCompany */}
                            {data?.nameCompany}
                        </Row>
                    ) : null}
                    {big ? (
                        <Row className={cx('sub_row', 'salary')}>
                            {/* finalPrice */}
                            Mức lương: {data?.finalPrice} {'/'} {data?.payCycle}
                        </Row>
                    ) : (
                        <Row className={cx('sub_row', 'salary')}>
                            {/* finalPrice */}
                            {data?.finalPrice} {'/'} {data?.payCycle}
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
                        {data?.skillsDecription.map((skill, index) =>
                            index < 3 ? (
                                <Badge key={skill.code} className={cx('w-auto me-1', 'badge-job')}>
                                    {skill.name}
                                </Badge>
                            ) : null,
                        )}
                        {data?.skillsDecription.length > 3 && (
                            <Badge className="w-auto me-1">+{data?.skillsDecription.length - 3}</Badge>
                        )}
                    </Row>
                </Col>

                <Col className={cx('ps-0', 'col3')}>
                    <Row className={cx('sub_row', 'infor_job')}>
                        <div className={cx('date-infor')}>
                            <FontAwesomeIcon icon={faCalendar} />
                            <p>
                                {/* dateExperience */}
                                {convertFormatDate(data?.dateExperience)}
                            </p>
                        </div>
                    </Row>
                    <CustomButton>Theo dõi</CustomButton>
                </Col>
            </Row>
        </div>
    );
}
