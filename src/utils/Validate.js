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

const validateObj = {
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
        message: 'tối thiểu tám ký tự, ít nhất một chữ cái và một số',
        pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        test: (value, pattern) => pattern.test(value),
    },
    isConfirmPassword: {
        message: 'không trùng khớp',
        test: (value, targetPassWorldValue) => value === targetPassWorldValue,
    },
};

export const RULES = {
    IS_REQUIRE: 'isRequire',
    IS_NOT_SPECIAL_CHARACTERS: 'isNotSpecialCharacters',
    IS_EMAIL: 'isEmail',
    IS_PHONE_NUMBER: 'isPhoneNumber',
    IS_PASSWORD: 'isPassword',
    IS_CONFIRM_PASSWORD: 'isConfirmPassword',
};

const getErrorEmelent = (currentElement, selector) => {
    let parent = null;
    let i = 0;
    let parentElement = currentElement.parentElement;
    while (parent === null) {
        parent = parentElement.querySelector(selector);
        parentElement = parentElement.parentElement;
        console.log('áda', parent);
        i++;
        if (i > 20) break;
    }
    return parent;
};

const handleValidateUpdateCV = (data) => {
    // check firstname valid
    const checkFirstName = validateValue(data.firstName, [RULES.IS_REQUIRE], 'Họ');
    if (!checkFirstName.isValidate) return checkFirstName.message;
    // check lastname valid
    const checkLastName = validateValue(data.lastName, [RULES.IS_REQUIRE], 'Tên');
    if (!checkLastName.isValidate) return checkLastName.message;
    // check email valid
    const checkEmail = validateValue(data.email, [RULES.IS_REQUIRE, RULES.IS_EMAIL], 'Email');
    if (!checkEmail.isValidate) return checkEmail.message;
    // check phone valid
    const checkPhone = validateValue(data.phoneNumber, [RULES.IS_REQUIRE, RULES.IS_PHONE_NUMBER], 'Số điện thoại');
    if (!checkPhone.isValidate) return checkPhone.message;
    // check gender valid
    const checkGender = validateValue(data.gender, [RULES.IS_REQUIRE], 'Giới tính');
    if (!checkGender.isValidate) return checkGender.message;
    // check title valid
    const checkTitle = validateValue(data.title, [RULES.IS_REQUIRE], 'Vị trí ứng tuyển');
    if (!checkTitle.isValidate) return checkTitle.message;
    // check dob valid
    const checkDob = validateValue(data.dob, [RULES.IS_REQUIRE], 'Ngày sinh');
    if (!checkDob.isValidate) return checkDob.message;
    // check address valid
    const checkAddress = validateValue(data.address, [RULES.IS_REQUIRE], 'Địa chỉ');
    if (!checkAddress.isValidate) return checkAddress.message;
    // check english level valid
    const checkEnglishLV = validateValue(data.englishLevel.code, [RULES.IS_REQUIRE], 'Trình độ tiếng anh');
    if (!checkEnglishLV.isValidate) return checkEnglishLV.message;
    // check career valid
    const checkCareer = validateValue(data.carrer.code, [RULES.IS_REQUIRE], 'Ngành nghề');
    if (!checkCareer.isValidate) return checkCareer.message;
    // check contacts valid
    let checkContacts = true;
    let checkContactMessage = '';
    for (let i = 0; i < data.contacts.length; i++) {
        const contact = data.contacts[i];
        const checkContact = validateValue(contact.name, [RULES.IS_REQUIRE], 'Liên hệ');
        if (!checkContact.isValidate) {
            checkContacts = false;
            checkContactMessage = checkContact.message;
            break;
        }
    }
    if (!checkContacts) return checkContactMessage;
    // check skills valid
    let checkSkills = true;
    let checkSkillMessage = '';
    for (let i = 0; i < data.skills.length; i++) {
        const skill = data.skills[i];
        const checkSkill = validateValue(skill.nameSkill, [RULES.IS_REQUIRE], 'Tên liên hệ');
        if (!checkSkill.isValidate) {
            checkSkills = false;
            checkSkillMessage = checkSkill.message;
            break;
        }
    }
    if (!checkSkills) return checkSkillMessage;
    // check education valid
    let checkEducations = true;
    let checkEducationMessage = '';
    for (let i = 0; i < data.educations.length; i++) {
        const education = data.educations[i];
        const checkSchoolName = validateValue(education.school, [RULES.IS_REQUIRE], 'Tên trường');
        if (!checkSchoolName.isValidate) {
            checkEducations = false;
            checkEducationMessage = checkSchoolName.message;
            break;
        } else {
            const checkMajor = validateValue(education.major, [RULES.IS_REQUIRE], 'Chuyên ngành');
            if (!checkMajor.isValidate) {
                checkEducations = false;
                checkEducationMessage = checkMajor.message;
                break;
            } else {
                const checkStartDate = validateValue(education.startDate, [RULES.IS_REQUIRE], 'Ngày bắt đầu học');
                if (!checkStartDate.isValidate) {
                    checkEducations = false;
                    checkEducationMessage = checkStartDate.message;
                    break;
                } else {
                    console.log(education.isGraduated === 'true');
                    if (education.isGraduated === 'true') {
                        const checkEndDate = validateValue(education.endDate, [RULES.IS_REQUIRE], 'Ngày kết thúc học');
                        if (!checkEndDate.isValidate) {
                            checkEducations = false;
                            checkEducationMessage = checkEndDate.message;
                            break;
                        }
                    }
                }
            }
        }
    }
    if (!checkEducations) return checkEducationMessage;
    // check experience valid
    let checkExperiences = true;
    let checkExperienceMessage = '';
    for (let i = 0; i < data.workExperiences.length; i++) {
        const experience = data.workExperiences[i];
        const checkTitlePosition = validateValue(experience.titlePosition, [RULES.IS_REQUIRE], 'Vị trí làm việc');
        if (!checkTitlePosition.isValidate) {
            checkExperiences = false;
            checkExperienceMessage = checkTitlePosition.message;
            break;
        } else {
            const checkCompanyName = validateValue(experience.companyName, [RULES.IS_REQUIRE], 'Tên công ty');
            if (!checkCompanyName.isValidate) {
                checkExperiences = false;
                checkExperienceMessage = checkCompanyName.message;
                break;
            } else {
                const checkStartDate = validateValue(experience.startDate, [RULES.IS_REQUIRE], 'Ngày bắt đầu làm việc');
                if (!checkStartDate.isValidate) {
                    checkExperiences = false;
                    checkExperienceMessage = checkStartDate.message;
                    break;
                } else {
                    if (experience.isCurrent === 'false') {
                        const checkEndDate = validateValue(
                            experience.endDate,
                            [RULES.IS_REQUIRE],
                            'Ngày kết thúc làm việc',
                        );
                        if (!checkEndDate.isValidate) {
                            checkExperiences = false;
                            checkExperienceMessage = checkEndDate.message;
                            break;
                        }
                    }
                }
            }
        }
    }
    if (!checkExperiences) return checkExperienceMessage;
    // check certificates valid
    let checkCertificates = true;
    let checkCertificateMessage = '';
    for (let i = 0; i < data.certificates.length; i++) {
        const certificate = data.certificates[i];
        const checkCertificate = validateValue(certificate.name, [RULES.IS_REQUIRE], 'Tên bằng cấp');
        if (!checkCertificate.isValidate) {
            checkContacts = false;
            checkContactMessage = checkCertificate.message;
            break;
        }
    }
    if (!checkCertificates) return checkCertificateMessage;
    return null;
};

