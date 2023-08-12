export const validate = (currentElement, rules, value, selector, fieldName, passwordValue) => {
    let isValidate = true;
    let message = '';
    for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        let test = true;
        if (rule === RULES.IS_CONFIRM_PASSWORD) {
            test = validateObj[rule].test(value, passwordValue);
        } else {
            test = validateObj[rule].test(value, validateObj[rule].pattern);
        }
        if (!test) {
            isValidate = false;
            message = fieldName ? fieldName + ' ' : 'Trường này ';
            message += validateObj[rule].message;
            break;
        }
    }
    const errorElement = getErrorEmelent(currentElement, selector);
    if (isValidate) {
        errorElement.classList.add('my-form-hidden');
    } else {
        errorElement.innerText = message;
        errorElement.classList.remove('my-form-hidden');
    }
};
export const validateValue = (value, rules, fieldName, passwordValue) => {
    let isValidate = true;
    let message = '';
    for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        let test = true;
        if (rule === RULES.IS_CONFIRM_PASSWORD) {
            test = validateObj[rule].test(value, passwordValue);
        } else {
            test = validateObj[rule].test(value, validateObj[rule].pattern);
        }
        if (!test) {
            isValidate = false;
            message = fieldName ? fieldName + ' ' : 'Trường này ';
            message += validateObj[rule].message;
            break;
        }
    }
    let result = {
        isValidate,
        message,
    };
    return result;
};

export const validateObj = {
    isRequire: {
        message: 'không được bỏ trống',
        pattern: '',
        test: (value, pattern) => value !== null && value.trim().length !== 0,
    },
    isNotSpecialCharacters: {
        message: 'không chứa ký tự đặc biệt',
        pattern: /^[a-zA-Z]+ [a-zA-Z]+$/,
        test: (value, pattern) => pattern.test(value),
    },
    isEmail: {
        message: 'chưa đúng định dạng email',
        pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
        test: (value, pattern) => pattern.test(value),
    },
    isPhoneNumber: {
        message: 'chưa đúng định dạng số điện thoại',
        pattern: /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/,
        test: (value, pattern) => pattern.test(value),
    },
    isPassword: {
        message: 'từ 6 đến 12 kí tự bao gồm ít nhất một chữ hoa, một chữ thường và một chữ số',
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,12}$/,
        test: (value, pattern) => pattern.test(value),
    },
    isConfirmPassword: {
        message: 'không trùng khớp',
        test: (value, targetPassWorldValue) => value === targetPassWorldValue,
    },
    isNumber: {
        message: 'phải là số',
        pattern: /^\d+$/,
        test: (value, pattern) => pattern.test(value),
    },
};

export const RULES = {
    IS_REQUIRE: 'isRequire',
    IS_NOT_SPECIAL_CHARACTERS: 'isNotSpecialCharacters',
    IS_EMAIL: 'isEmail',
    IS_PHONE_NUMBER: 'isPhoneNumber',
    IS_PASSWORD: 'isPassword',
    IS_CONFIRM_PASSWORD: 'isConfirmPassword',
    IS_NUMBER: 'isNumber',
};

export const getErrorEmelent = (currentElement, selector) => {
    let parent = null;
    let i = 0;
    let parentElement = currentElement.parentElement;
    while (parent === null) {
        parent = parentElement.querySelector(selector);
        parentElement = parentElement.parentElement;
        i++;
        if (i > 20) break;
    }
    return parent;
};
