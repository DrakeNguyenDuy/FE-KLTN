import { RULES, validateValue } from './Validate';

const handleValidateLogin = (data) => {
    const checkUsername = validateValue(data.username, [RULES.IS_REQUIRE], 'Email');
    if (!checkUsername.isValidate) return checkUsername.message;
    const checkNewPassword = validateValue(data.password, [RULES.IS_REQUIRE], 'Mật khẩu');
    if (!checkNewPassword.isValidate) return checkNewPassword.message;
    return null;
};

export const validateLogin = ({ data, selector, callback = () => null, showMessage = false }) => {
    let errorElement = null;
    showMessage && (errorElement = document.querySelector(selector));
    const validateMessage = handleValidateLogin(data);
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
