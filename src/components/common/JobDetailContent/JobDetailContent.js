import styles from './JobDetailContent.module.scss';
import className from 'classnames/bind';
import { Badge, Image } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBriefcase,
    faEnvelopeCircleCheck,
    faFlask,
    faHeart,
    faMedal,
    faMoneyBill1Wave,
    faPaperPlane,
    faPeopleGroup,
    faPersonHalfDress,
    faThumbsDown,
} from '@fortawesome/free-solid-svg-icons';
import './JobDetailContent.scss';
import 'react-toastify/dist/ReactToastify.css';

import CustomButton from '~/components/common/CustomButton';
import InforItem from '~/components/common/InfoItem';
import CustomBreadCrumb from '../CustomBreadCrumb/CustomBreadCrumb';
import { useDispatch, useSelector } from 'react-redux';
import { getJobDetail } from '~/store/reducers/common/jobSlice';
import { useEffect } from 'react';
import { BASE_URL } from '~/constant';
import Loading from '../Loading/Loading';

const cx = className.bind(styles);

function JobDetailContent({
    code,
    handleApply = () => null,
    handleFollow = () => null,
    handleUnfollow = () => null,
    hideButton = true,
    hideBreadcrumb = true,
    callJob = true,
}) {
    const dispath = useDispatch();
    const jobDetails = useSelector((state) => state.job.jobDetails);
    const jobDetailIsLoading = useSelector((state) => state.job.jobDetailIsLoading);

    useEffect(() => {
        callJob && dispath(getJobDetail({ id: code }));
        // eslint-disable-next-line
    }, []);

    const breadcrumbItems = [
        { name: 'Trang chủ', href: '/' },
        { name: 'Việc làm', href: '/jobs' },
        { name: jobDetails?.name, href: '/job/' + jobDetails?.sku },
    ];

    const convertFormatDate = (dateString) => {
        if (dateString && dateString.includes('-')) {
            const parts = dateString.split('-');
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        } else return dateString;
    };

    return jobDetailIsLoading ? (
        <Loading />
    ) : jobDetails ? (
        <div className={cx('wrapper')}>
            {hideBreadcrumb && <CustomBreadCrumb items={breadcrumbItems} className={cx('breadcrumb')} />}

            <section>
                <div className="session-title">Công việc</div>
                <div className={cx('job-overview')}>
                    <div className={cx('avatar-company')}>
                        <Image fluid className="d-block w-100" src={BASE_URL + jobDetails?.logo} />
                    </div>
                    <div className={cx('overview-description')}>
                        <h2 className={cx('job-title')}>{jobDetails?.name}</h2>
                        <h3 className={cx('company-name')}>{jobDetails?.merchantStore.storeName}</h3>
                        <p className={cx('exprire-date')}>
                            Hạn nộp hồ sơ: {convertFormatDate(jobDetails?.dateExperience)}
                        </p>
                        <p className={cx('address')}>
                            Địa chỉ:{' '}
                            {(jobDetails?.locations[0].detailAddress
                                ? jobDetails?.locations[0].detailAddress + ', '
                                : '') +
                                jobDetails?.locations[0].ward +
                                ', ' +
                                jobDetails?.locations[0].district +
                                ', ' +
                                jobDetails?.locations[0].province}
                        </p>
                    </div>
                    <div className={cx('button-group')}>
                        {jobDetails?.applied && (
                            <CustomButton
                                onClick={(e) => e.stopPropagation()}
                                wrapperStyle={cx('btn-wrapper', 'btn-apply')}
                            >
                                <FontAwesomeIcon icon={faEnvelopeCircleCheck} /> Đã ứng tuyển
                            </CustomButton>
                        )}
                        {hideButton && (
                            <>
                                {!jobDetails?.applied &&
                                    (jobDetails?.follow ? (
                                        <CustomButton
                                            onClick={handleUnfollow}
                                            wrapperStyle={cx('btn-wrapper', 'btn-unfollow')}
                                        >
                                            <FontAwesomeIcon icon={faThumbsDown} /> {'Bỏ theo dõi'}
                                        </CustomButton>
                                    ) : (
                                        <CustomButton
                                            onClick={handleFollow}
                                            wrapperStyle={cx('btn-wrapper', 'btn-follow')}
                                        >
                                            <FontAwesomeIcon icon={faHeart} /> {'Theo dõi'}
                                        </CustomButton>
                                    ))}

                                {!jobDetails.applied && (
                                    <CustomButton wrapperStyle={cx('btn-wrapper')} onClick={handleApply}>
                                        <FontAwesomeIcon icon={faPaperPlane} /> Ứng tuyển ngay
                                    </CustomButton>
                                )}
                            </>
                        )}
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
                            content={jobDetails?.categories[0].name}
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
                <div className="session-title">Kỹ năng yêu cầu</div>
                <div className={cx('skill')}>
                    {jobDetails?.skills.map((skill, index) => (
                        <Badge key={skill.code} className={cx('w-auto me-1', 'badge-job')}>
                            {skill.name}
                        </Badge>
                    ))}
                </div>
            </section>
            <section>
                <div className="session-title">Chi tiết công việc</div>
                <div className="job-details">
                    <ReactQuill theme="snow" value={jobDetails?.description} readOnly={true} />
                </div>
            </section>
        </div>
    ) : null;
}

export default JobDetailContent;
