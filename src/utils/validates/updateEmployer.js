import { RULES, validateValue } from './Validate';

const handleValidateUpdateEmployer = (data) => {
    const checkLastname = validateValue(data.lastName, [RULES.IS_REQUIRE], 'Họ');
    if (!checkLastname.isValidate) return checkLastname.message;

    const checkFirstname = validateValue(data.firstName, [RULES.IS_REQUIRE], 'Tên');
    if (!checkFirstname.isValidate) return checkFirstname.message;

    const checkCompanyName = validateValue(data.name, [RULES.IS_REQUIRE], 'Tên công ty');
    if (!checkCompanyName.isValidate) return checkCompanyName.message;

    const checkEmail = validateValue(data.email, [RULES.IS_REQUIRE, RULES.IS_EMAIL], 'Email');
    if (!checkEmail.isValidate) return checkEmail.message;

    const checkPhone = validateValue(data.phoneNumber, [RULES.IS_REQUIRE, RULES.IS_PHONE_NUMBER], 'Số điện thoại');
    if (!checkPhone.isValidate) return checkPhone.message;

    const checkCity = validateValue(data.city, [RULES.IS_REQUIRE], 'Tỉnh/Thành phố');
    if (!checkCity.isValidate) return checkCity.message;

    const checkAddress = validateValue(data.address, [RULES.IS_REQUIRE], 'Địa chỉ cụ thể');
    if (!checkAddress.isValidate) return checkAddress.message;

    return null;
};

export const validateUpdateEmployer = ({ data, selector, callback = () => null, showMessage = false }) => {
    let errorElement = null;
    showMessage && (errorElement = document.querySelector(selector));
    const validateMessage = handleValidateUpdateEmployer(data);
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
