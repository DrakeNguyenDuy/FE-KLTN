import { useEffect, useRef, useState } from 'react';
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
    const user = useSelector((state) => state.alumusAuth.user);

    const [valIntroduce, setValIntroduce] = useState('');
    const introduceRef = useRef(null);

    const { code } = useParams();
    const breadcrumbItems = [
        { name: 'Trang chủ', href: '/' },
        { name: employerDetails?.name, href: '/company/' + code },
    ];
    useEffect(() => {
        dispatch(getEmployerDetail(code));
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (employerDetails?.description) {
            setValIntroduce(employerDetails?.description);
        } else {
            setValIntroduce('Chưa cập nhật');
        }
        clearResizeTextArea();
        resizeTextArea();
        // eslint-disable-next-line
    }, [valIntroduce, employerDetails]);

    const resizeTextArea = () => {
        if (!isLoading && introduceRef && valIntroduce) {
            introduceRef.current.style.height = introduceRef.current.scrollHeight + 'px';
        }
    };

    const clearResizeTextArea = () => {
        if (!isLoading && introduceRef && valIntroduce) {
            introduceRef.current.style.height = 0 + 'px';
        }
    };

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
                                    Quy mô:{' '}
                                    {employerDetails?.numOfEmployee ? (
                                        <span>{employerDetails?.numOfEmployee} nhân viên</span>
                                    ) : (
                                        <span>Chưa cập nhật</span>
                                    )}
                                    <br />
                                    Địa chỉ:{' '}
                                    {employerDetails?.address ? (
                                        <span>{employerDetails?.address}</span>
                                    ) : (
                                        <span>Chưa cập nhật</span>
                                    )}
                                    <br />
                                    Liên hệ: SĐT:{' '}
                                    {employerDetails?.phoneNumber ? (
                                        <span>{employerDetails?.phoneNumber}</span>
                                    ) : (
                                        <span>Chưa cập nhật</span>
                                    )}
                                </p>
                                <div className={cx('introduce')}>
                                    <p>Giới thiệu về công ty:</p>
                                    <textarea disabled value={valIntroduce} ref={introduceRef}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className={cx('content-block')}>
                            <h2 className={cx('block-title')}>Danh sách công việc</h2>
                            <div className={cx('jobs')}>
                                {employerDetails?.jobs && employerDetails?.jobs.length !== 0 ? (
                                    employerDetails?.jobs.map((job) => (
                                        <JobItem
                                            key={job.id}
                                            big={true}
                                            data={job}
                                            user={user}
                                            onClick={() => navigate(`/job/${job.sku}`)}
                                        />
                                    ))
                                ) : (
                                    <div className={cx('not-found')}>Chưa có công việc</div>
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
