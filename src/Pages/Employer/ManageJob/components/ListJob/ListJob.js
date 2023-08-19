import className from 'classnames/bind';
import styles from './ListJob.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { employerGetProducts } from '~/store/reducers/employer/employerManageJobSlice';
import { useEffect, useState } from 'react';
import Loading from '~/components/common/Loading/Loading';
import JobManageItem from '~/components/employer/JobManageItem';
import { Button, Form, Pagination } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = className.bind(styles);

const listStatus = [
    { code: 'ACTIVE', name: 'Đang ứng tuyển' },
    { code: 'INACTIVE', name: 'Chờ đăng tuyển' },
    { code: 'OUTOFDATE', name: 'Đã hết hạn' },
];
function ListJob({ active }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = +searchParams.get('page');
    const search = searchParams.get('search');
    const status = searchParams.get('status');

    const dispatch = useDispatch();
    const user = useSelector((state) => state.employerAuth.user);
    const loading = useSelector((state) => state.employerManageJob.loading);
    const products = useSelector((state) => state.employerManageJob.products);
    const deleteStatus = useSelector((state) => state.employerManageJob.deleteStatus);
    const createJobStatus = useSelector((state) => state.job.createJobStatus);
    const updateJobStatus = useSelector((state) => state.job.updateJobStatus);

    const [statusSelected, setStatusSelected] = useState(status ? status : '');
    const [searchValue, setSearchValue] = useState(search ? search : '');

    useEffect(() => {
        active === 'list-job' &&
            user &&
            dispatch(
                employerGetProducts({
                    code: user?.code,
                    page,
                    search,
                    status,
                }),
            );
        // eslint-disable-next-line
    }, [page, searchParams, deleteStatus, active, createJobStatus, updateJobStatus]);
    console.log(products);

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

    return (
        <>
            <div className={cx('find-job-apply')}>
                <Form.Select aria-label="Trạng thái ứng tuyển" value={statusSelected} onChange={handleChangeStatus}>
                    <option value="">Trạng thái ứng tuyển</option>
                    {listStatus.map((status) => (
                        <option key={status.code} value={status.code}>
                            {status.name}
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
            {loading ? (
                <Loading />
            ) : (
                <>
                    <div className={cx('warapper')}>
                        {products?.products && products.products.length !== 0 ? (
                            products.products.map((item, index) => (
                                <JobManageItem key={index} data={item} userCode={user?.code} />
                            ))
                        ) : (
                            <div className={cx('not-found')}>Chưa có công việc</div>
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
                            {products
                                ? renderPaging(products.totalPages, page === 0 ? page : page - 1).map(
                                      (paging) => paging,
                                  )
                                : null}
                            {products && products.totalPages !== 1 && page < products.totalPages && (
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
        </>
    );
}

export default ListJob;
