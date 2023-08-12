import { RULES, validateValue } from './Validate';

const handleValidateCompanyInfor = (data) => {
    // check company name valid
    const checkCompanyName = validateValue(data.name, [RULES.IS_REQUIRE], 'Tên công ty');
    if (!checkCompanyName.isValidate) return checkCompanyName.message;
    // check phone number valid
    const checkPhoneNumber = validateValue(data.phoneNumber, [RULES.IS_PHONE_NUMBER], 'Số điện thoại');
    if (!checkPhoneNumber.isValidate) return checkPhoneNumber.message;
    // check province valid
    const checkProvince = validateValue(data.city, [RULES.IS_REQUIRE], 'Tỉnh/Thành phố');
    if (!checkProvince.isValidate) return checkProvince.message;
    const checkAddress = validateValue(data.address, [RULES.IS_REQUIRE], 'Địa chỉ công ty');
    if (!checkAddress.isValidate) return checkAddress.message;
    return null;
};

const handleValidateRegisterEmployerForm = (data, passwordValue) => {
    // check firstname valid
    const checkFirstName = validateValue(data.firstName, [RULES.IS_REQUIRE], 'Họ');
    if (!checkFirstName.isValidate) return checkFirstName.message;
    // check lastname valid
    const checkLastName = validateValue(data.lastName, [RULES.IS_REQUIRE], 'Tên');
    if (!checkLastName.isValidate) return checkLastName.message;
    // check email valid
    const checkEmail = validateValue(data.email, [RULES.IS_REQUIRE, RULES.IS_EMAIL], 'Email');
    if (!checkEmail.isValidate) return checkEmail.message;
    const checkPassword = validateValue(data.password, [RULES.IS_REQUIRE, RULES.IS_PASSWORD], 'Mật khẩu');
    if (!checkPassword.isValidate) return checkPassword.message;
    // check confirm password
    const checkConfirmPassword = validateValue(
        data.repeatPassword,
        [RULES.IS_CONFIRM_PASSWORD],
        'Nhập lại mật khẩu',
        passwordValue,
    );
    if (!checkConfirmPassword.isValidate) return checkConfirmPassword.message;
    return null;
};

export const validateRegisterEmployerForm = ({
    data,
    selector,
    callback = () => null,
    showMessage = false,
    passwordValue,
}) => {
    let errorElement = null;
    showMessage && (errorElement = document.querySelector(selector));
    const validateMessage = handleValidateRegisterEmployerForm(data, passwordValue);
    if (validateMessage === null) {
        showMessage && errorElement.classList.add('my-form-hidden');
        return true;
    } else {
        if (showMessage) {
            errorElement.innerText = validateMessage;
            errorElement.classList.remove('my-form-hidden');
        }
        callback(validateMessage);
        return false;
    }
};

export const validateCompanyInfor = ({ data, selector, callback = () => null, showMessage = false }) => {
    let errorElement = null;
    showMessage && (errorElement = document.querySelector(selector));
    const validateMessage = handleValidateCompanyInfor(data);
    if (validateMessage === null) {
        showMessage && errorElement.classList.add('my-form-hidden');
        return true;
    } else {
        if (showMessage) {
            errorElement.innerText = validateMessage;
            errorElement.classList.remove('my-form-hidden');
        }
        callback(validateMessage);
        return false;
    }
};
