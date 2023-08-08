import classNames from 'classnames/bind';
import styles from './changePassword.module.scss';
import { Col, Form, Row } from 'react-bootstrap';
import CustomButton from '~/components/CustomButton/CustomButton';
import CustomPassword from '~/components/CustomPassword/CustomPassword';
import CustomBreadCrumb from '~/components/CustomBreadCrumb/CustomBreadCrumb';

const cx = classNames.bind(styles);

const breadcrumbItems = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Thay đổi mật khẩu', href: '/change-password' },
];

function ChangePassword() {
    return (
        <Row className={cx('wrapper')}>
            <CustomBreadCrumb items={breadcrumbItems} className={cx('breadcrumb')} />
            <Col lg={12}>
                <div className={cx('page-form')}>
                    <Form>
                        <CustomPassword
                            controlId={'formBasicPassword'}
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                            labelName={'Mật khẩu hiện tại'}
                            placeholder={'Nhập mật khẩu hiện tại'}
                        />
                        <CustomPassword
                            controlId={'formBasicPassword'}
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                            labelName={'Mật khẩu mới'}
                            placeholder={'Nhập mật khẩu mới'}
                        />
                        <CustomPassword
                            controlId={'formBasicPassword'}
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                            labelName={'Nhập lại mật khẩu'}
                            placeholder={'Nhập lại mật khẩu'}
                        />
                        <CustomButton
                            className={cx('confirm-button')}
                            // isLoading={loading}
                            //   onClick={submit}
                        >
                            Xác nhận
                        </CustomButton>
                    </Form>
                </div>
            </Col>
        </Row>
    );
}

export default ChangePassword;
