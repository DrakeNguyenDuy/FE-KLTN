import { RULES, validateValue } from './Validate';

const handleValidateChangePassword = (data, passwordValue) => {
    const checkCurrentPassword = validateValue(data.current, [RULES.IS_REQUIRE], 'Mật khẩu hiện tại');
    if (!checkCurrentPassword.isValidate) return checkCurrentPassword.message;
    const checkNewPassword = validateValue(data.password, [RULES.IS_REQUIRE, RULES.IS_PASSWORD], 'Mật khẩu mới');
    if (!checkNewPassword.isValidate) return checkNewPassword.message;
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

export const validateChangePassword = ({
    data,
    selector,
    passwordValue,
    callback = () => null,
    showMessage = false,
}) => {
    const errorElement = document.querySelector(selector);
    const validateMessage = handleValidateChangePassword(data, passwordValue);
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
