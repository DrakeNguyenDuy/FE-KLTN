import { RULES, validateValue } from './Validate';

const handleValidateCreateJob = (data) => {
    // check firstname valid
    const checkName = validateValue(data.name, [RULES.IS_REQUIRE], 'Tên công việc');
    if (!checkName.isValidate) return checkName.message;
    // check lastname valid
    const checkCareer = validateValue(data.career, [RULES.IS_REQUIRE], 'Ngành nghề');
    if (!checkCareer.isValidate) return checkCareer.message;
    // check email valid
    const checkSkills = data.skills.length !== 0;
    if (!checkSkills) return 'Kỹ năng';
    const checkProvince = data.location.province !== 0;
    if (!checkProvince) return 'Tỉnh';
    const checkDistrict = data.location.district !== 0;
    if (!checkDistrict) return 'Quận/huyện';
    const checkWard = data.location.ward !== 0;
    if (!checkWard) return 'Phường xã';
    // check phone valid
    const checkSalary = validateValue(data.salary, [RULES.IS_REQUIRE, RULES.IS_NUMBER], 'Mức lương');
    if (!checkSalary.isValidate) return checkSalary.message;
    // check gender valid
    const checkPaycycle = validateValue(data.paycycle, [RULES.IS_REQUIRE], 'Chu kỳ trả lương');
    if (!checkPaycycle.isValidate) return checkPaycycle.message;
    // check title valid
    const checkJobType = validateValue(data.jobType, [RULES.IS_REQUIRE], 'Hình thức làm việc');
    if (!checkJobType.isValidate) return checkJobType.message;
    // check dob valid
    const checkExprireDate = validateValue(data.exprireDate, [RULES.IS_REQUIRE], 'Hạn nộp hồ sơ');
    if (!checkExprireDate.isValidate) return checkExprireDate.message;
    // check address valid
    const checkGender = validateValue(data.gender, [RULES.IS_REQUIRE], 'Giới tính');
    if (!checkGender.isValidate) return checkGender.message;
    // check english level valid
    const checkExperience = validateValue(data.experience, [RULES.IS_REQUIRE], 'Kinh nghiệm làm việc');
    if (!checkExperience.isValidate) return checkExperience.message;
    // check career valid
    const checkPosition = validateValue(data.position, [RULES.IS_REQUIRE], 'Vị trí ứng tuyển');
    if (!checkPosition.isValidate) return checkPosition.message;
    const checkNumberOfRecruitments = validateValue(
        data.numberOfRecruitments,
        [RULES.IS_REQUIRE, RULES.IS_NUMBER],
        'Số lượng tuyển',
    );
    if (!checkNumberOfRecruitments.isValidate) return checkNumberOfRecruitments.message;
    return null;
};

export const validateCreateJob = ({ data, selector, callback = () => null, showMessage = false }) => {
    let errorElement = null;
    showMessage && (errorElement = document.querySelector(selector));
    const validateMessage = handleValidateCreateJob(data);
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
