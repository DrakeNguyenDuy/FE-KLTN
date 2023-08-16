import React, { useEffect } from 'react';
import className from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Container, Nav, Navbar, OverlayTrigger, Popover, Button, ListGroup, Offcanvas, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Avatar from '~/components/common/Avatar';
import Notify from '~/components/common/Notify';
import { BASE_URL } from '~/constant';
import { AlumusLogout } from '~/store/reducers/alumus/loginSlice';

const cx = className.bind(styles);

function Header() {
    const dispath = useDispatch();
    const user = useSelector((state) => state.alumusAuth.user);

    const handleLogout = () => {
        dispath(AlumusLogout('alumus'));
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
                            <Button className="button-no-bg">
                                <Nav.Link href="/employer" className="fsc_2 ">
                                    Dành cho nhà tuyển dụng
                                </Nav.Link>
                            </Button>
                        </Nav>
                        <div className={cx('nav-right')}>
                            <div className={cx('dropdown-cusomize', 'd-dropdown-auth')}>
                                <div className={cx('avatar')}>
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
                                        <Link to={'/login'} className="fsc_2">
                                            {'Đăng nhập'}
                                        </Link>
                                    )}
                                    <OverlayTrigger
                                        rootClose
                                        trigger="click"
                                        key="bottom"
                                        placement="bottom"
                                        overlay={
                                            user ? (
                                                <Popover show={false} id={`popover-positioned-bottom`}>
                                                    <Popover.Body>
                                                        <ListGroup>
                                                            <ListGroup.Item onClick={handleLogout}>
                                                                <Link className="fsc_2">Đăng xuất</Link>
                                                            </ListGroup.Item>
                                                        </ListGroup>
                                                    </Popover.Body>
                                                </Popover>
                                            ) : (
                                                <></>
                                            )
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
                        </div>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default Header;
