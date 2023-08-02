import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import styles from './JobPage.module.scss';
import className from 'classnames/bind';

import JobItem from '~/components/JobItem';
import CustomBreadCrumb from '~/components/CustomBreadCrumb';
import CardProfile from '~/components/CardProfile';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getJobs } from '~/store/reducers/jobSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import UploadAvatarModal from '~/components/UploadAvatarModal/UploadAvatarModal';
import { postAvatar } from '~/store/reducers/cvSlice';
import { BASE_URL } from '~/constant';
import Loading from '~/components/Loading/Loading';
import { getCareer } from '~/store/reducers/careerSlice';
import { getExperience } from '~/store/reducers/experienceSlice';
import { getTypeWork } from '~/store/reducers/typeWorkSlice';
import { getDistrict } from '~/store/reducers/locationSlice';
import { getPaycycle } from '~/store/reducers/paycycleSlice';
import { getFilterDisplay } from '~/store/reducers/searchSlice';

const cx = className.bind(styles);

const breadcrumbItems = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Việc làm', href: '/jobs' },
];

export default function Job() {
    const dispath = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const jobs = useSelector((state) => state.job.jobData);
    const jobLoading = useSelector((state) => state.job.jobLoading);

    const careers = useSelector((state) => state.career.careers);
    const experiences = useSelector((state) => state.experience.experiences);
    const typeWorks = useSelector((state) => state.typeWork.typeWorks);
    const districts = useSelector((state) => state.location.districts);
    const paycycles = useSelector((state) => state.paycycle.paycycles);
    const filterList = useSelector((state) => state.search.filters);

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = +searchParams.get('page');
    const search = searchParams.get('search');
    const career = searchParams.get('career');
    const area = searchParams.get('area');
    const typeWork = searchParams.get('typeWork');
    const paycycle = searchParams.get('paycycle');
    const experience = searchParams.get('experience');
    const order = searchParams.get('order');

    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [areaSelected, setAreaSelected] = useState([]);
    const [careerSelected, setCareerSelected] = useState([]);
    const [formWorkSelected, setformWorkSelected] = useState('');
    const [experienceSelected, setExperienceSelected] = useState('');
    const [payCircleSelected, setPayCircleSelected] = useState('');
    const [orderSelected, setOrderSelected] = useState('');

    useEffect(() => {
        dispath(getCareer());
        dispath(getExperience());
        dispath(getTypeWork());
        dispath(getDistrict(1));
        dispath(getPaycycle());
        dispath(getFilterDisplay());
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        dispath(
            getJobs({
                page,
                search,
                career,
                area,
                typeWork,
                paycycle,
                experience,
                order,
                type: 'alumus',
            }),
        );
        // eslint-disable-next-line
    }, [page, searchParams]);

    const handleSearch = () => {
        setSearchParams(getSearchParams());
    };

    const getSearchParams = () => {
        let searchParams = {
            page: 1,
        };
        if (searchValue.trim().length !== 0) searchParams['search'] = searchValue;
        if (careerSelected.length !== 0) {
            let career = careerSelected.reduce(
                (pre, current, index) =>
                    index === careerSelected.length - 1 ? pre + current.value : pre + current.value + ', ',
                '',
            );
            searchParams['career'] = career;
        }
        if (areaSelected.length !== 0) {
            let area = areaSelected.reduce(
                (pre, current, index) =>
                    index === areaSelected.length - 1 ? pre + current.value : pre + current.value + ', ',
                '',
            );
            searchParams['area'] = area;
        }
        if (formWorkSelected.trim().length !== 0) searchParams['typeWork'] = formWorkSelected;
        if (payCircleSelected.trim().length !== 0) searchParams['paycycle'] = payCircleSelected;
        if (experienceSelected.trim().length !== 0) searchParams['experience'] = experienceSelected;
        if (orderSelected.trim().length !== 0) searchParams['order'] = orderSelected;
        return searchParams;
    };

    const getNavigateValue = (page) => {
        let searchParams = {
            page: page,
        };
        if (search) searchParams['search'] = search;
        if (career) searchParams['career'] = career;
        if (area) searchParams['area'] = area;
        if (typeWork) searchParams['typeWork'] = typeWork;
        if (paycycle) searchParams['paycycle'] = paycycle;
        if (experience) searchParams['experience'] = experience;
        if (order) searchParams['order'] = order;
        return searchParams;
    };

    const renderPaging = (numOfPages, activeItem) => {
        const result = [];
        for (let index = 0; index < numOfPages; index++) {
            result.push(
                <Pagination.Item
                    key={index}
                    active={activeItem === index ? true : false}
                    onClick={(e) => {
                        e.preventDefault();
                        setSearchParams(getNavigateValue(index + 1));
                    }}
                >
                    {index + 1}
                </Pagination.Item>,
            );
        }
        return result;
    };

    const handleOpenAvatarModal = () => {
        setShowAvatarModal(true);
    };

    const handleCloseAvatarModal = () => {
        setShowAvatarModal(false);
    };
    const handleSubmitAvatar = (data) => {
        dispath(postAvatar({ token, data }));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('page-job')}>
                <UploadAvatarModal
                    show={showAvatarModal}
                    handleClose={handleCloseAvatarModal}
                    handleSubmit={handleSubmitAvatar}
                />
                <CustomBreadCrumb items={breadcrumbItems} className={cx('breadcrumb')} />
                <div className={cx('find-job')}>
                    <div className={cx('filter-wrapper')}>
                        <Select
                            isMulti
                            name="areaCareer"
                            options={careers.map((career) => ({ value: career.code, label: career.name }))}
                            className="basic-multi-select skill-input"
                            classNamePrefix="select"
                            placeholder="Chọn lĩnh vực nghề nghiệp"
                            value={careerSelected}
                            onChange={(value) => setCareerSelected(value)}
                        />
                        <Select
                            isMulti
                            name="areaSelect"
                            options={districts.map((district) => ({ value: district.name, label: district.name }))}
                            className="basic-multi-select skill-input"
                            classNamePrefix="select"
                            placeholder="Chọn khu vực làm việc"
                            value={areaSelected}
                            onChange={(value) => setAreaSelected(value)}
                        />
                        <Form.Select
                            aria-label="Hình thức làm việc"
                            value={formWorkSelected}
                            onChange={(e) => setformWorkSelected(e.target.value)}
                        >
                            <option value="">Hình thức làm việc</option>
                            {typeWorks.map((typeWork) => (
                                <option key={typeWork.code} value={typeWork.code}>
                                    {typeWork.name}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Select
                            aria-label="Kinh nghiệm"
                            value={experienceSelected}
                            onChange={(e) => setExperienceSelected(e.target.value)}
                        >
                            <option value="">Kinh nghiệm</option>
                            {experiences.map((experience) => (
                                <option key={experience.id} value={experience.code}>
                                    {experience.name}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Select
                            aria-label="Chu kỳ nhận lương"
                            value={payCircleSelected}
                            onChange={(e) => setPayCircleSelected(e.target.value)}
                        >
                            <option value="">Chu kỳ nhận lương</option>
                            {paycycles.map((paycycle) => (
                                <option key={paycycle.code} value={paycycle.code}>
                                    {paycycle.name}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Select
                            aria-label="Ưu tiên hiển thị"
                            value={orderSelected}
                            onChange={(e) => setOrderSelected(e.target.value)}
                        >
                            <option value="">Ưu tiên hiển thị</option>
                            {filterList.map((filter) => (
                                <option key={filter.code} value={filter.code}>
                                    {filter.des}
                                </option>
                            ))}
                        </Form.Select>
                    </div>
                    <div className={cx('search-input')}>
                        <Form.Control
                            type="text"
                            placeholder="Tìm kiếm việc làm"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <Button onClick={handleSearch}>
                            <FontAwesomeIcon icon={faSearch} /> Tìm kiếm
                        </Button>
                    </div>
                </div>
                {jobLoading ? (
                    <Loading />
                ) : (
                    <div className={cx('job-pannel')}>
                        <Row className={cx('me-0', 'row_c')}>
                            <Col lg={8} className={cx('list-job')}>
                                {jobs && jobs.products.length !== 0 ? (
                                    jobs.products.map((job) => (
                                        <JobItem
                                            key={job.id}
                                            big={true}
                                            data={job}
                                            onClick={() => navigate(`/job/${job.sku}`)}
                                        />
                                    ))
                                ) : (
                                    <div className={cx('job-not-found')}>Không tìm thấy</div>
                                )}
                            </Col>
                            <Col lg={4} className={cx('ext-job')}>
                                <div className={cx('profile')}>
                                    <CardProfile
                                        name={user?.fullName}
                                        avatar={user?.avatar && BASE_URL + user?.avatar}
                                        location={user?.districts && user.districts[0].name}
                                        handleUpdateAvatar={handleOpenAvatarModal}
                                    />
                                </div>
                                <div className={cx('count-jobs')}>
                                    <span>10</span>
                                    <p>công việc phù hợp</p>
                                </div>
                                <div className={cx('my-jobs')}>
                                    <h3 className={cx('my-job-title')}>Công việc gợi ý cho bạn</h3>
                                    <div className={cx('my-job-content')}>
                                        {jobs?.products.map(
                                            (job, index) =>
                                                index < 2 && (
                                                    <JobItem
                                                        key={job.id}
                                                        data={job}
                                                        big={false}
                                                        onClick={(e) => {
                                                            navigate(`/job/${job.sku}`);
                                                        }}
                                                    />
                                                ),
                                        )}
                                    </div>
                                    <div className={cx('view-all')}>Xem tất cả</div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Pagination className={cx('pagination', 'justify-content-center mt-3')}>
                                {page > 1 && (
                                    <Pagination.Prev
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setSearchParams(getNavigateValue(page - 1));
                                        }}
                                    />
                                )}
                                {jobs
                                    ? renderPaging(jobs.totalPages, page === 0 ? page : page - 1).map(
                                          (paging) => paging,
                                      )
                                    : null}
                                {jobs && jobs.totalPages !== 1 && page < jobs.totalPages && (
                                    <Pagination.Next
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setSearchParams(getNavigateValue(page + 1));
                                        }}
                                    />
                                )}
                            </Pagination>
                        </Row>
                    </div>
                )}
            </div>
        </div>
    );
}
