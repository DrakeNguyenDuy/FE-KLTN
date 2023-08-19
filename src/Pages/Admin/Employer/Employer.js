import className from 'classnames/bind';
import styles from './Employer.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Loading from '~/components/common/Loading/Loading';
import { Button, Form, Modal, Pagination } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomButton from '~/components/common/CustomButton/CustomButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Employer.scss';
import { getListEmployers, resetAddEmployer, adminAddEmployer } from '~/store/reducers/admin/adminListEmployerSlice';
import EmployerItem from '~/components/admin/EmployerItem/EmployerItem';
import AddEmployer from './components/AddEmployer/AddEmployer';

const cx = className.bind(styles);

function Employer() {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = +searchParams.get('page');
    const search = searchParams.get('search');
    const active = searchParams.get('active');

    const [showModalAdd, setShowModalAdd] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.adminAuth.user);
    const loading = useSelector((state) => state.adminManageEmployer.listEmployersLoading);
    const listEmployers = useSelector((state) => state.adminManageEmployer.listEmployers);

    const [statusSelected, setStatusSelected] = useState(active ? active : '');
    const [searchValue, setSearchValue] = useState(search ? search : '');

    const addEmployerStatus = useSelector((state) => state.adminManageEmployer.addEmployerStatus);
    const updateEmployerStatus = useSelector((state) => state.adminManageEmployer.updateEmployerStatus);
    const updateAvatarStatus = useSelector((state) => state.adminManageEmployer.updateAvatarStatus);

    useEffect(() => {
        user &&
            dispatch(
                getListEmployers({
                    page,
                    search,
                    active,
                }),
            );
        // eslint-disable-next-line
    }, [page, searchParams, updateEmployerStatus, updateAvatarStatus, addEmployerStatus]);

    useEffect(() => {
        addEmployerStatus && toast('Đã thêm ứng viên thành công!');
        dispatch(resetAddEmployer());
        // eslint-disable-next-line
    }, [addEmployerStatus]);

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
    const hanleAddEmployer = (data) => {
        dispatch(adminAddEmployer({ data }));
    };

    return (
        <div className={cx('alumnusWrapper')}>
            {/* Modal Thêm tk*/}
            <ToastContainer />
            <Modal show={showModalAdd} onHide={handleCloseAdd} className="manage-cadidate">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h2>Thêm nhà tuyển dụng</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddEmployer onAdd={hanleAddEmployer} toast={toast} page={page} search={search} active={active} />
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
                        {console.log(listEmployers)}
                        {listEmployers?.data && listEmployers.data.length !== 0 ? (
                            listEmployers.data.map((item, index) => (
                                <EmployerItem key={index} data={item} toast={toast} />
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
                            {listEmployers
                                ? renderPaging(listEmployers.totalPages, page === 0 ? page : page - 1).map(
                                      (paging) => paging,
                                  )
                                : null}
                            {listEmployers && listEmployers.totalPages !== 1 && page < listEmployers.totalPages && (
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

export default Employer;
