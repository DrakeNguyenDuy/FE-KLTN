import styles from './UpdateAlumnus.module.scss';
import className from 'classnames/bind';
import { useRef, useState } from 'react';
import Avatar from 'react-avatar-edit';
import { Form } from 'react-bootstrap';
import CustomPassword from '~/components/common/CustomPassword/CustomPassword';
import { RULES, validate } from '~/utils/validates/Validate';

const cx = className.bind(styles);

function UpdateAlumnus({ data }) {
    const formRef = useRef();

    const [src, setSrc] = useState('');
    const [preview, setPreview] = useState(null);

    const handleUpload = () => {
        // handleSubmit(preview);
        // handleClose();
    };
    const onClose = () => {
        setPreview(null);
    };
    const onCrop = (preview) => {
        setPreview(preview);
    };

    return (
        <>
            <Form ref={formRef}>
                <Form.Label>Ảnh đại diện </Form.Label>
                <div className={cx('uploadAvatar')}>
                    <Avatar width={550} height={295} onCrop={onCrop} onClose={() => setPreview(null)} src={src} />
                    {!!preview ? (
                        <div>
                            <h3>Xem trước</h3>
                            <img width={200} src={preview} alt="Preview" />
                        </div>
                    ) : null}
                </div>
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
                {/* <Form.Group className="mb-3" controlId="email">
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
                </Form.Group> */}
                <CustomPassword
                    controlId={'password'}
                    labelName={'Mật khẩu'}
                    placeholder={'Nhập mật khẩu'}
                    onBlur={(e) => validate(e.target, [RULES.IS_REQUIRE], e.target.value, '.cv-error', 'Mật khẩu')}
                />
                <CustomPassword
                    controlId={'confirmPassword'}
                    labelName={'Nhập lại mật khẩu'}
                    placeholder={'Nhập lại mật khẩu'}
                    onBlur={(e) => {
                        const passwordElement = formRef.current.querySelector('#password');
                        const passwordValue = passwordElement.value;
                        validate(
                            e.target,
                            [RULES.IS_REQUIRE, RULES.IS_CONFIRM_PASSWORD],
                            e.target.value,
                            '.cv-error',
                            'Nhập lại mật khẩu',
                            passwordValue,
                        );
                    }}
                />
            </Form>
        </>
    );
}

export default UpdateAlumnus;
