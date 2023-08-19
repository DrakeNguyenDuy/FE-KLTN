import { RULES, validateValue } from './Validate';

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
