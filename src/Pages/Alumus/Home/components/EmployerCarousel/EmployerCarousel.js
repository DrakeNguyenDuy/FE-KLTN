import styles from './EmployerCarousel.module.scss';
import className from 'classnames/bind';
import { Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import CustomCarousel from '~/components/common/CustomCarousel';
import Loading from '~/components/common/Loading';
import { BASE_URL } from '~/constant';

const cx = className.bind(styles);

function EmployerCarousel({ items, loading }) {
    const navigate = useNavigate();
    return loading ? (
        <Loading />
    ) : (
        <>
            <CustomCarousel
                items={items}
                render={(item, index) => (
                    <div className={cx('banner-bg')}>
                        <Image
                            fluid
                            className={cx('d-block', 'w-100', 'bg-image')}
                            src={
                                item.background
                                    ? BASE_URL + item.background
                                    : 'https://phaleplastics.com.vn/wp-content/uploads/2023/02/tuyen-dung.png'
                            }
                            alt={item.name}
                        />
                        <div className={cx('banner-content')}>
                            <Image
                                fluid
                                className={cx('banner-logo')}
                                src={
                                    item.logo
                                        ? BASE_URL + item.logo
                                        : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'
                                }
                                // src={'static/imgs/logo-banner.png'}
                                width={200}
                                height={200}
                            />

                            <div className={cx('banner-description')}>
                                <h2>{item.name}</h2>
                                <p className={cx('banner-slogan')}>{item.sologan}</p>
                                <p className={cx('banner-detail')}>{item.description}</p>
                            </div>
                            <Button
                                className={cx('banner-detail-button')}
                                onClick={() => navigate(`/company/${item.code}`)}
                            >
                                Xem chi tiết
                            </Button>
                        </div>
                    </div>
                )}
            />
        </>
    );
}

export default EmployerCarousel;
