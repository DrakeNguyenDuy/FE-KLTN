import styles from './EmployerCarousel.module.scss';
import className from 'classnames/bind';
import { Button, Image } from 'react-bootstrap';

import CustomCarousel from '~/components/CustomCarousel';
import { BASE_URL } from '~/constant';
import Loading from '~/components/Loading/Loading';
import { useNavigate } from 'react-router-dom';

const cx = className.bind(styles);

function EmployerCarousel({ items, loading }) {
    const navigate = useNavigate();
    console.log(items);
    return loading ? (
        <Loading />
    ) : (
        <>
            <CustomCarousel
                items={items}
                render={(item, index) => (
                    <div className={cx('banner-bg')}>
                        <Image fluid className="d-block w-100" src={BASE_URL + item.background} alt={item.name} />
                        <div className={cx('banner-content')}>
                            <Image
                                fluid
                                className={cx('banner-logo')}
                                src={BASE_URL + item.logo}
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
