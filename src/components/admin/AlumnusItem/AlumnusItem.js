// import className from 'classnames/bind';
// import styles from './Ca.module.scss';

// const cx = className.bind(styles);

// function CadidateItem({ data }) {
//     return <div className={cx('wrapper')}>{data.cvId}</div>;
// }

// export default CadidateItem;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCaretDown,
    faChain,
    faEye,
    faLock,
    faLockOpen,
    faPen,
    faPeopleGroup,
    faPlay,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Image, Modal } from 'react-bootstrap';
import styles from './AlumnusItem.module.scss';
import className from 'classnames/bind';

import CustomButton from '~/components/common/CustomButton';
import { BASE_URL } from '~/constant';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { postChangeStatusCadidate } from '~/store/reducers/employer/employerManageCadidateSlice';
import Avatar from '~/components/common/Avatar/Avatar';
import ButtonPopper from '~/components/common/ButtonPopper/ButtonPopper';

const cx = className.bind(styles);

const statusMap = {
    APPLIED: 'Ứng viên nộp CV',
    CHECKING: 'Kiểm tra CV',
    INTERVIEW: 'Phỏng vấn',
    DEAL: 'Thương lượng lương',
    PASS: 'Đã nhận',
    FAIL: 'Từ chối',
};
function AlumnusItem({ data, statusList, ...props }) {
    const dispatch = useDispatch();
    const [statusSelected, setStatusSelected] = useState('');
    const changeStatusLoading = useSelector((state) => state.employerManageCadidate.changeStatusLoading);
    const changeStatus = useSelector((state) => state.employerManageCadidate.changeStatus);

    const [showModalDetails, setShowModalDetails] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);

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

    const handleShowDetail = () => {
        setShowModalDetails(true);
    };
    const handleCloseDetail = () => {
        setShowModalDetails(false);
    };

    const handleShowUpdate = () => {
        setShowModalUpdate(true);
    };
    const handleCloseUpdate = () => {
        setShowModalUpdate(false);
    };

    return (
        <>
            {/* Modal chi tiết*/}
            <Modal show={showModalDetails} onHide={handleCloseDetail} className="manage-detail-job">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h2>Chi tiết công việc</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>chi tiết</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDetail}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal cập nhật*/}
            <Modal show={showModalUpdate} onHide={handleCloseUpdate} className="manage-detail-job">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h2>Chi tiết công việc</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>update</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUpdate}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className={cx('job-apply-item')} {...props}>
                <div className={cx('job-apply-avt')}>
                    <Avatar src={BASE_URL + data?.avartar} alt={data?.userName} base64={false} />
                </div>
                <div className={cx('job-apply-infor')}>
                    <p>
                        username: <span>{data?.userName}</span>
                    </p>
                    <p>
                        Trạng thái:{' '}
                        {data?.active ? (
                            <span className={cx('job-active')}>Hoạt động</span>
                        ) : (
                            <span className={cx('job-inactive')}>Đã khóa</span>
                        )}
                    </p>
                </div>
                <div className={cx('job-like-button')}>
                    <CustomButton onClick={handleShowDetail}>
                        <FontAwesomeIcon icon={faEye} /> Xem chi tiết
                    </CustomButton>
                    <CustomButton buttonClassName={'btn btn-success'} onClick={handleShowUpdate}>
                        <FontAwesomeIcon icon={faPen} /> Cập nhật
                    </CustomButton>
                    <ButtonPopper
                        name={'Thêm'}
                        icon={<FontAwesomeIcon icon={faCaretDown} />}
                        customBodyStyle={cx('more-body')}
                    >
                        <div className={cx('more-options')}>
                            {data?.active && (
                                <CustomButton buttonClassName={cx('btn btn-warning')}>
                                    <FontAwesomeIcon icon={faLock} /> Khóa tài khoản
                                </CustomButton>
                            )}
                            {!data?.active && (
                                <CustomButton buttonClassName={cx('btn btn-success')}>
                                    <FontAwesomeIcon icon={faLockOpen} /> Mở tài khoản
                                </CustomButton>
                            )}
                            <CustomButton wrapperStyle={cx('btn-delete')}>
                                <FontAwesomeIcon icon={faTrash} /> Xóa
                            </CustomButton>
                        </div>
                    </ButtonPopper>
                </div>
            </div>
        </>
    );
}

export default AlumnusItem;