const handleValidateUpdateProfile = (data) => {
    // check firstname valid
    const checkFirstName = validateValue(data.firstName, [RULES.IS_REQUIRE], 'Họ');
    if (!checkFirstName.isValidate) return checkFirstName.message;
    // check lastname valid
    const checkLastName = validateValue(data.lastName, [RULES.IS_REQUIRE], 'Tên');
    if (!checkLastName.isValidate) return checkLastName.message;
    // check gender valid
    const checkGender = validateValue(data.gender, [RULES.IS_REQUIRE], 'Giới tính');
    if (!checkGender.isValidate) return checkGender.message;
    // check english level valid
    const checkEnglishLV = validateValue(data.englishLevel, [RULES.IS_REQUIRE], 'Trình độ tiếng anh');
    if (!checkEnglishLV.isValidate) return checkEnglishLV.message;
    // check career valid
    const checkCareer = validateValue(data.carrer, [RULES.IS_REQUIRE], 'Ngành nghề');
    if (!checkCareer.isValidate) return checkCareer.message;
    // check experience valid
    const checkExperience = validateValue(data.experince, [RULES.IS_REQUIRE], 'Kinh nghiệm làm việc');
    if (!checkExperience.isValidate) return checkExperience.message;
    // check work type
    const checkWorkType = validateValue(data.formWork, [RULES.IS_REQUIRE], 'Hình thức làm việc');
    if (!checkWorkType.isValidate) return checkWorkType.message;
    // check address valid
    const checkAddress = validateValue(data.districts, [RULES.IS_REQUIRE], 'Địa chỉ');
    if (!checkAddress.isValidate) return checkAddress.message;
    // check pay circle valid
    const checkPayCircle = validateValue(data.payCycle, [RULES.IS_REQUIRE], 'Hình thức trả lương');
    if (!checkPayCircle.isValidate) return checkPayCircle.message;

    // check skills valid
    let checkSkills = true;
    let checkSkillMessage = '';
    for (let i = 0; i < data.skills.length; i++) {
        const skill = data.skills[i];
        console.log(skill);
        const checkIdSkill = data.idSkill !== 0;
        if (!checkIdSkill) {
            checkSkills = false;
            checkSkillMessage = 'Kỹ năng không được bỏ trống';
            break;
        } else {
            const checkRate = skill.rate !== 0;
            if (!checkRate) {
                checkSkills = false;
                checkSkillMessage = 'Độ ưu tiên kỹ năng không được bỏ trống';
                break;
            }
        }
    }
    if (!checkSkills) return checkSkillMessage;
    return null;
};

