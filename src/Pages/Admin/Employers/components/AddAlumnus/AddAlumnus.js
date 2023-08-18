import styles from './AddAlumnus.module.scss';
import className from 'classnames/bind';
import { useRef } from 'react';
import { Form } from 'react-bootstrap';
import CustomPassword from '~/components/common/CustomPassword/CustomPassword';
import { RULES, validate } from '~/utils/validates/Validate';

const cx = className.bind(styles);

function AddAlumnus({ data }) {
    const formRef = useRef();
    return (
        <>
            <Form ref={formRef}>
                <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label>Họ </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập họ"
                        defaultValue={data?.lastname}
                        onBlur={(e) => validate(e.target, [RULES.IS_REQUIRE], e.target.value, '.pf-error', 'Họ')}
                    />
                    <p className={cx('form-error', 'pf-error', 'my-form-hidden')}></p>
                </Form.Group>
                <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>Tên </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập tên"
                        defaultValue={data?.firstname}
                        onBlur={(e) => validate(e.target, [RULES.IS_REQUIRE], e.target.value, '.pf-error', 'Tên')}
                    />
                    <p className={cx('form-error', 'pf-error', 'my-form-hidden')}></p>
                </Form.Group>
                <Form.Group className="mb-3" controlId="gender">
                    <Form.Label>Chọn giới tính</Form.Label>
                    <Form.Select
                        aria-label="Chọn giới tính"
                        defaultValue={data?.gender}
                        onBlur={(e) => validate(e.target, [RULES.IS_REQUIRE], e.target.value, '.cv-error', 'Giới tính')}
                    >
                        <option value="">Chọn giới tính</option>
                        <option value="M">Nam</option>
                        <option value="F">Nữ</option>
                        <option value="O">Khác</option>
                    </Form.Select>
                    <p className={cx('form-error', 'cv-error', 'my-form-hidden')}></p>
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email </Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Nhập email"
                        defaultValue={data?.email}
                        onBlur={(e) =>
                            validate(e.target, [RULES.IS_REQUIRE, RULES.IS_EMAIL], e.target.value, '.cv-error', 'Email')
                        }
                    />
                    <p className={cx('form-error', 'cv-error', 'my-form-hidden')}></p>
                </Form.Group>
                <CustomPassword
                    controlId={'password'}
                    labelName={'Mật khẩu'}
                    placeholder={'Nhập mật khẩu'}
                    onBlur={(e) => validate(e.target, [RULES.IS_REQUIRE], e.target.value, '.cv-error', 'Mật khẩu')}
                />
            </Form>
        </>
    );
}

export default AddAlumnus;
