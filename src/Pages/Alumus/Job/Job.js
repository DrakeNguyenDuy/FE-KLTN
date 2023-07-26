import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import styles from './JobPage.module.scss';
import className from 'classnames/bind';

import JobItem from '~/components/JobItem';
import FindJob from '~/components/FindJob';
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

const cx = className.bind(styles);

const breadcrumbItems = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Việc làm', href: '/jobs' },
];

export default function Job() {
    // const [open, setOpen] = useState(false);
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const dispath = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const jobs = useSelector((state) => state.job.jobData);
    const jobLoading = useSelector((state) => state.job.jobLoading);
    // const followStatus = useSelector((state) => state.job.follow);

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const page = +searchParams.get('page');
    useEffect(() => {
        dispath(getJobs({ page: page === 0 ? page : page - 1, type: 'alumus' }));
        // eslint-disable-next-line
    }, []);

    const renderPaging = (numOfPages, activeItem) => {
        const result = [];
        for (let index = 0; index < numOfPages; index++) {
            result.push(
                <Pagination.Item
                    href={`/jobs?page=${index + 1}`}
                    key={index}
                    active={activeItem === index ? true : false}
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
        window.location.reload();
    };

    return (
        <div className={cx('page-job')}>
            <UploadAvatarModal
                show={showAvatarModal}
                handleClose={handleCloseAvatarModal}
                handleSubmit={handleSubmitAvatar}
            />
            <CustomBreadCrumb items={breadcrumbItems} className={cx('breadcrumb')} />
            <FindJob />
            {jobLoading ? (
                <Loading />
            ) : (
                <div className={cx('job-pannel')}>
                    <Row className={cx('me-0', 'row_c')}>
                        <Col lg={8} className={cx('list-job')}>
                            <div className={cx('filter-wrapper')}>
                                <Form.Select aria-label="Hình thức làm việc">
                                    <option>Hình thức làm việc</option>
                                </Form.Select>
                                <Form.Select aria-label="Kinh nghiệm">
                                    <option>Kinh nghiệm</option>
                                </Form.Select>
                                <Form.Select aria-label="Mức lương">
                                    <option>Mức Lương</option>
                                </Form.Select>
                                <Form.Select aria-label="Ưu tiên hiển thị">
                                    <option>Ưu tiên hiển thị</option>
                                </Form.Select>
                            </div>
                            {/* <JobItem big={true} />
                        <JobItem big={true} />
                        <JobItem big={true} />
                        <JobItem big={true} />
                        <JobItem big={true} /> */}
                            {jobs?.products.map((job) => (
                                <JobItem
                                    key={job.id}
                                    big={true}
                                    data={job}
                                    onClick={() => navigate(`/job/${job.sku}`)}
                                />
                            ))}
                        </Col>
                        <Col lg={4} className={cx('ext-job')}>
                            <div className={cx('profile')}>
                                {console.log(user)}
                                <CardProfile
                                    name={user?.fullName}
                                    avatar={BASE_URL + user?.avatar}
                                    location={user?.districts ? user.districts[0].name : null}
                                    handleUpdateAvatar={handleOpenAvatarModal}
                                />
                            </div>
                            <div className={cx('count-jobs')}>
                                <span>10</span>
                                <p>công việc được tìm thấy</p>
                            </div>
                            <div className={cx('my-jobs')}>
                                <h3 className={cx('my-job-title')}>Công việc dành cho bạn</h3>
                                <div className={cx('my-job-content')}>
                                    {/* <JobItem />
                                <JobItem />
                                <JobItem /> */}
                                    {jobs?.products.map((job) => (
                                        <JobItem
                                            key={job.id}
                                            data={job}
                                            big={false}
                                            onClick={(e) => {
                                                navigate(`/job/${job.sku}`);
                                            }}
                                        />
                                    ))}
                                </div>
                                <div className={cx('view-all')}>Xem tất cả</div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Pagination className={cx('pagination', 'justify-content-center mt-3')}>
                            {/* <Pagination.First /> */}
                            <Pagination.Prev />
                            {jobs
                                ? renderPaging(jobs.totalPages, page === 0 ? page : page - 1).map((paging) => paging)
                                : null}
                            {/* <Pagination.Item>{1}</Pagination.Item> */}
                            {/* <Pagination.Ellipsis /> */}

                            {/* <Pagination.Item>{10}</Pagination.Item>
                        <Pagination.Item>{11}</Pagination.Item>
                        <Pagination.Item active>{12}</Pagination.Item>
                        <Pagination.Item>{13}</Pagination.Item>
                        <Pagination.Item>{14}</Pagination.Item> */}

                            {/* <Pagination.Ellipsis /> */}
                            {/* <Pagination.Item>{20}</Pagination.Item> */}
                            <Pagination.Next />
                            {/* <Pagination.Last /> */}
                        </Pagination>
                    </Row>
                </div>
            )}
        </div>
    );
}
