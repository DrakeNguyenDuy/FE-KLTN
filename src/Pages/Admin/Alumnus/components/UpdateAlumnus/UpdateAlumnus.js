import styles from './UpdateAlumnus.module.scss';
import className from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import Avatar from 'react-avatar-edit';
import AvatarCustom from '~/components/common/Avatar/Avatar';
import { Form, Tab, Tabs } from 'react-bootstrap';
import CustomButton from '~/components/common/CustomButton/CustomButton';
import { BASE_URL } from '~/constant';
import { RULES, validate } from '~/utils/validates/Validate';
import './UpdateAlumnus.scss';
import { validateUpdateAlumnus } from '~/utils/validates/updateAlumnus';
import {
    adminUpdateAlumnus,
    adminUploadAvatar,
    resetUpdateAlumnus,
    resetUpdateAvatar,
} from '~/store/reducers/admin/adminListAlumnusSlice';
import { useDispatch, useSelector } from 'react-redux';

const cx = className.bind(styles);

function UpdateAlumnus({ data, toast }) {
    const formRef = useRef();
    const dispatch = useDispatch();

    const updateAlumnusStatus = useSelector((state) => state.adminManageAlumnus.updateAlumnusStatus);
    const updateAlumnusError = useSelector((state) => state.adminManageAlumnus.updateAlumnusError);
    const updateAlumnusLoading = useSelector((state) => state.adminManageAlumnus.updateAlumnusLoading);

    const updateAvatarStatus = useSelector((state) => state.adminManageAlumnus.updateAvatarStatus);
    const updateAvatarIsLoading = useSelector((state) => state.adminManageAlumnus.updateAvatarIsLoading);
    const updateAvatarError = useSelector((state) => state.adminManageAlumnus.updateAvatarError);

    const [src, setSrc] = useState('');
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        updateAlumnusStatus && toast('Đã cập nhật thành công!');
        updateAlumnusError && toast('Đã thêm ứng viên thất bại!');

        updateAvatarStatus && toast('Đã cập nhật thành công!');
        updateAvatarError && toast('Đã cập nhật thất bại!');

        dispatch(resetUpdateAlumnus());
        dispatch(resetUpdateAvatar());
        // eslint-disable-next-line
    }, [updateAlumnusStatus, updateAlumnusError, updateAvatarStatus, updateAvatarError]);

    const handleUpload = () => {
        dispatch(adminUploadAvatar({ data: preview, username: data.userName }));
    };
    const onCrop = (preview) => {
        setPreview(preview);
    };

    const handleAdd = () => {
        const data = getFormData();
        const validateMessage = validateUpdateAlumnus({
            data: data,
            callback: (message) => toast(message),
        });
        if (validateMessage) {
            dispatch(adminUpdateAlumnus({ data }));
        }
    };

    const getFormData = () => ({
        id: data.id,
        firstName: formRef.current['firstName'].value,
        lastName: formRef.current['lastName'].value,
        gender: formRef.current['gender'].value,
        emailAddress: formRef.current['email'].value,
        password: data.password,
    });

    return (
        <div className="update-alumnus">
            <Tabs defaultActiveKey="currentAvatar" id="tab-avatar" className="mb-3">
                <Tab eventKey="currentAvatar" title="Ảnh đại diện">
                    <Form ref={formRef}>
                        <Form.Label>Ảnh đại diện </Form.Label>
                        <div className={cx('wrapper-avatar')}>
                            <div className={cx('job-apply-avt')}>
                                <AvatarCustom
                                    src={
                                        data?.avartar
                                            ? BASE_URL + data.avartar
                                            : '/static/imgs/profile-default-avatar.jpg'
                                    }
                                    alt={data?.userName}
                                    base64={false}
                                />
                            </div>
                        </div>
                        <Form.Group className="mb-3" controlId="lastName">
                            <Form.Label>Họ </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập họ"
                                defaultValue={data.lastName}
                                onBlur={(e) =>
                                    validate(e.target, [RULES.IS_REQUIRE], e.target.value, '.pf-error', 'Họ')
                                }
                            />
                            <p className={cx('form-error', 'pf-error', 'my-form-hidden')}></p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="firstName">
                            <Form.Label>Tên </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tên"
                                defaultValue={data.firstName}
                                onBlur={(e) =>
                                    validate(e.target, [RULES.IS_REQUIRE], e.target.value, '.pf-error', 'Tên')
                                }
                            />
                            <p className={cx('form-error', 'pf-error', 'my-form-hidden')}></p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="gender">
                            <Form.Label>Chọn giới tính</Form.Label>
                            <Form.Select
                                aria-label="Chọn giới tính"
                                defaultValue={data.codeGender}
                                onBlur={(e) =>
                                    validate(e.target, [RULES.IS_REQUIRE], e.target.value, '.cv-error', 'Giới tính')
                                }
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
                                defaultValue={data.emailAddress}
                                onBlur={(e) =>
                                    validate(
                                        e.target,
                                        [RULES.IS_REQUIRE, RULES.IS_EMAIL],
                                        e.target.value,
                                        '.cv-error',
                                        'Email',
                                    )
                                }
                            />
                            <p className={cx('form-error', 'cv-error', 'my-form-hidden')}></p>
                        </Form.Group>
                        <CustomButton
                            wrapperStyle={cx('wrapper-button')}
                            className={cx('confirm-button')}
                            onClick={handleAdd}
                            isLoading={updateAlumnusLoading}
                        >
                            Cập nhật
                        </CustomButton>
                    </Form>
                </Tab>
                <Tab eventKey="changeAvatar" title="Cập nhật ảnh đại diện">
                    <div className={cx('uploadAvatar')}>
                        <Avatar width={550} height={295} onCrop={onCrop} onClose={() => setPreview(null)} src={src} />
                        {!!preview ? (
                            <div>
                                <h3>Xem trước</h3>
                                <img width={200} src={preview} alt="Preview" />
                            </div>
                        ) : null}
                        {!!preview && (
                            <CustomButton
                                wrapperStyle={cx('wrapper-button')}
                                className={cx('confirm-button')}
                                onClick={handleUpload}
                                isLoading={updateAvatarIsLoading}
                            >
                                Cập nhật
                            </CustomButton>
                        )}
                    </div>
                </Tab>
            </Tabs>
        </div>
    );
}

export default UpdateAlumnus;