const handleValidateCreateProfile = (data) => {
    // check career valid
    const checkCareer = validateValue(data.carrer, [RULES.IS_REQUIRE], 'Ngành nghề');
    if (!checkCareer.isValidate) return checkCareer.message;
    // check experience valid
    const checkExperience = validateValue(data.experience, [RULES.IS_REQUIRE], 'Kinh nghiệm làm việc');
    if (!checkExperience.isValidate) return checkExperience.message;
    // check english level valid
    const checkEnglishLV = validateValue(data.englishLevel, [RULES.IS_REQUIRE], 'Trình độ tiếng anh');
    if (!checkEnglishLV.isValidate) return checkEnglishLV.message;
    // check work type
    const checkWorkType = validateValue(data.formWork, [RULES.IS_REQUIRE], 'Hình thức làm việc');
    if (!checkWorkType.isValidate) return checkWorkType.message;
    // check pay circle valid
    const checkPayCircle = validateValue(data.paycycle, [RULES.IS_REQUIRE], 'Hình thức trả lương');
    if (!checkPayCircle.isValidate) return checkPayCircle.message;
    // check address valid
    const checkAddress = validateValue(data.districts, [RULES.IS_REQUIRE], 'Địa chỉ');
    if (!checkAddress.isValidate) return checkAddress.message;

    // check skills valid
    let checkSkills = true;
    let checkSkillMessage = '';
    for (let i = 0; i < data.skills.length; i++) {
        const skill = data.skills[i];
        console.log(skill);
        const checkIdSkill = data.idSkill !== 0;
        if (!checkIdSkill) {
            checkSkills = false;
            checkSkillMessage = 'Kỹ năng không được bỏ trống';
            break;
        } else {
            const checkRate = skill.rate !== 0;
            if (!checkRate) {
                checkSkills = false;
                checkSkillMessage = 'Độ ưu tiên kỹ năng không được bỏ trống';
                break;
            }
        }
    }
    if (!checkSkills) return checkSkillMessage;
    return null;
};

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

export const validateUpdateCV = (data, selector) => {
    const errorElement = document.querySelector(selector);
    const validateMessage = handleValidateUpdateCV(data);
    if (validateMessage === null) {
        errorElement.classList.add('my-form-hidden');
        return true;
    } else {
        errorElement.innerText = validateMessage;
        errorElement.classList.remove('my-form-hidden');
        return false;
    }
};

export const validateUpdateProfile = (data, selector) => {
    const errorElement = document.querySelector(selector);
    const validateMessage = handleValidateUpdateProfile(data);
    if (validateMessage === null) {
        errorElement.classList.add('my-form-hidden');
        return true;
    } else {
        errorElement.innerText = validateMessage;
        errorElement.classList.remove('my-form-hidden');
        return false;
    }
};

export const validateCreateProfile = (data, selector) => {
    const errorElement = document.querySelector(selector);
    const validateMessage = handleValidateCreateProfile(data);
    if (validateMessage === null) {
        errorElement.classList.add('my-form-hidden');
        return true;
    } else {
        errorElement.innerText = validateMessage;
        errorElement.classList.remove('my-form-hidden');
        return false;
    }
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