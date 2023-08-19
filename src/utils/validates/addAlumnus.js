import { RULES, validateValue } from './Validate';

const handleValidateAddAlumnus = (data) => {
    // check firstname valid
    const checkLastname = validateValue(data.lastName, [RULES.IS_REQUIRE], 'Họ');
    if (!checkLastname.isValidate) return checkLastname.message;
    const checkFirstname = validateValue(data.firstName, [RULES.IS_REQUIRE], 'Tên');
    if (!checkFirstname.isValidate) return checkFirstname.message;
    const checkGender = validateValue(data.gender, [RULES.IS_REQUIRE], 'Giới tính');
    if (!checkGender.isValidate) return checkGender.message;
    const checkEmail = validateValue(data.email, [RULES.IS_REQUIRE, RULES.IS_EMAIL], 'Email');
    if (!checkEmail.isValidate) return checkEmail.message;
    const checkPassword = validateValue(data.password, [RULES.IS_REQUIRE, RULES.IS_PASSWORD], 'Mật khẩu');
    if (!checkPassword.isValidate) return checkPassword.message;
    return null;
};

export const validateAddAlumnus = ({ data, selector, callback = () => null, showMessage = false }) => {
    let errorElement = null;
    showMessage && (errorElement = document.querySelector(selector));
    const validateMessage = handleValidateAddAlumnus(data);
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
