import React from 'react';
import { Row, Col } from 'react-bootstrap';
import className from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = className.bind(styles);
const features = [
    { title: 'Tài khoản', href: '/' },
    { title: 'Đề xuất công việc', href: '/' },
    { title: 'Ứng tuyển', href: '/' },
    { title: 'Tạo hồ sơ', href: '/' },
];
const policies = [
    { title: 'Bảo mật thông tin', href: '/' },
    { title: 'Chính sách sử dụng', href: '/' },
    { title: 'Quy định giao dịch', href: '/' },
    { title: 'Hỗ trợ người dùng', href: '/' },
];
const contacts = [
    { title: 'Email: 2guys.contact@gmail.com', href: '/' },
    { title: 'Hotline: 0999999x', href: '/' },
    { title: 'Địa chỉ: Nong Lam Building', href: '/' },
];
function Footer() {
    return (
        <div className={cx('footer')}>
            <Row>
                <Col lg={4} className={cx('slogan')}>
                    <a href="/">
                        <img
                            alt=""
                            src="/static/imgs/logo-black.png"
                            with="360"
                            height="60"
                            className={cx('logo', 'd-inline-block', 'align-top')}
                        />
                        <p>Giải pháp tìm việc nhanh cho sinh viên</p>
                    </a>
                </Col>
                <Col lg={2} sm={4} className={cx('feature')}>
                    <h4>Chức năng</h4>
                    <ul>
                        {features.map((feature, index) => (
                            <li key={index}>
                                <a href={feature.href}>{feature.title}</a>
                            </li>
                        ))}
                    </ul>
                </Col>
                <Col lg={2} sm={4} className={cx('policy')}>
                    <h4>Chính sách</h4>
                    <ul>
                        {policies.map((policy, index) => (
                            <li key={index}>
                                <a href={policy.href}>{policy.title}</a>
                            </li>
                        ))}
                    </ul>
                </Col>
                <Col lg={4} sm={4} className={cx('contact')}>
                    <h4>Liên hệ</h4>
                    <ul>
                        {contacts.map((contact, index) => (
                            <li key={index}>
                                <a href={contact.href}>{contact.title}</a>
                            </li>
                        ))}
                    </ul>
                </Col>
            </Row>
        </div>
    );
}

export default Footer;
