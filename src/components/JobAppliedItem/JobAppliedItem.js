import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChain, faEye } from '@fortawesome/free-solid-svg-icons';
import { Image } from 'react-bootstrap';
import styles from './JobAppliedItem.module.scss';
import className from 'classnames/bind';

import CustomButton from '~/components/CustomButton/CustomButton';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '~/constant';

const cx = className.bind(styles);

function JobApplied({ data, ...props }) {
    const navigate = useNavigate();

    return (
        <div className={cx('job-apply-item')} {...props}>
            <div className={cx('job-apply-avt')}>
                {/* <Image src="static/imgs/logo-banner.png" alt="ss" /> */}
                <Image src={BASE_URL + data?.companyLogo} alt={data?.nameJob} />
            </div>
            <div className={cx('job-apply-infor')}>
                <p>
                    {/* Tên công việc: <span>Thực tập sinh IT</span> */}
                    Tên công việc: <span>{data?.nameJob}</span>
                </p>
                <p>
                    {/* Tên công ty: <span>Công ty JJD</span> */}
                    Tên công ty: <span>{data?.nameCompany}</span>
                </p>
                <p>
                    {/* Ngày ứng tuyển: <span>12/07/2020</span> */}
                    Ngày ứng tuyển: <span>{data?.applyDate}</span>
                </p>
            </div>
            <div className={cx('job-apply-cv')}>
                <p>
                    Cv đã ứng tuyển:{' '}
                    <span>
                        <a href={'/full-cv/' + data?.cvId} target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faChain} /> cv của bạn
                        </a>
                    </span>
                </p>
            </div>
            <div className={cx('job-apply-state')}>
                {data?.status === 'CHECKING' && (
                    <p>
                        {/* Trạng thái: <span>Đang chờ duyệt</span> */}
                        Trạng thái: <span className={cx('waiting')}>Đang chờ duyệt</span>
                    </p>
                )}
                {data?.status === 'rejected' && (
                    <p>
                        {/* Trạng thái: <span>Đang chờ duyệt</span> */}
                        Trạng thái: <span className={cx('rejected')}>Đã từ chối</span>
                    </p>
                )}
                {data?.status === 'saw' && (
                    <p>
                        {/* Trạng thái: <span>Đang chờ duyệt</span> */}
                        Trạng thái: <span className={cx('saw')}>Đã xem</span>
                    </p>
                )}
            </div>
            <div className={cx('job-apply-button')}>
                <CustomButton onClick={() => navigate(`/job/${data?.codeJob}`)}>
                    <FontAwesomeIcon icon={faEye} /> Xem chi tiết
                </CustomButton>
            </div>
        </div>
    );
}

export default JobApplied;
