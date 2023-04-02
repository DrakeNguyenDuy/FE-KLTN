import React from 'react';
import CarouselCustomize from '../../Layouts/components/Carousel/CarouselCustomize';
import styles from './Home.module.scss';
import className from 'classnames/bind';
import { Col, Container, Row } from 'react-bootstrap';
import Job from '~/Layouts/components/Job';
const cx = className.bind(styles);
function Home() {
    return (
        <>
            <div className="area-carousel mt-3">
                <CarouselCustomize />
            </div>
            <div className={cx('main-content')}>
                <div className={cx('title', 'fsc_2')}>Việc làm mới nhất</div>
                <Container className={cx('jobs p-0 m-0 mw-100 d-flex')}>
                    <Row className="w-100 m-0">
                        <Col className="p-0" md>
                            <Job />
                        </Col>
                        <Col className="p-0" md>
                            <Job />
                        </Col>
                        <Col className="p-0" md>
                            <Job />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default Home;
