import Avatar from '~/components/common/Avatar/Avatar';
import styles from './AlumnusDetails.module.scss';
import className from 'classnames/bind';
import { Form } from 'react-bootstrap';

const cx = className.bind(styles);

function AlumnusDetails({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('job-apply-avt')}>
                <Avatar src={'http://localhost:8091/api/v1/profile/avatar/longđ'} alt={data?.userName} base64={false} />
            </div>
            <div>
                <Form>
                    <Form.Group className="mb-3" controlId="lastName">
                        <Form.Label>Họ </Form.Label>
                        <Form.Control type="text" placeholder="Nhập họ" defaultValue={'Lương Hữu'} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="firstName">
                        <Form.Label>Tên </Form.Label>
                        <Form.Control type="text" placeholder="Nhập Tên" defaultValue={'Luân'} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="gender">
                        <Form.Label>Giới tính </Form.Label>
                        <Form.Control type="text" placeholder="Nhập giới tính" defaultValue={'Nam'} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập email"
                            defaultValue={'luongluanmpt@gmail.com'}
                            disabled
                        />
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
}

export default AlumnusDetails;
