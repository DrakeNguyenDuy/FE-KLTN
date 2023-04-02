import React from 'react';
import CarouselCustomize from '../../Layouts/components/Carousel/CarouselCustomize';
import styles from './Header.module.scss';
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
            <div className={cx('main-content', 'fsc_2')}>
                <div className={cx('title')}>Việc làm mới nhất</div>
                <Container>
                    <Row>
                        <Col>
                            <Job />
                        </Col>
                        <Col>
                            <Job />
                        </Col>
                        <Col>
                            <Job />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default Home;
