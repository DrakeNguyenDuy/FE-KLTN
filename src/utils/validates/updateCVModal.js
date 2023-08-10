import { RULES, validateValue } from './Validate';

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
