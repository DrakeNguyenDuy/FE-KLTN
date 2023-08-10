import { RULES, validateValue } from './Validate';

const handleValidateRegisterForm = (data, passwordValue) => {
    // check firstname valid
    const checkFirstName = validateValue(data.firstName, [RULES.IS_REQUIRE], 'Họ');
    if (!checkFirstName.isValidate) return checkFirstName.message;
    // check lastname valid
    const checkLastName = validateValue(data.lastName, [RULES.IS_REQUIRE], 'Tên');
    if (!checkLastName.isValidate) return checkLastName.message;
    // check email valid
    const checkEmail = validateValue(data.emailAddress, [RULES.IS_REQUIRE, RULES.IS_EMAIL], 'Email');
    if (!checkEmail.isValidate) return checkEmail.message;
    const checkPassword = validateValue(data.password, [RULES.IS_REQUIRE, RULES.IS_PASSWORD], 'Mật khẩu');
    if (!checkPassword.isValidate) return checkPassword.message;
    // check confirm password
    const checkConfirmPassword = validateValue(
        data.confirmPassword,
        [RULES.IS_CONFIRM_PASSWORD],
        'Nhập lại mật khẩu',
        passwordValue,
    );
    if (!checkConfirmPassword.isValidate) return checkConfirmPassword.message;
    return null;
};

export const validateRegisterForm = (data, selector, passwordValue) => {
    const errorElement = document.querySelector(selector);
    const validateMessage = handleValidateRegisterForm(data, passwordValue);
    if (validateMessage === null) {
        errorElement.classList.add('my-form-hidden');
        return true;
    } else {
        errorElement.innerText = validateMessage;
        errorElement.classList.remove('my-form-hidden');
        return false;
    }
};
