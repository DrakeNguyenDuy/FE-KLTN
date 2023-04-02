import React from 'react';
import { Carousel, Form, Button } from 'react-bootstrap';
import styles from './Carousel.module.scss';
import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const cx = className.bind(styles);

export default function CarouselCustomize() {
    const districts = [
        { code: 'Q1', name: 'Quận 1' },
        { code: 'Q2', name: 'Quận 2' },
        { code: 'Q3', name: 'Quận 3' },
        { code: 'Q4', name: 'Quận 4' },
        { code: 'Q5', name: 'Quận 5' },
        { code: 'Q6', name: 'Quận 6' },
        { code: 'Q7', name: 'Quận 7' },
        { code: 'Q8', name: 'Quận 8' },
        { code: 'Q9', name: 'Quận 9' },
        { code: 'Q10', name: 'Quận 10' },
        { code: 'Q11', name: 'Quận 11' },
        { code: 'Q12', name: 'Quận 12' },
        { code: 'BT', name: 'Bình Tân' },
        { code: 'BTH', name: 'Bình Thạnh' },
        { code: 'GV', name: 'Gò Vấp' },
        { code: 'PN', name: 'Phú Nhuận' },
        { code: 'TB', name: 'Tân Bình' },
        { code: 'TP', name: 'Tân Phú' },
        { code: 'TD', name: 'Thủ Đức' },
    ];

    return (
        // className="d-block w-100"
        <div className={cx('carousel-container')}>
            <Carousel className={cx('wrap-carousel')}>
                <Carousel.Item>
                    <img className={cx('img-carousel')} src="static/imgs/carousel_1.jpg" alt="First slide" />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className={cx('img-carousel')} src="static/imgs/carousel_2.jpg" alt="Second slide" />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className={cx('img-carousel')} src="static/imgs/carousel_3.jpg" alt="Third slide" />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <div className={cx('search-area')}>
                <div className={cx('wrap-input-search')}>
                    <FontAwesomeIcon color="var(--primary-color)" icon={faSearch} />
                    <input placeholder="Tìm kiếm việc làm ngay" />
                </div>
                <Form.Select aria-label="Default select example">
                    {districts.map((item) => (
                        <option value={item.code}>{item.name}</option>
                    ))}
                </Form.Select>
                <Button variant="primary">Tìm kiếm</Button>
            </div>
        </div>
    );
}
