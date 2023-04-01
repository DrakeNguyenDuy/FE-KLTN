import React from 'react';
import { Container, Nav, Navbar, Badge, OverlayTrigger, Popover, Button, ListGroup } from 'react-bootstrap';
import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonDress, faUser, faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
const cx = className.bind(styles);

function Header() {
    return (
        <>
            <Navbar className={cx('header', 'p-0')} expand="lg">
                <Container className={cx('re-container', 'pe-0')}>
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
                            {/* <Nav.Link href="#4" className="fsc_1">
                                Thông báo<Badge bg="secondary">9</Badge>
                            </Nav.Link> */}
                            <OverlayTrigger
                                trigger="click"
                                key="bottom"
                                placement="bottom"
                                overlay={
                                    <Popover id={`popover-positioned-bottom`}>
                                        <Popover.Body>
                                            <ListGroup>
                                                <ListGroup.Item action href="#link1">
                                                    Link 1
                                                </ListGroup.Item>
                                                <ListGroup.Item action href="#link2" disabled>
                                                    Link 2
                                                </ListGroup.Item>
                                                <ListGroup.Item action onClick={() => {}}>
                                                    This one is a button
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Popover.Body>
                                    </Popover>
                                }
                            >
                                <Button style={{ background: 'none', border: 'none' }} className={cx('fsc_1')}>
                                    Thông báo <Badge className={cx('re-badge')}>9</Badge>
                                </Button>
                            </OverlayTrigger>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <div className={cx('dropdown-cusomize', 'me-3', 'd-dropdown-auth')}>
                            {/* <span className="m-0" />
                            <button>Đăng nhập</button> */}
                            <div className={cx('avatar')}>
                                <FontAwesomeIcon size="xl" color="var(--secondary-color)" icon={faUser} />
                            </div>
                            <div className={cx('action-auth')}>
                                <Nav.Link href="#long" className="fsc_2">
                                    Đăng nhập
                                </Nav.Link>
                                <OverlayTrigger
                                    trigger="click"
                                    key="bottom"
                                    placement="bottom"
                                    overlay={
                                        <Popover id={`popover-positioned-bottom`}>
                                            <Popover.Body>
                                                <ListGroup>
                                                    <ListGroup.Item action href="#link1">
                                                        Đăng ký
                                                    </ListGroup.Item>
                                                    <ListGroup.Item action href="#link2">
                                                        Đăng xuất
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
                        <div className={cx('round-a-side')}>
                            <Nav.Link href="#9" className="fsc_2">
                                Dành cho nhà tuyển dụng
                            </Nav.Link>
                            <FontAwesomeIcon color="var(--primary-color)" icon={faPersonDress} />
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;
