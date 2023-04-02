import React from 'react';
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

import styles from './HeaderEmployer.module.scss';
import { Link } from 'react-router-dom';
const cx = className.bind(styles);

function HeaderEmployer() {
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
                    <Offcanvas.Body>
                        <Nav className={cx('wrap-offcanvas-body', 'w-100', 'justify-content-between')}>
                            <NavDropdown className="fsc_1" title="Việc làm" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Option 1</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Option 2</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">OPtion 3</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.4">Option 4</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="#2" className="fsc_1">
                                Hồ sơ
                            </Nav.Link>
                            <Nav.Link href="#3" className="fsc_1">
                                Đăng việc
                            </Nav.Link>
                            <NavDropdown className="fsc_1" title="Thông báo" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Option 1</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Option 2</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">OPtion 3</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.4">Option 4</NavDropdown.Item>
                            </NavDropdown>
                            <div className={cx('dropdown-cusomize', 'd-dropdown-auth')}>
                                <div className={cx('avatar')}>
                                    <FontAwesomeIcon size="xl" color="var(--secondary-color)" icon={faUser} />
                                </div>
                                <div className={cx('action-auth')}>
                                    <Link to={'/login'} className="fsc_2">
                                        Đăng nhập
                                    </Link>
                                    <OverlayTrigger
                                        rootClose
                                        trigger="click"
                                        key="bottom"
                                        placement="bottom"
                                        overlay={
                                            <Popover show={false} id={`popover-positioned-bottom`}>
                                                <Popover.Body>
                                                    <ListGroup>
                                                        <ListGroup.Item>
                                                            {' '}
                                                            <Link className="fsc_2" to="/register">
                                                                Đăng ký
                                                            </Link>
                                                        </ListGroup.Item>
                                                        <ListGroup.Item>
                                                            <Link className="fsc_2" to="/logout">
                                                                Đăng xuất
                                                            </Link>
                                                        </ListGroup.Item>
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
