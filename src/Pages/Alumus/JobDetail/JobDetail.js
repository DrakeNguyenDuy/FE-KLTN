import { useParams } from 'react-router-dom';
import styles from './JobDetail.module.scss';
import className from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getJobDetail } from '~/store/reducers/jobSlice';
import ReactQuill from 'react-quill';
import {
    faBriefcase,
    faFlask,
    faMedal,
    faMoneyBill1Wave,
    faPeopleGroup,
    faPersonHalfDress,
} from '@fortawesome/free-solid-svg-icons';

import './JobDetail.scss';
import CustomBreadCrumb from '~/components/CustomBreadCrumb/CustomBreadCrumb';
import { Image } from 'react-bootstrap';
import CustomButton from '~/components/CustomButton/CustomButton';
import InforItem from '~/components/InfoItem/InfoItem';

const cx = className.bind(styles);

function JobDetail() {
    const dispath = useDispatch();

    const jobDetails = useSelector((state) => state.job.jobDetails);

    const { id } = useParams();

    const breadcrumbItems = [
        { name: 'Trang chủ', href: '/' },
        { name: 'Việc làm', href: '/jobs' },
        { name: jobDetails?.name, href: '/job/' + jobDetails?.sku },
    ];

    useEffect(() => {
        dispath(getJobDetail(id));
    }, []);

    return (
        <div className={cx('wrapper')}>
            <CustomBreadCrumb items={breadcrumbItems} className={cx('breadcrumb')} />
            <section>
                <div className="session-title">Công việc</div>
                <div className={cx('job-overview')}>
                    <div className={cx('avatar-company')}>
                        <Image
                            fluid
                            className="d-block w-100"
                            src={'/static/imgs/logo-banner.png'}
                            alt={'/static/imgs/carousel_1.jpg'}
                        />
                    </div>
                    <div className={cx('overview-description')}>
                        {/* <h2 className={cx('job-title')}>Thực tập sinh IT</h2> */}
                        <h2 className={cx('job-title')}>{jobDetails?.name}</h2>
                        {/* <h3 className={cx('company-name')}>Công ty TNHH Công nghệ Snetel</h3> */}
                        <h3 className={cx('company-name')}>{jobDetails?.merchantStore.storeName}</h3>
                        {/* <p className={cx('exprire-date')}>Hạn nộp hồ sơ: 30/06/2023</p> */}
                        <p className={cx('exprire-date')}>Hạn nộp hồ sơ: {jobDetails?.dateExperience}</p>
                        {/* <p className={cx('address')}>
                            Địa chỉ: Hồ Chí Minh: 156A Trần Quang Khải, Quận 1, TP. HCM, Quận 1
                        </p> */}
                        <p className={cx('address')}>
                            Địa chỉ:{' '}
                            {jobDetails?.locations[0].detailAddress +
                                ', ' +
                                jobDetails?.locations[0].ward +
                                ', ' +
                                jobDetails?.locations[0].district +
                                ', ' +
                                jobDetails?.locations[0].province}
                        </p>
                    </div>
                    <div className={cx('button-group')}>
                        <CustomButton wrapperStyle={cx('btn-follow')}>Theo dõi</CustomButton>
                        <CustomButton wrapperStyle={cx('btn-apply')}>Ứng tuyển ngay</CustomButton>
                    </div>
                </div>
            </section>
            <section>
                <div className="session-title">Thông tin chung</div>
                <div className={cx('job-infor')}>
                    <div className={cx('items-row')}>
                        <InforItem
                            icon={faMoneyBill1Wave}
                            title="Mức lương"
                            content={`${jobDetails?.price} VNĐ/${jobDetails?.paycycles}`}
                        />
                        <InforItem
                            icon={faBriefcase}
                            title="Hình thức làm việc"
                            content={jobDetails?.categories[0].code}
                        />
                        <InforItem icon={faMedal} title="Vị trí" content={jobDetails?.positions[0].name} />
                    </div>
                    <div className={cx('items-row')}>
                        <InforItem icon={faPersonHalfDress} title="Giới tính" content={jobDetails?.gender} />
                        <InforItem icon={faFlask} title="Kinh nghiệm" content={jobDetails?.experience.name} />
                        <InforItem
                            icon={faPeopleGroup}
                            title="Số lượng tuyển dụng"
                            content={`${jobDetails?.quantity} người`}
                        />
                    </div>
                </div>
            </section>
            <section>
                <div className="session-title">Chi tiết công việc</div>
                <div className="job-details">
                    <ReactQuill theme="snow" value={jobDetails?.description} readOnly={true} />
                </div>
                {/* <CustomButton wrapperStyle={cx('btn-apply')}>Ứng tuyển ngay</CustomButton> */}
            </section>
        </div>
    );
}

export default JobDetail;
