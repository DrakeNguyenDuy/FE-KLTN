import Avatar from '~/components/common/Avatar/Avatar';
import styles from './AlumnusDetails.module.scss';
import className from 'classnames/bind';
import { Form } from 'react-bootstrap';
import { BASE_URL } from '~/constant';

const cx = className.bind(styles);

function AlumnusDetails({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('job-apply-avt')}>
                <Avatar
                    src={data?.avartar ? BASE_URL + data.avartar : '/static/imgs/profile-default-avatar.jpg'}
                    alt={data?.userName}
                    base64={false}
                />
            </div>
            <div>
                <Form>
                    <Form.Group className="mb-3" controlId="lastName">
                        <Form.Label>Họ </Form.Label>
                        <Form.Control type="text" placeholder="Nhập họ" defaultValue={data.lastName} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="firstName">
                        <Form.Label>Tên </Form.Label>
                        <Form.Control type="text" placeholder="Nhập Tên" defaultValue={data.firstName} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="gender">
                        <Form.Label>Giới tính </Form.Label>
                        <Form.Control type="text" placeholder="Nhập giới tính" defaultValue={data.gender} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email </Form.Label>
                        <Form.Control type="text" placeholder="Nhập email" defaultValue={data.emailAddress} disabled />
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
}

export default AlumnusDetails;
