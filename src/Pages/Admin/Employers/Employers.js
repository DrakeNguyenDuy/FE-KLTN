import className from 'classnames/bind';
import styles from './Employers.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { employerGetProducts } from '~/store/reducers/employer/employerManageJobSlice';
import { useEffect, useState } from 'react';
import Loading from '~/components/common/Loading/Loading';
import JobManageItem from '~/components/employer/JobManageItem';
import { Button, Form, Modal, Pagination } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CadidateItem from '~/components/common/CadidateItem/CadidateItem';
import { employerGetListAlumnus } from '~/store/reducers/employer/employerManageCadidateSlice';
import { getApplyStatus } from '~/store/reducers/alumus/recruitmentSlice';
import { getListAlumnus } from '~/store/reducers/admin/adminListAlumnusSlice';
import AlumnusItem from '~/components/admin/AlumnusItem/AlumnusItem';
import CustomButton from '~/components/common/CustomButton/CustomButton';
import AddAlumnus from './components/AddAlumnus/AddAlumnus';
import './Employers.scss';

const cx = className.bind(styles);

const listStatus = [
    { code: 'ACTIVE', name: 'Đang ứng tuyển' },
    { code: 'INACTIVE', name: 'Chờ đăng tuyển' },
    { code: 'OUTOFDATE', name: 'Đã hết hạn' },
];

const statusAlumnus = {
    APPLIED: 'Ứng viên nộp CV',
    CHECKING: 'Kiểm tra CV',
    INTERVIEW: 'Phỏng vấn',
    DEAL: 'Thương lượng lương',
    PASS: 'Đã nhận',
    FAIL: 'Từ chối',
};

function Employers() {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = +searchParams.get('page');
    const search = searchParams.get('search');
    const status = searchParams.get('status');

    const [showModalAdd, setShowModalAdd] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.adminAuth.user);
    const loading = useSelector((state) => state.adminManageAlumnus.listAlumnusLoading);
    const listAlumnus = useSelector((state) => state.adminManageAlumnus.listAlumnus);

    // const deleteStatus = useSelector((state) => state.employerManageCadidate.deleteStatus);
    const [statusSelected, setStatusSelected] = useState(status ? status : '');
    const [searchValue, setSearchValue] = useState(search ? search : '');
    const applyStatus = useSelector((state) => state.recruitment.status);

    useEffect(() => {
        user &&
            dispatch(
                getListAlumnus({
                    page,
                    search,
                    status,
                }),
            );
        // eslint-disable-next-line
    }, [page, searchParams]);

    useEffect(() => {
        dispatch(getApplyStatus());
    }, []);

    const handleSearch = () => {
        setSearchParams(getSearchParams());
    };

    const getSearchParams = (status) => {
        let searchParams = {
            page: 1,
        };
        searchValue.trim().length !== 0 && (searchParams['search'] = searchValue);
        status
            ? status !== 'all' && (searchParams['status'] = status)
            : statusSelected.trim().length !== 0 && (searchParams['status'] = statusSelected);

        return searchParams;
    };

    const getNavigateValue = (page) => {
        let searchParams = {
            page: page,
        };
        search && (searchParams['search'] = search);
        status && (searchParams['status'] = status);
        return searchParams;
    };

    const handleChangeStatus = (e) => {
        const value = e.target.value;
        setStatusSelected(value);
        setSearchParams(getSearchParams(value ? value : 'all'));
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

    const handleShowAdd = () => {
        setShowModalAdd(true);
    };
    const handleCloseAdd = () => {
        setShowModalAdd(false);
    };

    return loading ? (
        <Loading />
    ) : (
        <div className={cx('alumnusWrapper')}>
            {/* Modal Thêm tk*/}
            <Modal show={showModalAdd} onHide={handleCloseAdd} className="manage-cadidate">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h2>Thêm ứng viên</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddAlumnus />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAdd}>
                        Đóng
                    </Button>
                    <Button variant="primary">Thêm</Button>
                </Modal.Footer>
            </Modal>
            <div className={cx('find-job-apply')}>
                <CustomButton wrapperStyle={cx('add-btn')} onClick={handleShowAdd}>
                    <FontAwesomeIcon icon={faPlus} /> Thêm tài khoản
                </CustomButton>
                <Form.Select aria-label="Trạng thái ứng tuyển" value={statusSelected} onChange={handleChangeStatus}>
                    <option value="">Trạng thái tài khoản</option>
                    {applyStatus.map((status) => (
                        <option key={status.code} value={status.code}>
                            {statusAlumnus[status.code]}
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
            <div className={cx('warapper')}>
                {listAlumnus?.customers && listAlumnus.customers.length !== 0 ? (
                    listAlumnus.customers.map((item, index) => (
                        <AlumnusItem key={index} data={item} statusList={applyStatus} />
                    ))
                ) : (
                    <div className={cx('not-found')}>Chưa có nhà tuyển dụng</div>
                )}
            </div>
            <div className={cx('paging')}>
                <Pagination className={cx('pagination', 'justify-content-center mt-3')}>
                    {page > 1 && (
                        <Pagination.Prev
                            onClick={(e) => {
                                e.preventDefault();
                                setSearchParams(getNavigateValue(page - 1));
                            }}
                        />
                    )}
                    {listAlumnus
                        ? renderPaging(listAlumnus.totalPages, page === 0 ? page : page - 1).map((paging) => paging)
                        : null}
                    {listAlumnus && listAlumnus.totalPages !== 1 && page < listAlumnus.totalPages && (
                        <Pagination.Next
                            onClick={(e) => {
                                e.preventDefault();
                                setSearchParams(getNavigateValue(page + 1));
                            }}
                        />
                    )}
                </Pagination>
            </div>
        </div>
    );
}

export default Employers;
