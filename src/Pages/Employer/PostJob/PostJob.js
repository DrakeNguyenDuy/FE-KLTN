import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import className from 'classnames/bind';
import { Form, Modal } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import Select from 'react-select';
import styles from './PostJob.module.scss';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CustomBreadCrumb from '~/components/common/CustomBreadCrumb';
import CustomButton from '~/components/common/CustomButton';
import { getCareer } from '~/store/reducers/common/careerSlice';
import { getSkill } from '~/store/reducers/common/skillSlice';
import { getTypeWork } from '~/store/reducers/common/typeWorkSlice';
import { getExperience } from '~/store/reducers/common/experienceSlice';
import { getPosition } from '~/store/reducers/common/positionSlice';
import { createJob, getJobDetail, updateJob } from '~/store/reducers/common/jobSlice';
import { getPaycycle } from '~/store/reducers/common/paycycleSlice';
import { getDistrict, getProvince, getWard, resetDistrict, resetWard } from '~/store/reducers/common/locationSlice';
import { useLocation } from 'react-router-dom';
import Loading from '~/components/common/Loading/Loading';

const cx = className.bind(styles);
const modules = {
    toolbar: [
        [{ font: [] }],
        [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }],
        [{ size: [] }],
        [{ align: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ color: [] }, { background: [] }],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block'],
    ],
};
const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block',
    'align',
    'color',
    'background',
];
const breadcrumbItems = [
    { name: 'Trang chủ', href: '/employer' },
    { name: 'Đăng việc', href: '/employer/post-job' },
];

