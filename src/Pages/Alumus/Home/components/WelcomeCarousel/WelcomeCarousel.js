import { useEffect, useRef, useState } from 'react';
import styles from './WelcomeCarousel.module.scss';
import className from 'classnames/bind';
import { Button, Form, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CustomCarousel from '~/components/common/CustomCarousel';
import { getDistrict } from '~/store/reducers/common/locationSlice';

const cx = className.bind(styles);

const items = [
    { imageURL: 'static/imgs/carousel_1.jpg' },
    { imageURL: 'static/imgs/carousel_2.jpg' },
    { imageURL: 'static/imgs/carousel_3.jpg' },
];

function WelcomeCarousel() {
    const dispath = useDispatch();
    const navigate = useNavigate();
    const districts = useSelector((state) => state.location.districts);
    const [searchValue, setSearchValue] = useState('');
    const areaRef = useRef(null);

    useEffect(() => {
        dispath(getDistrict(1));
    }, []);

    const handleSearch = () => {
        let urlSearch = `/jobs?area=${areaRef.current.value}`;
        if (searchValue.trim().length !== 0) {
            urlSearch += `&search=${searchValue}`;
        }
        navigate(urlSearch);
    };

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
            >
                <div className={cx('search-area')}>
                    <div className={cx('wrap-input-search')}>
                        <FontAwesomeIcon color="var(--primary-color)" icon={faSearch} />
                        <input
                            placeholder="Tìm kiếm việc làm ngay"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                    <Form.Select
                        aria-label="Default select example"
                        // value={areaSelected}
                        // onChange={(e) => setAreaSelected(e.target.value)}
                        ref={areaRef}
                    >
                        {districts.map((item, index) => (
                            <option value={item.code} key={index}>
                                {item.name}
                            </option>
                        ))}
                    </Form.Select>
                    <Button variant="primary" onClick={handleSearch}>
                        Tìm kiếm
                    </Button>
                </div>
            </CustomCarousel>
        </div>
    );
}

export default WelcomeCarousel;
