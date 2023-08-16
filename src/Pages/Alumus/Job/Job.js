import React, { useState } from 'react';
import styles from './JobPage.module.scss';
import className from 'classnames/bind';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { Button, Col, Row } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';

import CustomBreadCrumb from '~/components/common/CustomBreadCrumb';
import JobItem from '~/components/common/JobItem';
import UploadAvatarModal from '~/components/common/UploadAvatarModal';
import CardProfile from '~/components/common/CardProfile';
import Loading from '~/components/common/Loading';
import { getJobs } from '~/store/reducers/common/jobSlice';
import { postAvatar } from '~/store/reducers/alumus/cvSlice';
import { BASE_URL } from '~/constant';
import { getCareer } from '~/store/reducers/common/careerSlice';
import { getExperience } from '~/store/reducers/common/experienceSlice';
import { getTypeWork } from '~/store/reducers/common/typeWorkSlice';
import { getDistrict } from '~/store/reducers/common/locationSlice';
import { getPaycycle } from '~/store/reducers/common/paycycleSlice';
import { getFilterDisplay } from '~/store/reducers/common/searchSlice';
import { getToken } from '~/utils/LocalStorage';
import { getProfile } from '~/store/reducers/alumus/profileSlice';

const cx = className.bind(styles);

const breadcrumbItems = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Việc làm', href: '/jobs' },
];

export default function Job() {
    const dispath = useDispatch();
    const user = useSelector((state) => state.alumusAuth.user);
    const token = getToken('alumus');
    const profile = useSelector((state) => state.profile.profile);
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
    const [searchValue, setSearchValue] = useState(search ? search : '');
    const [areaSelected, setAreaSelected] = useState(
        area
            ? () => {
                  const areaArr = area.split(', ');
                  return districts
                      .filter((district) => areaArr.includes(district.name))
                      .map((district) => ({ value: district.name, label: district.name }));
              }
            : [],
    );
    const [careerSelected, setCareerSelected] = useState(
        career
            ? () => {
                  const careerArr = career.split(', ');
                  return careers
                      .filter((career) => careerArr.includes(career.code))
                      .map((career) => ({ value: career.name, label: career.name }));
              }
            : [],
    );
    const [formWorkSelected, setformWorkSelected] = useState(typeWork ? typeWork : '');
    const [experienceSelected, setExperienceSelected] = useState(experience ? experience : '');
    const [payCircleSelected, setPayCircleSelected] = useState(paycycle ? paycycle : '');
    const [orderSelected, setOrderSelected] = useState(order ? order : '');

    console.log(jobs);
    useEffect(() => {
        dispath(getCareer());
        dispath(getExperience());
        dispath(getTypeWork());
        dispath(getDistrict(1));
        dispath(getPaycycle());
        dispath(getFilterDisplay());
        dispath(getProfile());
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
                username: user?.userName,
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
        formWorkSelected.trim().length !== 0 && (searchParams['typeWork'] = formWorkSelected);
        payCircleSelected.trim().length !== 0 && (searchParams['paycycle'] = payCircleSelected);
        experienceSelected.trim().length !== 0 && (searchParams['experience'] = experienceSelected);
        orderSelected.trim().length !== 0 && (searchParams['order'] = orderSelected);
        return searchParams;
    };

    const getNavigateValue = (page) => {
        let searchParams = {
            page: page,
        };
        search && (searchParams['search'] = search);
        career && (searchParams['career'] = career);
        area && (searchParams['area'] = area);
        typeWork && (searchParams['typeWork'] = typeWork);
        paycycle && (searchParams['paycycle'] = paycycle);
        experience && (searchParams['experience'] = experience);
        order && (searchParams['order'] = order);
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
                                            user={user}
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
                                        token={token}
                                        profile={profile}
                                        handleUpdateProfile={() => navigate('/profile')}
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
