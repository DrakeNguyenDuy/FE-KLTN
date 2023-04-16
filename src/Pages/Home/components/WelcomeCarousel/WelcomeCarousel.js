import styles from './WelcomeCarousel.module.scss';
import className from 'classnames/bind';
import { Button, Form, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import CustomCarousel from '~/components/CustomCarousel';

const cx = className.bind(styles);

const items = [
    { imageURL: 'static/imgs/carousel_1.jpg' },
    { imageURL: 'static/imgs/carousel_1.jpg' },
    { imageURL: 'static/imgs/carousel_1.jpg' },
];

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

function WelcomeCarousel() {
    return (
        <div className={cx('wrapper')}>
            <CustomCarousel
                items={items}
                showControl
                stylesIndicator={cx('indicator')}
                render={(item, index) => (
                    <div className={cx('image-wrapper')}>
                        <Image fluid src={item.imageURL} alt={index} />
                        {/* <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption> */}
                    </div>
                )}
                // prevIcon={<FontAwesomeIcon fontSize={40} color="var(--primary-color)" icon={faCircleChevronLeft} />}
                // nextIcon={<FontAwesomeIcon fontSize={40} color="var(--primary-color)" icon={faCircleChevronRight} />}
            >
                <div className={cx('search-area')}>
                    <div className={cx('wrap-input-search')}>
                        <FontAwesomeIcon color="var(--primary-color)" icon={faSearch} />
                        <input placeholder="Tìm kiếm việc làm ngay" />
                    </div>
                    <Form.Select aria-label="Default select example">
                        {districts.map((item, index) => (
                            <option value={item.code} key={index}>
                                {item.name}
                            </option>
                        ))}
                    </Form.Select>
                    <Button variant="primary">Tìm kiếm</Button>
                </div>
            </CustomCarousel>
        </div>
    );
}

export default WelcomeCarousel;
