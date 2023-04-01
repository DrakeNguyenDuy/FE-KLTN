import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import className from 'classnames/bind';

import styles from './Header.module.scss';
const cx = className.bind(styles);

function Header() {
    return (
        <>
            <Navbar className={cx('header', 'p-0')} expand="lg">
                <Container className={cx('myGr', 'd-flex justify-content-between m-0')}>
                    <Navbar.Brand href="#home" className={cx('p-text')}>
                        <img
                            alt=""
                            src="/static/imgs/logo.png"
                            width="320"
                            height="60"
                            className="d-inline-block align-top"
                        />{' '}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="justify-content-evenly w-100">
                            <Nav.Link href="#1" className="fsc_1">
                                Tìm việc làm
                            </Nav.Link>
                            <Nav.Link href="#2" className="fsc_1">
                                Hồ sơ
                            </Nav.Link>
                            <Nav.Link href="#3" className="fsc_1">
                                Ứng tuyển
                            </Nav.Link>
                            <Nav.Link href="#4" className="fsc_1">
                                Thông báo
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        {/* <Nav>
                        <NavDropdown title="Dropdown" id="basic-navbar-nav">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav> */}
                        <div className="dropdown-cusomize me-3">{/* <i className="fa-light fa-user"></i> */}</div>
                        <div className="round-a-side">
                            <Nav.Link href="#9" className="fsc_1">
                                Dành cho nhà tuyển dụng
                            </Nav.Link>
                            <FontAwesomeIcon icon={faUserAlt} />
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;
