import { RULES, validateValue } from './Validate';

const handleValidateUpdateProfileEmployer = (data) => {
    // check company name valid
    const checkCompanyName = validateValue(data.name, [RULES.IS_REQUIRE], 'Tên công ty');
    if (!checkCompanyName.isValidate) return checkCompanyName.message;
    // check num of employee valid
    const checkNumEmployee = validateValue(
        data.numOfEmployee,
        [RULES.IS_REQUIRE, RULES.IS_NUMBER],
        'Số lượng nhân viên',
    );
    if (!checkNumEmployee.isValidate) return checkNumEmployee.message;
    // check phone number valid
    const checkPhoneNumber = validateValue(data.phoneNumber, [RULES.IS_PHONE_NUMBER], 'Số điện thoại');
    if (!checkPhoneNumber.isValidate) return checkPhoneNumber.message;
    const checkAddress = validateValue(data.address, [RULES.IS_REQUIRE], 'Địa chỉ công ty');
    if (!checkAddress.isValidate) return checkAddress.message;
    const checkSlogan = validateValue(data.sologan, [RULES.IS_REQUIRE], 'Slogan công ty');
    if (!checkSlogan.isValidate) return checkSlogan.message;
    const checkDescription = validateValue(data.description, [RULES.IS_REQUIRE], 'Mô tả công ty');
    if (!checkDescription.isValidate) return checkDescription.message;
    return null;
};

export const validateUpdateProfileEmployer = ({ data, selector, callback = () => null, showMessage = false }) => {
    let errorElement = null;
    showMessage && (errorElement = document.querySelector(selector));
    const validateMessage = handleValidateUpdateProfileEmployer(data);
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
