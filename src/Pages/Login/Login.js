import className from 'classnames/bind';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import styles from './Login.module.scss';
const cx = className.bind(styles);

function Login() {
    return (
        <Row>
            <Col lg={7} className={cx('login-content')}>
                <h1>Đăng nhập ngay</h1>
                <h3>Cơ hội việc làm tức thì</h3>
                <p>
                    Nêu bạn chưa có tài khoản <br />
                    <span>
                        Đăng ký{' '}
                        <a
                            href="https://figma.com/file/kdU1fpvg127UGy0b7QLXjy/Khóa-luận-tốt-nghiệp?node-id=0-1&t=kdHyQIdDkTGQBUMr-0"
                            target="blank"
                        >
                            Tại đây
                        </a>
                    </span>
                </p>
                <img src="/assets/imgs/Saly-14.png" alt="Saly-14" />
            </Col>
            <Col lg={5}>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Col>
        </Row>
    );
}

export default Login;