function PostJob({ data }) {
    const [showModal, setShowModal] = useState(false);

    const jobDetails = useSelector((state) => state.job.jobDetails);

    const [jobDescription, setJobDescription] = useState(data ? data.description : '');
    const [skillSelected, setSkillSelected] = useState(data ? data.skills : []);
    const [addressDetail, setAddressDetail] = useState(data ? data.addressDetail : '');
    const [selectDistrict, setSelectDistrict] = useState(!data);
    const [selectWard, setSelectWard] = useState(!data);
    const [enterDetailAddress, SetEnterDetailAddress] = useState(!data);

    const dispath = useDispatch();
    const user = useSelector((state) => state.employerAuth.user);
    const careers = useSelector((state) => state.career.careers);
    const skills = useSelector((state) => state.skill.skills);
    const typeWorks = useSelector((state) => state.typeWork.typeWorks);
    const experiences = useSelector((state) => state.experience.experiences);
    const positions = useSelector((state) => state.position.positions);
    const provinces = useSelector((state) => state.location.provinces);
    const districts = useSelector((state) => state.location.districts);
    const wards = useSelector((state) => state.location.wards);
    const paycycles = useSelector((state) => state.paycycle.paycycles);

    const createJobStatus = useSelector((state) => state.job.createJobStatus);
    const createJobStatusLoading = useSelector((state) => state.job.createJobStatusLoading);
    const createJobStatusError = useSelector((state) => state.job.createJobStatusError);

    const updateJobStatus = useSelector((state) => state.job.updateJobStatus);
    const updateJobStatusLoading = useSelector((state) => state.job.updateJobStatusLoading);
    const updateJobStatusError = useSelector((state) => state.job.updateJobStatusError);

    const formRef = useRef();

    useEffect(() => {
        dispath(getCareer());
        dispath(getSkill());
        dispath(getTypeWork());
        dispath(getExperience());
        dispath(getPosition());
        dispath(getProvince());
        dispath(getPaycycle());
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        createJobStatus && toast('Đã tạo công việc thành công!');
        createJobStatusError && toast('Đã tạo công việc thất bại hãy điền đủ thông tin!');
    }, [createJobStatus, createJobStatusError]);

    useEffect(() => {
        updateJobStatus && toast('Đã cập nhật công việc thành công!');
        updateJobStatusError && toast('Đã cập nhật công việc thất bại hãy điền đủ thông tin!');
    }, [updateJobStatus, updateJobStatusError]);

    const handleSaveJob = () => {
        setShowModal(true);
    };

    const handlePostJobNow = () => {
        const jobData = getFormData();
        dispath(createJob({ ...jobData, employerCode: user.code }));
        setShowModal(false);
    };

    const handlePostJobLater = () => {
        const jobData = getFormData();
        jobData.status = 'INACTIVE';
        dispath(createJob({ ...jobData, employerCode: user.code }));
        setShowModal(false);
    };

    const handleUpdateJob = () => {
        const jobData = getFormData();
        jobData['identifier'] = data.sku;
        jobData['sku'] = data.sku;
        dispath(updateJob({ data: jobData, code: user.code, id: data?.id }));
    };

    const getFormData = () => ({
        name: formRef.current['jobName'].value,
        career: formRef.current['jobCareer'].value,
        skills: skillSelected,
        location: {
            detailAddress: formRef.current['detailAddress'].value,
            ward: +formRef.current['ward'].value,
            district: +formRef.current['district'].value,
            province: +formRef.current['province'].value,
        },
        salary: +formRef.current['salary'].value,
        paycycle: formRef.current['paycycle'].value,
        jobType: formRef.current['JobWorkType'].value,
        exprireDate: formRef.current['JobExpriedDate'].value,
        gender: formRef.current['JobGender'].value,
        experience: formRef.current['JobExperience'].value,
        position: formRef.current['JobPosition'].value,
        numberOfRecruitments: +formRef.current['JobNum'].value,
        description: jobDescription,
        status: 'ACTIVE',
    });
    const handleChangeProvince = (value) => {
        if (value === '0') {
            handleChangeDistrict('0');
            dispath(resetDistrict());
            setSelectDistrict(true);
        } else {
            dispath(getDistrict(value));
            handleChangeDistrict('0');
            setSelectDistrict(false);
        }
    };

    const handleChangeDistrict = (value) => {
        if (value === '0') {
            dispath(resetWard());
            handleChangeWard('0');
            setSelectWard(true);
        } else {
            dispath(getWard(value));
            handleChangeWard('0');
            setSelectWard(false);
        }
    };

    const handleChangeWard = (value) => {
        if (value === '0') {
            setAddressDetail('');
            SetEnterDetailAddress(true);
        } else {
            setAddressDetail('');
            SetEnterDetailAddress(false);
        }
    };

    return createJobStatusLoading || updateJobStatusLoading ? (
        <Loading />
    ) : user ? (
        <div className={cx('wrapper', 'post-job')}>
            <ToastContainer />
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Chọn hình thức đăng việc</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có muốn đăng việc ngay?</Modal.Body>
                <Modal.Footer>
                    <CustomButton onClick={handlePostJobNow}>Đăng việc ngay</CustomButton>
                    <CustomButton onClick={handlePostJobLater}>Đăng sau</CustomButton>
                </Modal.Footer>
            </Modal>
            {/* <CustomBreadCrumb items={breadcrumbItems} className={cx('breadcrumb')} /> */}
            {/* <h2 className={cx('page-title')}>Thông tin tuyển dụng</h2> */}
            <Form ref={formRef}>
                <Form.Group className="mb-3" controlId="jobName">
                    <Form.Label>Tên công việc </Form.Label>
                    <Form.Control type="text" placeholder="Nhập tên công việc" defaultValue={data ? data.name : ''} />
                </Form.Group>
                <div className={cx('two-cols')}>
                    <Form.Group className="mb-3" controlId="jobCareer">
                        <Form.Label>Chọn ngành nghề</Form.Label>
                        <Form.Select aria-label="Chọn ngành nghề" defaultValue={data ? data.career : ''}>
                            <option>Chọn ngành nghề</option>
                            {careers.map((career) => (
                                <option key={career.code} value={career.code}>
                                    {career.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Chọn kỹ năng</Form.Label>
                        <Select
                            isMulti
                            name="jobSkill"
                            options={skills}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            value={skillSelected}
                            onChange={(value) => setSkillSelected(value)}
                        />
                    </Form.Group>
                </div>
                <div className={cx('two-cols')}>
                    <Form.Group className="mb-3" controlId="JobPosition">
                        <Form.Label>Chọn vị trí tuyển dụng</Form.Label>
                        <Form.Select aria-label="Chọn vị trí tuyển dụng" defaultValue={data ? data.position : ''}>
                            <option>Chọn vị trí tuyển dụng</option>
                            {positions.map((position) => (
                                <option key={position.id} value={position.code}>
                                    {position.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="JobExperience">
                        <Form.Label>Chọn kinh nghiệm làm việc</Form.Label>
                        <Form.Select aria-label="Chọn kinh nghiệm làm việc" defaultValue={data ? data.experience : ''}>
                            <option>Chọn kinh nghiệm làm việc</option>
                            {experiences.map((experience) => (
                                <option key={experience.id} value={experience.code}>
                                    {experience.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </div>
                <div className={cx('two-cols')}>
                    <Form.Group className="mb-3" controlId="JobGender">
                        <Form.Label>Chọn giới tính</Form.Label>
                        <Form.Select aria-label="Chọn giới tính" defaultValue={data ? data.gender : ''}>
                            <option>Chọn giới tính</option>
                            <option value="M">Nam</option>
                            <option value="FM">Nữ</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="JobNum">
                        <Form.Label>Nhập số lượng tuyển dụng</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập số lượng tuyển dụng"
                            defaultValue={data ? data.quantity : ''}
                        />
                    </Form.Group>
                </div>
                <Form.Group className="mb-3">
                    <Form.Label>Chọn nơi làm việc</Form.Label>
                    <div className={cx('location')}>
                        <Form.Select
                            aria-label="Chọn tỉnh"
                            id="province"
                            onChange={(e) => handleChangeProvince(e.target.value)}
                            defaultValue={data ? data.province : ''}
                        >
                            <option value={0}>Chọn tỉnh</option>
                            {provinces.map((province) => (
                                <option key={province.id} value={province.id}>
                                    {province.name}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Select
                            aria-label="Chọn quận/huyện"
                            id="district"
                            disabled={selectDistrict}
                            onChange={(e) => handleChangeDistrict(e.target.value)}
                            defaultValue={data ? data.district : ''}
                        >
                            <option value={0}>Chọn quận/huyện</option>
                            {districts.map((district) => (
                                <option key={district.id} value={district.id}>
                                    {district.name}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Select
                            aria-label="Chọn phường/xã"
                            id="ward"
                            disabled={selectWard}
                            onChange={(e) => handleChangeWard(e.target.value)}
                            defaultValue={data ? data.ward : ''}
                        >
                            <option value={0}>Chọn phường/xã</option>
                            {wards.map((ward) => (
                                <option key={ward.id} value={ward.id}>
                                    {ward.name}
                                </option>
                            ))}
                        </Form.Select>
                    </div>
                    <Form.Control
                        type="text"
                        id="detailAddress"
                        placeholder="Nhập số nhà, đường..."
                        value={addressDetail}
                        onChange={(e) => setAddressDetail(e.target.value)}
                        disabled={enterDetailAddress}
                    />
                </Form.Group>
                <div className={cx('o2t-two-cols')}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nhập mức lương</Form.Label>
                        <div className={cx('salary')}>
                            <Form.Control
                                type="text"
                                placeholder="Nhập mức lương"
                                id="salary"
                                defaultValue={data ? data.salary : ''}
                            />
                            <Form.Select
                                aria-label="Hình thức trả lương"
                                id="paycycle"
                                defaultValue={data ? data.payCircle : ''}
                            >
                                <option value={0}>Chọn hình thức trả lương</option>
                                {paycycles.map((paycycle) => (
                                    <option key={paycycle.code} value={paycycle.code}>
                                        {paycycle.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="JobWorkType">
                        <Form.Label>Chọn hình thức làm việc</Form.Label>
                        <Form.Select aria-label="Chọn hình thức làm việc" defaultValue={data ? data.typeWork : ''}>
                            <option>Chọn hình thức làm việc</option>
                            {typeWorks.map((typeWork) => (
                                <option key={typeWork.code} value={typeWork.code}>
                                    {typeWork.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </div>
                <Form.Group className="mb-3" controlId="JobExpriedDate">
                    <Form.Label>Chọn hạn nộp hồ sơ</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Chọn hạn nộp hồ sơ"
                        defaultValue={data ? data.dateExpire : ''}
                    />
                </Form.Group>
                <Form.Group className="mb-3 post-job-quill">
                    <Form.Label>Mô tả công việc </Form.Label>
                    <ReactQuill
                        theme="snow"
                        value={jobDescription}
                        onChange={(value) => setJobDescription(value)}
                        modules={modules}
                        formats={formats}
                        placeholder="Nhập mô tả công việc"
                    />
                </Form.Group>
                {data ? (
                    <CustomButton
                        wrapperStyle={cx('wrapper-button')}
                        className={cx('confirm-button')}
                        onClick={handleUpdateJob}
                    >
                        Cập nhật
                    </CustomButton>
                ) : (
                    <CustomButton
                        wrapperStyle={cx('wrapper-button')}
                        className={cx('confirm-button')}
                        onClick={handleSaveJob}
                    >
                        Lưu công việc
                    </CustomButton>
                )}
            </Form>
        </div>
    ) : (
        <></>
    );
}

export default PostJob;
