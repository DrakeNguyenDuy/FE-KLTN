// import className from 'classnames/bind';
// import styles from './Ca.module.scss';

// const cx = className.bind(styles);

// function CadidateItem({ data }) {
//     return <div className={cx('wrapper')}>{data.cvId}</div>;
// }

// export default CadidateItem;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faEye, faLock, faLockOpen, faPen } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal } from 'react-bootstrap';
import styles from './AlumnusItem.module.scss';
import className from 'classnames/bind';

import CustomButton from '~/components/common/CustomButton';
import { BASE_URL } from '~/constant';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Avatar from '~/components/common/Avatar/Avatar';
import ButtonPopper from '~/components/common/ButtonPopper/ButtonPopper';
import AlumnusDetails from '~/Pages/Admin/Alumnus/components/AlumnusDetails/AlumnusDetails';
import UpdateAlumnus from '~/Pages/Admin/Alumnus/components/UpdateAlumnus/UpdateAlumnus';
import { putchangeStatusAlumnus } from '~/store/reducers/admin/adminListAlumnusSlice';

const cx = className.bind(styles);

// const statusMap = {
//     APPLIED: 'Ứng viên nộp CV',
//     CHECKING: 'Kiểm tra CV',
//     INTERVIEW: 'Phỏng vấn',
//     DEAL: 'Thương lượng lương',
//     PASS: 'Đã nhận',
//     FAIL: 'Từ chối',
// };

function AlumnusItem({ data, toast, ...props }) {
    const dispatch = useDispatch();
    const [status, setStatus] = useState(data?.active);
    const updateStatus = useSelector((state) => state.adminManageAlumnus.updateStatus);

    const [showModalDetails, setShowModalDetails] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);

    useEffect(() => {
        updateStatus &&
            updateStatus?.status === true &&
            updateStatus?.id === data.id &&
            setStatus(updateStatus?.changeStatus);
        console.log(updateStatus);
        // eslint-disable-next-line
    }, [updateStatus]);
    console.log(data);

    const handleChangeStatus = (status) => {
        dispatch(putchangeStatusAlumnus({ code: data.userName, status, id: data.id }));
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
            <Modal show={showModalDetails} onHide={handleCloseDetail} className="manage-cadidate">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h2>Chi tiết ứng viên</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AlumnusDetails data={data} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDetail}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal cập nhật*/}
            <Modal show={showModalUpdate} onHide={handleCloseUpdate} className="manage-cadidate">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h2>Cập nhật ứng viên</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UpdateAlumnus data={data} toast={toast} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUpdate}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className={cx('job-apply-item')} {...props}>
                <div className={cx('job-apply-avt')}>
                    <Avatar
                        src={data?.avartar ? BASE_URL + data?.avartar : '/static/imgs/profile-default-avatar.jpg'}
                        alt={data?.userName}
                        base64={false}
                    />
                </div>
                <div className={cx('job-apply-infor')}>
                    <p>
                        username: <span>{data?.userName}</span>
                    </p>
                    <p>
                        Trạng thái:{' '}
                        {status ? (
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
                            {status && (
                                <CustomButton
                                    buttonClassName={cx('btn btn-warning')}
                                    onClick={() => handleChangeStatus(false)}
                                >
                                    <FontAwesomeIcon icon={faLock} /> Khóa tài khoản
                                </CustomButton>
                            )}
                            {!status && (
                                <CustomButton
                                    buttonClassName={cx('btn btn-success')}
                                    onClick={() => handleChangeStatus(true)}
                                >
                                    <FontAwesomeIcon icon={faLockOpen} /> Mở tài khoản
                                </CustomButton>
                            )}
                            {/* <CustomButton wrapperStyle={cx('btn-delete')}>
                                <FontAwesomeIcon icon={faTrash} /> Xóa
                            </CustomButton> */}
                        </div>
                    </ButtonPopper>
                </div>
            </div>
        </>
    );
}

export default AlumnusItem;
