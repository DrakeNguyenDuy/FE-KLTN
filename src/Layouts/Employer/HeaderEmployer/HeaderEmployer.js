import React, { useEffect } from 'react';
import {
    Container,
    Nav,
    Navbar,
    OverlayTrigger,
    Popover,
    Button,
    ListGroup,
    Offcanvas,
    NavDropdown,
    Image,
} from 'react-bootstrap';
import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '~/components/common/Loading';
import styles from './HeaderEmployer.module.scss';
import { Link } from 'react-router-dom';
import Avatar from '~/components/common/Avatar';
import { BASE_URL } from '~/constant';
import { employerLogout } from '~/store/reducers/employer/employerLoginSlice';
import Notify from '~/components/common/Notify/Notify';
import NotifyEmployer from '~/components/common/Notify/NotifyEmployer';

const cx = className.bind(styles);

function HeaderEmployer() {
    const dispath = useDispatch();
    const user = useSelector((state) => state.employerAuth.user);

    const handleLogout = () => {
        dispath(employerLogout('alumus'));
    };

    return (
        <Navbar className={cx('header', 'p-0')} expand="lg">
            <Container className={cx('re-container', 'pe-0')}>
                <Navbar.Brand href="/employer" className={cx('p-text')}>
                    <img
                        alt=""
                        src="/static/imgs/logo.png"
                        with="360"
                        height="60"
                        className={cx('logo', 'd-inline-block', 'align-top')}
                    />
                </Navbar.Brand>
                <Navbar.Toggle
                    style={{
                        color: 'var(--secondary-color)',
                        borderColor: 'var(--secondary-color)',
                    }}
                    aria-controls="basic-navbar-nav"
                />
                <Navbar.Offcanvas id="basic-navbar-nav" aria-labelledby="basic-navbar-nav">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Tuyển dụng</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className={cx('wrap-offcanvas-body', 'w-100', 'justify-content-between')}>
                            <Link to={'/employer/manage-job/post-job'} className="fsc_1">
                                Quản lý tuyển dụng
                            </Link>
                            <Link to={'/employer/profile'} className="fsc_1">
                                Hồ sơ
                            </Link>
                            {/* <Link to={'/employer/post-job'} className="fsc_1">
                                Đăng tin tuyển dụng
                            </Link> */}
                            <NotifyEmployer />

                            <div className={cx('dropdown-cusomize', 'd-dropdown-auth')}>
                                <div className={cx('avatar')}>
                                    {/* {console.log(user.avatar)} */}
                                    {user ? (
                                        <Avatar
                                            src={user.avatar ? BASE_URL + user.avatar : null}
                                            base64={false}
                                            name={user.userName}
                                        />
                                    ) : (
                                        <FontAwesomeIcon size="xl" color="var(--secondary-color)" icon={faUser} />
                                    )}
                                </div>
                                <div className={cx('action-auth')}>
                                    {user ? (
                                        <Link className="fsc_2">{user.userName}</Link>
                                    ) : (
                                        <Link to={'/employer/login'} className="fsc_2">
                                            {'Đăng nhập'}
                                        </Link>
                                    )}
                                    <OverlayTrigger
                                        rootClose
                                        trigger="click"
                                        key="bottom"
                                        placement="bottom"
                                        overlay={
                                            <Popover show={false} id={`popover-positioned-bottom`}>
                                                <Popover.Body>
                                                    <ListGroup>
                                                        {user && (
                                                            <ListGroup.Item>
                                                                <Link className="fsc_2" to="/employer/manage-job">
                                                                    Tuyển dụng
                                                                </Link>
                                                            </ListGroup.Item>
                                                        )}
                                                        {user && (
                                                            <ListGroup.Item>
                                                                <Link
                                                                    className="fsc_2"
                                                                    to="/employer/manage-job/post-job"
                                                                >
                                                                    Đăng tuyển
                                                                </Link>
                                                            </ListGroup.Item>
                                                        )}
                                                        {user && (
                                                            <ListGroup.Item>
                                                                <Link className="fsc_2" to="/employer/change-password">
                                                                    Đổi mật khẩu
                                                                </Link>
                                                            </ListGroup.Item>
                                                        )}
                                                        {!user && (
                                                            <ListGroup.Item>
                                                                <Link className="fsc_2" to="/employer/register">
                                                                    Đăng ký
                                                                </Link>
                                                            </ListGroup.Item>
                                                        )}
                                                        {user && (
                                                            <ListGroup.Item onClick={handleLogout}>
                                                                <Link className="fsc_2">Đăng xuất</Link>
                                                            </ListGroup.Item>
                                                        )}
                                                    </ListGroup>
                                                </Popover.Body>
                                            </Popover>
                                        }
                                    >
                                        <Button style={{ background: 'none', border: 'none' }}>
                                            <FontAwesomeIcon
                                                size="xl"
                                                color="var(--primary-color)"
                                                icon={faCircleChevronDown}
                                            />
                                        </Button>
                                    </OverlayTrigger>
                                </div>
                            </div>
                            <div className={cx('wrapper-link-soft')}>
                                <Link to={'/employer/login'} className="fsc_2 mt-2 mb-2">
                                    Đăng nhập
                                </Link>
                                <Link to={'/employer/register'} className="fsc_2 mt-2 mb-2">
                                    Đăng ký
                                </Link>
                                <Link to={'/employer/logout'} className="fsc_2 mt-2 mb-2">
                                    Đăng xuất
                                </Link>
                            </div>
                            <div className={cx('round-a-side')}>
                                <Nav.Link href="/" className="fsc_2 ">
                                    Dành cho ứng viên
                                </Nav.Link>
                                <Image src="/assets/imgs/icons8-employee-48.png" />
                            </div>
                            <Button className="button-no-bg">
                                <Nav.Link href="/" className="fsc_2 ">
                                    Dành cho ứng viên
                                </Nav.Link>
                            </Button>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default HeaderEmployer;
