import styles from './AddEmployer.module.scss';
import className from 'classnames/bind';
import { useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import CustomPassword from '~/components/common/CustomPassword/CustomPassword';
import { RULES, validate } from '~/utils/validates/Validate';
import CustomButton from '~/components/common/CustomButton/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { getListAlumnus } from '~/store/reducers/admin/adminListAlumnusSlice';
import { validateAddEmployer } from '~/utils/validates/addEmployer';

const cx = className.bind(styles);

function AddEmployer({ data, onAdd = () => null, toast, page, search, active }) {
    const formRef = useRef();
    const addEmployerLoading = useSelector((state) => state.adminManageEmployer.addEmployerLoading);

    const dispatch = useDispatch();
    const addEmployerStatus = useSelector((state) => state.adminManageEmployer.addEmployerStatus);
    const addEmployerError = useSelector((state) => state.adminManageEmployer.addEmployerError);

    useEffect(() => {
        if (addEmployerStatus) {
            dispatch(
                getListAlumnus({
                    page,
                    search,
                    active,
                }),
            );
        }
        addEmployerError && toast('Thêm nhà tuyển dụng thất bại, email đã tồn tại!');
        // eslint-disable-next-line
    }, [addEmployerStatus, addEmployerError]);

    const handleAdd = () => {
        const alumnusData = getFormData();
        const validateMessage = validateAddEmployer({
            data: alumnusData,
            callback: (message) => notify(message),
        });
        if (validateMessage) {
            onAdd(alumnusData);
        }
    };

    const getFormData = () => ({
        firstName: formRef.current['firstName'].value,
        lastName: formRef.current['lastName'].value,
        name: formRef.current['companyName'].value,
        email: formRef.current['email'].value,
        phoneNumber: formRef.current['phone'].value,
        city: formRef.current['city'].value,
        address: formRef.current['address'].value,
        password: formRef.current['password'].value,
        repeatPassword: formRef.current['password'].value,
    });

    const notify = (message) => toast(message);

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
                            validate(e.target, [RULES.IS_REQUIRE, RULES.IS_EMAIL], e.target.value, '.cv-error', 'Email')
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
                            validate(e.target, [RULES.IS_REQUIRE], e.target.value, '.cv-error', 'Tỉnh/Thành phố')
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
                            validate(e.target, [RULES.IS_REQUIRE], e.target.value, '.cv-error', 'Địa chỉ cụ thể')
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

                <CustomButton
                    wrapperStyle={cx('wrapper-button')}
                    className={cx('confirm-button')}
                    onClick={handleAdd}
                    isLoading={addEmployerLoading}
                >
                    Thêm
                </CustomButton>
            </Form>
        </>
    );
}

export default AddEmployer;
