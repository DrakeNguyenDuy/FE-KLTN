import Avatar from '~/components/common/Avatar/Avatar';
import styles from './EmployerDetails.module.scss';
import className from 'classnames/bind';
import { Form } from 'react-bootstrap';
import { BASE_URL } from '~/constant';

const cx = className.bind(styles);

function EmployerDetails({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('job-apply-avt')}>
                <Avatar
                    src={data.logo ? BASE_URL + data.logo.path : '/static/imgs/profile-default-avatar.jpg'}
                    alt={data.name}
                    base64={false}
                />
            </div>
            <div>
                <Form>
                    <Form.Group className="mb-3" controlId="lastName">
                        <Form.Label>Họ </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Họ"
                            defaultValue={data?.readableAudit?.lastName}
                            disabled
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="firstName">
                        <Form.Label>Tên </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Tên"
                            defaultValue={data?.readableAudit?.firstName}
                            disabled
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="companyName">
                        <Form.Label>Tên công ty </Form.Label>
                        <Form.Control type="text" placeholder="Tên công ty" defaultValue={data.name} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email </Form.Label>
                        <Form.Control type="text" placeholder="Email" defaultValue={data.email} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="phone">
                        <Form.Label>Số điện thoại </Form.Label>
                        <Form.Control type="text" placeholder="Số điện thoại" defaultValue={data.phone} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label>Địa chỉ </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Địa chỉ"
                            defaultValue={data?.address ? data.address.address + ', ' + data.address.city : null}
                            disabled
                        />
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
}

export default EmployerDetails;
