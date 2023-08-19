import styles from './UpdateEmployer.module.scss';
import className from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import Avatar from 'react-avatar-edit';
import { Form, Tab, Tabs } from 'react-bootstrap';
import CustomButton from '~/components/common/CustomButton/CustomButton';
import { RULES, validate } from '~/utils/validates/Validate';
import './UpdateEmployer.scss';
import { useDispatch, useSelector } from 'react-redux';
import { validateUpdateEmployer } from '~/utils/validates/updateEmployer';
import {
    adminUpdateEmployer,
    resetUpdateEmployer,
    adminUploadAvatar,
    resetUpdateAvatar,
} from '~/store/reducers/admin/adminListEmployerSlice';

const cx = className.bind(styles);

function UpdateEmployer({ data, toast }) {
    const formRef = useRef();
    const dispatch = useDispatch();

    const updateEmployerStatus = useSelector((state) => state.adminManageEmployer.updateEmployerStatus);
    const updateEmployerError = useSelector((state) => state.adminManageEmployer.updateEmployerError);
    const updateEmployerLoading = useSelector((state) => state.adminManageEmployer.updateEmployerLoading);

    const updateAvatarStatus = useSelector((state) => state.adminManageEmployer.updateAvatarStatus);
    const updateAvatarIsLoading = useSelector((state) => state.adminManageEmployer.updateAvatarIsLoading);
    const updateAvatarError = useSelector((state) => state.adminManageEmployer.updateAvatarError);

    const [src, setSrc] = useState('');
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        updateEmployerStatus && toast('Đã cập nhật thành công!');
        updateEmployerError && toast('Đã cập nhật thất bại!');

        updateAvatarStatus && toast('Đã cập nhật thành công!');
        updateAvatarError && toast('Đã cập nhật thất bại!');

        dispatch(resetUpdateEmployer());
        dispatch(resetUpdateAvatar());
        // eslint-disable-next-line
    }, [updateEmployerStatus, updateEmployerError, updateAvatarStatus, updateAvatarError]);

    const handleUpload = () => {
        dispatch(adminUploadAvatar({ data: preview, username: data?.code }));
    };
    const onCrop = (preview) => {
        setPreview(preview);
    };

    const handleAdd = () => {
        const data = getFormData();
        const validateMessage = validateUpdateEmployer({
            data: data,
            callback: (message) => toast(message),
        });
        if (validateMessage) {
            dispatch(adminUpdateEmployer({ data }));
        }
    };

    const getFormData = () => ({
        id: data.id,
        firstName: formRef.current['firstName'].value,
        lastName: formRef.current['lastName'].value,
        name: formRef.current['companyName'].value,
        email: formRef.current['email'].value,
        phoneNumber: formRef.current['phone'].value,
        city: formRef.current['city'].value,
        address: formRef.current['address'].value,
    });

    return (
        <div className="update-alumnus">
            <Tabs defaultActiveKey="currentAvatar" id="tab-avatar" className="mb-3">
                <Tab eventKey="currentAvatar" title="Ảnh đại diện">
                    <Form ref={formRef}>
                        <Form.Group className="mb-3" controlId="lastName">
                            <Form.Label>Họ </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập họ"
                                defaultValue={data?.readableAudit?.lastName}
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
                                defaultValue={data?.readableAudit?.firstName}
                                onBlur={(e) =>
                                    validate(e.target, [RULES.IS_REQUIRE], e.target.value, '.pf-error', 'Tên')
                                }
                            />
                            <p className={cx('form-error', 'pf-error', 'my-form-hidden')}></p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="companyName">
                            <Form.Label>Tên công ty</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tên công ty"
                                defaultValue={data?.name}
                                onBlur={(e) =>
                                    validate(e.target, [RULES.IS_REQUIRE], e.target.value, '.pf-error', 'Tên công ty')
                                }
                            />
                            <p className={cx('form-error', 'pf-error', 'my-form-hidden')}></p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email </Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Nhập email"
                                defaultValue={data?.email}
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
                        <Form.Group className="mb-3" controlId="phone">
                            <Form.Label>Số điện thoại </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập số điện thoại"
                                defaultValue={data?.phone}
                                onBlur={(e) =>
                                    validate(
                                        e.target,
                                        [RULES.IS_REQUIRE, RULES.IS_PHONE_NUMBER],
                                        e.target.value,
                                        '.cv-error',
                                        'Số điện thoại',
                                    )
                                }
                            />
                            <p className={cx('form-error', 'cv-error', 'my-form-hidden')}></p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="city">
                            <Form.Label>Tỉnh/Thành phố </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập Tỉnh/Thành phố"
                                defaultValue={data?.address?.city}
                                onBlur={(e) =>
                                    validate(
                                        e.target,
                                        [RULES.IS_REQUIRE],
                                        e.target.value,
                                        '.cv-error',
                                        'Tỉnh/Thành phố',
                                    )
                                }
                            />
                            <p className={cx('form-error', 'cv-error', 'my-form-hidden')}></p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="address">
                            <Form.Label>Địa chỉ cụ thể </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập địa chỉ cụ thể"
                                defaultValue={data?.address?.address}
                                onBlur={(e) =>
                                    validate(
                                        e.target,
                                        [RULES.IS_REQUIRE],
                                        e.target.value,
                                        '.cv-error',
                                        'Địa chỉ cụ thể',
                                    )
                                }
                            />
                            <p className={cx('form-error', 'cv-error', 'my-form-hidden')}></p>
                        </Form.Group>
                        <CustomButton
                            wrapperStyle={cx('wrapper-button')}
                            className={cx('confirm-button')}
                            onClick={handleAdd}
                            isLoading={updateEmployerLoading}
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

export default UpdateEmployer;
