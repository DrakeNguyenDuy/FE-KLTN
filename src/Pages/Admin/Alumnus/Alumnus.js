import className from 'classnames/bind';
import styles from './Alumnus.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Loading from '~/components/common/Loading/Loading';
import { Button, Form, Modal, Pagination } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { adminAddAlumnus, getListAlumnus, resetAddAlumnus } from '~/store/reducers/admin/adminListAlumnusSlice';
import AlumnusItem from '~/components/admin/AlumnusItem/AlumnusItem';
import CustomButton from '~/components/common/CustomButton/CustomButton';
import AddAlumnus from './components/AddAlumnus/AddAlumnus';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Alumnus.scss';
import NoResult from '~/components/common/NoResult/NoResult';

const cx = className.bind(styles);

function Alumnus() {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = +searchParams.get('page');
    const search = searchParams.get('search');
    const active = searchParams.get('active');

    const [showModalAdd, setShowModalAdd] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.adminAuth.user);
    const loading = useSelector((state) => state.adminManageAlumnus.listAlumnusLoading);
    const listAlumnus = useSelector((state) => state.adminManageAlumnus.listAlumnus);

    const [statusSelected, setStatusSelected] = useState(active ? active : '');
    const [searchValue, setSearchValue] = useState(search ? search : '');

    const addAlumnusStatus = useSelector((state) => state.adminManageAlumnus.addAlumnusStatus);
    const updateAlumnusStatus = useSelector((state) => state.adminManageAlumnus.updateAlumnusStatus);
    const updateAvatarStatus = useSelector((state) => state.adminManageAlumnus.updateAvatarStatus);

    useEffect(() => {
        user &&
            dispatch(
                getListAlumnus({
                    page,
                    search,
                    active,
                }),
            );
        // eslint-disable-next-line
    }, [page, searchParams, updateAlumnusStatus, updateAvatarStatus]);

    useEffect(() => {
        handleCloseAdd();
        addAlumnusStatus && toast('Đã thêm ứng viên thành công!');
        dispatch(resetAddAlumnus());
        // eslint-disable-next-line
    }, [addAlumnusStatus]);

    const handleSearch = () => {
        setSearchParams(getSearchParams());
    };

    const getSearchParams = (status) => {
        let searchParams = {
            page: 1,
        };
        searchValue.trim().length !== 0 && (searchParams['search'] = searchValue);
        status
            ? status !== 'all' && (searchParams['active'] = status)
            : statusSelected.trim().length !== 0 && (searchParams['status'] = statusSelected);

        return searchParams;
    };

    const getNavigateValue = (page) => {
        let searchParams = {
            page: page,
        };
        search && (searchParams['search'] = search);
        active && (searchParams['active'] = active);
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
    const hanleAddAlumnus = (data) => {
        dispatch(adminAddAlumnus({ data }));
    };

    return (
        <div className={cx('alumnusWrapper')}>
            {/* Modal Thêm tk*/}
            <ToastContainer />
            <Modal show={showModalAdd} onHide={handleCloseAdd} className="manage-cadidate">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h2>Thêm ứng viên</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddAlumnus onAdd={hanleAddAlumnus} toast={toast} page={page} search={search} active={active} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAdd}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className={cx('find-job-apply')}>
                <CustomButton wrapperStyle={cx('add-btn')} onClick={handleShowAdd}>
                    <FontAwesomeIcon icon={faPlus} /> Thêm tài khoản
                </CustomButton>
                <Form.Select aria-label="Trạng thái ứng tuyển" value={statusSelected} onChange={handleChangeStatus}>
                    <option value="">Trạng thái tài khoản</option>
                    <option value="ACTIVE">Đang hoạt động</option>
                    <option value="INACTIVE">Đã khóa</option>
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
            {loading ? (
                <Loading />
            ) : (
                <>
                    <div className={cx('warapper')}>
                        {listAlumnus?.customers && listAlumnus.customers.length !== 0 ? (
                            listAlumnus.customers.map((item, index) => (
                                <AlumnusItem key={index} data={item} toast={toast} />
                            ))
                        ) : (
                            <NoResult message={'Không tìm thấy'} />
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
                                ? renderPaging(listAlumnus.totalPages, page === 0 ? page : page - 1).map(
                                      (paging) => paging,
                                  )
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
                </>
            )}
        </div>
    );
}

export default Alumnus;
