import styles from './EmployerCarousel.module.scss';
import className from 'classnames/bind';
import { Button, Image } from 'react-bootstrap';

import CustomCarousel from '~/components/CustomCarousel';
import { BASE_URL } from './../../../../../constant/index';

const cx = className.bind(styles);

const items = [
    {
        logoUrl: 'static/imgs/carousel_1.jpg',
        bannerUrl: 'static/imgs/logo-banner.png',
        name: 'Công ty 2GUYS 1',
        companyUrl: '/',
        slogan: 'Thất bại hôm nay là kinh nghiệm hướng đến thành công cho ngày mai',
        description:
            'Trong bất cứ lĩnh vực kinh doanh nào, việc bắt kịp xu hướng là một điểm cộng rất lớn tạo sự hứng thú cho khách hàng. Để làm được điều này, bắt buộc người bán khi viết content hoặc bộ phận content marketing...',
    },
    {
        logoUrl: 'static/imgs/carousel_1.jpg',
        bannerUrl: 'static/imgs/logo-banner.png',
        name: 'Công ty 2GUYS Công ty 2GUYS Công ty 2GUYS',
        companyUrl: '/',
        slogan: 'Thất bại hôm nay là kinh nghiệm hướng đến thành công cho ngày mai',
        description:
            'Trong bất cứ lĩnh vực kinh doanh nào, việc bắt kịp xu hướng là một điểm cộng rất lớn tạo sự hứng thú cho khách hàng. Để làm được điều này, bắt buộc người bán khi viết content hoặc bộ phận content marketing...',
    },
    {
        logoUrl: 'static/imgs/carousel_1.jpg',
        bannerUrl: 'static/imgs/logo-banner.png',
        name: 'Công ty 2GUYS 3',
        companyUrl: '/',
        slogan: 'Thất bại hôm nay là kinh nghiệm hướng đến thành công cho ngày mai',
        description:
            'Trong bất cứ lĩnh vực kinh doanh nào, việc bắt kịp xu hướng là một điểm cộng rất lớn tạo sự hứng thú cho khách hàng. Để làm được điều này, bắt buộc người bán khi viết content hoặc bộ phận content marketing...',
    },
    {
        logoUrl: 'static/imgs/carousel_1.jpg',
        bannerUrl: 'static/imgs/logo-banner.png',
        name: 'Công ty 2GUYS 4',
        companyUrl: '/',
        slogan: 'Thất bại hôm nay là kinh nghiệm hướng đến thành công cho ngày mai',
        description:
            'Trong bất cứ lĩnh vực kinh doanh nào, việc bắt kịp xu hướng là một điểm cộng rất lớn tạo sự hứng thú cho khách hàng. Để làm được điều này, bắt buộc người bán khi viết content hoặc bộ phận content marketing...',
    },
];

function EmployerCarousel({ items }) {
    return (
        <CustomCarousel
            items={items}
            render={(item, index) => (
                <div className={cx('banner-bg')}>
                    <Image fluid className="d-block w-100" src={BASE_URL + item.logo} alt={item.name} />
                    <div className={cx('banner-content')}>
                        <a href={item.companyUrl}>
                            <Image
                                fluid
                                className={cx('banner-logo')}
                                src={'static/imgs/logo-banner.png'}
                                width={200}
                                height={200}
                            />
                        </a>
                        <div className={cx('banner-description')}>
                            <h2>
                                <a href={item.logo}>{item.name}</a>
                            </h2>
                            <p className={cx('banner-slogan')}>{item.address}</p>
                            <p className={cx('banner-detail')}>{item.description}</p>
                        </div>
                        <a href={item.logo}>
                            <Button className={cx('banner-detail-button')}>Xem chi tiết</Button>
                        </a>
                    </div>
                </div>
            )}
        />
    );
}

export default EmployerCarousel;
