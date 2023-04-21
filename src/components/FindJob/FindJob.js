import React from 'react';
import { Button, Form } from 'react-bootstrap';
import styles from './FindJob.module.scss';
import className from 'classnames/bind';

const cx = className.bind(styles);

function FindJob() {
    return (
        <div className={cx('wrapper')}>
            <Form.Control type="text" placeholder="Tìm kiếm việc làm" />
            <Form.Select aria-label="Chọn lĩnh vực nghề nghiệp">
                <option>Chọn lĩnh vực nghề nghiệp</option>
            </Form.Select>
            <Form.Select aria-label="Nhập nơi làm việc">
                <option>Chọn khu vực làm việc</option>
            </Form.Select>
            <Button>Tìm kiếm</Button>
        </div>
    );
}

export default FindJob;
