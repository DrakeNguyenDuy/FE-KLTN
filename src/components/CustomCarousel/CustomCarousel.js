import Carousel from 'react-bootstrap/Carousel';
import styles from './CustomCarousel.module.scss';
import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';

const cx = className.bind(styles);

function CustomCarousel({
    items,
    render,
    showControl = false,
    showIndicator = false,
    showCustomIndicator = true,
    children,
    wrapperClass,
    stylesIndicator,
    ...props
}) {
    const [activeIndex, setIndex] = useState(0);
    const carouselRef = useRef();

    const onPrev = () => {
        carouselRef.current.prev();
    };
    const onNext = () => {
        carouselRef.current.next();
    };
    const goToIndex = (index) => {
        setIndex(index);
    };

    return !!items && !!render ? (
        <div className={cx('wrapper', wrapperClass)}>
            <Carousel
                ref={carouselRef}
                activeIndex={activeIndex}
                onSelect={goToIndex}
                controls={showControl}
                indicators={showIndicator}
                interval={10000000}
                {...props}
            >
                {items.map((item, index) => (
                    <Carousel.Item key={index}>{render(item, index)}</Carousel.Item>
                ))}
            </Carousel>
            {showCustomIndicator ? (
                <div className={cx('my-carousel-control', stylesIndicator)}>
                    <FontAwesomeIcon
                        size="xl"
                        color="var(--primary-color)"
                        icon={faCircleChevronLeft}
                        onClick={onPrev}
                    />
                    <ol className={cx('my-carousel-indicators')}>
                        {items.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => goToIndex(index)}
                                className={activeIndex === index ? cx('active') : ''}
                            ></li>
                        ))}
                    </ol>
                    <FontAwesomeIcon
                        size="xl"
                        color="var(--primary-color)"
                        icon={faCircleChevronRight}
                        onClick={onNext}
                    />
                </div>
            ) : null}
            {children}
        </div>
    ) : null;
}

export default CustomCarousel;
