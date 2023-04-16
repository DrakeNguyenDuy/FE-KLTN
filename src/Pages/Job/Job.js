import React, { useState } from 'react';
import styles from './JobPage.module.scss';
import className from 'classnames/bind';
import { Button, Col, Collapse, Form, Row } from 'react-bootstrap';
import Job1 from '../../components/Job1';
const cx = className.bind(styles);

export default function Job() {
    const [open, setOpen] = useState(false);
    return (
        <div className={cx('page-job')}>
            <div className={cx('filter-area')}>
                <Form.Control type="text" placeholder="Tìm kiếm việc làm" />
                <Form.Select aria-label="Chọn lĩnh vực nghề nghiệp">
                    <option>Chọn lĩnh vực nghề nghiệp</option>
                </Form.Select>
                <Form.Select aria-label="Nhập nơi làm việc">
                    <option>Chọn khu vực làm việc</option>
                </Form.Select>
                <Button>Tìm kiếm</Button>
                {/* <Button onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open}>
                    Show
                </Button> */}
            </div>
            {/* <div>
                <Collapse in={open}>
                    <div id="example-collapse-text">
                        <Form.Select aria-label="Chọn lĩnh vực nghề nghiệp">
                            <option>Chọn lĩnh vực nghề nghiệp</option>
                        </Form.Select>
                        <Form.Select aria-label="Nhập nơi làm việc">
                            <option>Chọn khu vực làm việc</option>
                        </Form.Select>
                    </div>
                </Collapse>
            </div> */}
            <div className={cx('job-pannel', 'p-5')}>
                <Row className={cx('me-0', 'row_c')}>
                    <Col lg={8} className={cx('list-job')}>
                        <Job1 big={true} />
                        <Job1 big={true} />
                        <Job1 big={true} />
                    </Col>
                    <Col lg={4} className={cx('ext-job')}></Col>
                </Row>
            </div>
        </div>
    );
}
