// import className from 'classnames/bind';
// import styles from './Ca.module.scss';

// const cx = className.bind(styles);

// function CadidateItem({ data }) {
//     return <div className={cx('wrapper')}>{data.cvId}</div>;
// }

// export default CadidateItem;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChain, faEye } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Form, Image } from 'react-bootstrap';
import styles from './CadidateItem.module.scss';
import className from 'classnames/bind';

import CustomButton from '~/components/common/CustomButton';
import { BASE_URL } from '~/constant';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Avatar from '../Avatar/Avatar';
import { postChangeStatusCadidate } from '~/store/reducers/employer/employerManageCadidateSlice';

const cx = className.bind(styles);

const statusMap = {
    APPLIED: 'Ứng viên nộp CV',
    CHECKING: 'Kiểm tra CV',
    INTERVIEW: 'Phỏng vấn',
    DEAL: 'Thương lượng lương',
    PASS: 'Đã nhận',
    FAIL: 'Từ chối',
};
function CadidateItem({ data, isRecommendItem = false, statusList, ...props }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [statusSelected, setStatusSelected] = useState('');
    const changeStatusLoading = useSelector((state) => state.employerManageCadidate.changeStatusLoading);
    const changeStatus = useSelector((state) => state.employerManageCadidate.changeStatus);

    useEffect(() => {
        changeStatus && changeStatus.resStatus && changeStatus.id === data.id && setStatusSelected(changeStatus.status);
    }, [changeStatus]);

    const handleChangeStatus = (e) => {
        const value = e.target.value;
        dispatch(
            postChangeStatusCadidate({
                id: data.id,
                status: value,
            }),
        );
    };

    return (
        <div className={cx('job-apply-item')} {...props}>
            <div className={cx('job-apply-avt')}>
                <Avatar
                    src={
                        data?.avartarAlumnus
                            ? BASE_URL + data?.avartarAlumnus
                            : '/static/imgs/profile-default-avatar.jpg'
                    }
                    alt={data?.nameAlumnus}
                    base64={false}
                />
            </div>
            <div className={cx('job-apply-infor')}>
                <p>
                    Tên ứng viên: <span>{data?.nameAlumnus}</span>
                </p>
                {isRecommendItem ? null : (
                    <>
                        <p>
                            Công việc ứng tuyển:{' '}
                            <span
                                className={cx('name-job')}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/job/${data?.codeJob}`);
                                }}
                            >
                                {data?.nameJob}
                            </span>
                        </p>
                        <p>
                            Ứng tuyển vị trí: <span>{data?.jobPosition}</span>
                        </p>
                        <p>
                            Ngày ứng tuyển: <span>{data?.applyDate}</span>
                        </p>
                    </>
                )}
            </div>
            <div className={cx('job-apply-state')}>
                {!isRecommendItem && <p>Xét duyệt:</p>}
                <div className={cx('state-seeFull')}>
                    {!isRecommendItem && (
                        <Form.Select
                            aria-label="Trạng thái ứng tuyển"
                            className={cx('select-state')}
                            value={statusSelected}
                            onChange={handleChangeStatus}
                        >
                            {statusList.map((status) => (
                                <option key={status.code} value={status.code}>
                                    {statusMap[status.code]}
                                </option>
                            ))}
                        </Form.Select>
                    )}
                    <div className={cx('job-apply-button')}>
                        <a href={'/full-cv/' + data?.cvId} target="_blank" rel="noreferrer">
                            <CustomButton>
                                <FontAwesomeIcon icon={faEye} /> Xem CV
                            </CustomButton>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CadidateItem;
