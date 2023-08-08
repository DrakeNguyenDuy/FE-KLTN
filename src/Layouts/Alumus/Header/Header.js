import React from 'react';
import { Container, Nav, Navbar, OverlayTrigger, Popover, Button, ListGroup, Offcanvas, Image } from 'react-bootstrap';
import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/store/reducers/authSlice';
import Avatar from '~/components/Avatar/Avatar';
import { BASE_URL } from '~/constant';
import Notify from '~/components/Notify/Notify';
import Loading from '~/components/Loading/Loading';
const cx = className.bind(styles);

function Header() {
    const token = useSelector((state) => state.auth.token);
    const authLoading = useSelector((state) => state.auth.authLoading);
    const user = useSelector((state) => state.auth.user);
    const dispath = useDispatch();

    const handleLogout = () => {
        dispath(logout('alumus'));
    };
    return (
        <Navbar className={cx('header', 'p-0')} expand="lg">
            <Container className={cx('re-container', 'pe-0')}>
                <Navbar.Brand href="/" className={cx('p-text')}>
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
                        <Offcanvas.Title>Tìm việc làm</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className={cx('wrap-offcanvas-body')}>
                        <Nav className={cx('left-nav', 'justify-content-between')}>
                            <div className={cx('item-menu')}>
                                <Link to={'/jobs'} className="fsc_1">
                                    Việc làm
                                </Link>
                                <Link to={'/profile'} className="fsc_1">
                                    Hồ sơ
                                </Link>
                                <Link to={'/cv'} className="fsc_1">
                                    CV
                                </Link>
                                <Link to={'/recruitment'} className="fsc_1">
                                    Ứng tuyển
                                </Link>
                                <Notify />
                            </div>

                            <div className={cx('wrapper-link-soft')}>
                                <Link to={'/login'} className="fsc_2 mt-2 mb-2">
                                    Đăng nhập
                                </Link>
                                <Link to={'/register'} className="fsc_2 mt-2 mb-2">
                                    Đăng ký
                                </Link>
                                <Link to={'/logout'} className="fsc_2 mt-2 mb-2">
                                    Đăng xuất
                                </Link>
                            </div>
                            <Button className="button-no-bg">
                                <Nav.Link href="/employer" className="fsc_2 ">
                                    Dành cho nhà tuyển dụng
                                </Nav.Link>
                            </Button>
                        </Nav>
                        <div className={cx('nav-right')}>
                            <div className={cx('dropdown-cusomize', 'd-dropdown-auth')}>
                                <div className={cx('avatar')}>
                                    {authLoading ? (
                                        <Loading />
                                    ) : token && user ? (
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
                                    {authLoading ? (
                                        <Loading />
                                    ) : token && user ? (
                                        <Link className="fsc_2">{user.userName}</Link>
                                    ) : (
                                        <Link to={'/login'} className="fsc_2">
                                            {'Đăng nhập'}
                                        </Link>
                                    )}
                                    {/* <Link to={'/login'} className="fsc_2">
                                        {authLoading ? <Loading /> : token && user ? user.userName : 'Đăng nhập'}
                                    </Link> */}
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
                                                                <Link className="fsc_2" to="/jobs">
                                                                    Việc làm
                                                                </Link>
                                                            </ListGroup.Item>
                                                        )}
                                                        {user && (
                                                            <ListGroup.Item>
                                                                <Link className="fsc_2" to="/cv">
                                                                    CV
                                                                </Link>
                                                            </ListGroup.Item>
                                                        )}
                                                        {user && (
                                                            <ListGroup.Item>
                                                                <Link className="fsc_2" to="/change-password">
                                                                    Đổi mật khẩu
                                                                </Link>
                                                            </ListGroup.Item>
                                                        )}
                                                        {!user && (
                                                            <ListGroup.Item>
                                                                <Link className="fsc_2" to="/register">
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
                            <div className={cx('round-a-side')}>
                                <Nav.Link href="/employer" className="fsc_2 ">
                                    Dành cho nhà tuyển dụng
                                </Nav.Link>
                                <Image src="/assets/imgs/icons8-employee-48.png" />
                            </div>
                        </div>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default Header;
