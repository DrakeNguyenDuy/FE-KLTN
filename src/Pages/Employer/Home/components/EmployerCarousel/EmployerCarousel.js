import styles from './EmployerCarousel.module.scss';
import className from 'classnames/bind';
import { Button, Image } from 'react-bootstrap';

import CustomCarousel from '~/components/common/CustomCarousel';

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

function EmployerCarousel() {
    return (
        <CustomCarousel
            items={items}
            render={(item, index) => (
                <div className={cx('banner-bg')}>
                    <Image fluid className="d-block w-100" src={item.logoUrl} alt={item.logoUrl} />
                    <div className={cx('banner-content')}>
                        <a href={item.companyUrl}>
                            <Image fluid className={cx('banner-logo')} src={item.bannerUrl} width={200} height={200} />
                        </a>
                        <div className={cx('banner-description')}>
                            <h2>
                                <a href={item.companyUrl}>{item.name}</a>
                            </h2>
                            <p className={cx('banner-slogan')}>{item.slogan}</p>
                            <p className={cx('banner-detail')}>{item.description}</p>
                        </div>
                        <a href={item.companyUrl}>
                            <Button className={cx('banner-detail-button')}>Xem chi tiết</Button>
                        </a>
                    </div>
                </div>
            )}
        />
    );
}

export default EmployerCarousel;
