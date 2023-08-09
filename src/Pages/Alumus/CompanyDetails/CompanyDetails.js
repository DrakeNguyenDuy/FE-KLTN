import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './CompanyDetails.module.scss';
import className from 'classnames/bind';

import Avatar from '~/components/common/Avatar';
import JobItem from '~/components/common/JobItem';
import CustomBreadCrumb from '~/components/common/CustomBreadCrumb';
import Loading from '~/components/common/Loading';

import { getEmployerDetail } from '~/store/reducers/common/employerSlice';
import { BASE_URL } from '~/constant';

const cx = className.bind(styles);

function CompanyDetails() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.employer.isLoading);
    const employerDetails = useSelector((state) => state.employer.employerDetails);

    const { code } = useParams();
    const breadcrumbItems = [
        { name: 'Trang chủ', href: '/' },
        { name: employerDetails?.name, href: '/company/' + code },
    ];
    useEffect(() => {
        dispatch(getEmployerDetail(code));
        // eslint-disable-next-line
    }, []);

    return isLoading ? (
        <Loading />
    ) : (
        <>
            <CustomBreadCrumb items={breadcrumbItems} className={cx('breadcrumb')} />
            <div className={cx('wrapper')}>
                <div className="row">
                    <div className="col-md-12">
                        <div className={cx('overview')}>
                            <div
                                className={cx('overview-background')}
                                style={{
                                    backgroundImage: employerDetails?.background
                                        ? `url(${BASE_URL + employerDetails?.background})`
                                        : null,
                                }}
                            >
                                <Avatar
                                    className={cx('avatar')}
                                    src={
                                        employerDetails?.logo
                                            ? BASE_URL + employerDetails?.logo
                                            : '/static/imgs/profile-default-avatar.jpg'
                                    }
                                    base64={false}
                                />
                            </div>

                            <div className={cx('overview-content')}>
                                <h2 className={cx('full-name')}>{employerDetails?.name}</h2>
                                <p className={cx('slogan')}>{employerDetails?.sologan}</p>
                                <p className={cx('infor')}>
                                    Quy mô: <span>{employerDetails?.numOfEmployee} nhân viên</span>
                                    <br />
                                    Địa chỉ: <span>{employerDetails?.address}</span>
                                    <br />
                                    Liên hệ: <span>SĐT: {employerDetails?.phoneNumber}</span>
                                </p>
                                <p className={cx('introduce')}>
                                    Giới thiệu về công ty: <span>{employerDetails?.description}</span>
                                </p>
                            </div>
                        </div>
                        <div className={cx('content-block')}>
                            <h2 className={cx('block-title')}>Việc làm</h2>
                            <div className={cx('jobs')}>
                                {employerDetails?.jobs && employerDetails?.jobs.length !== 0 ? (
                                    employerDetails?.jobs.map((job) => (
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CompanyDetails;
