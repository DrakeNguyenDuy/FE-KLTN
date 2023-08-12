import styles from './EmployerCarousel.module.scss';
import className from 'classnames/bind';
import { Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Avatar from '~/components/common/Avatar/Avatar';

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
                    // <div className={cx('banner-bg')}>
                    //     <Image
                    //         fluid
                    //         className={cx('d-block', 'w-100', 'bg-image')}
                    //         src={
                    //             item.background
                    //                 ? BASE_URL + item.background
                    //                 : 'https://phaleplastics.com.vn/wp-content/uploads/2023/02/tuyen-dung.png'
                    //         }
                    //         alt={item.name}
                    //     />
                    //     <div className={cx('banner-content')}>
                    //         <Image
                    //             fluid
                    //             className={cx('banner-logo')}
                    //             src={
                    //                 item.logo
                    //                     ? BASE_URL + item.logo
                    //                     : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'
                    //             }
                    //             // src={'static/imgs/logo-banner.png'}
                    //             width={200}
                    //             height={200}
                    //         />

                    //         <div className={cx('banner-description')}>
                    //             <h2>{item.name}</h2>
                    //             <p className={cx('banner-slogan')}>{item.sologan}</p>
                    //             <p className={cx('banner-detail')}>{item.description}</p>
                    //         </div>
                    //         <Button
                    //             className={cx('banner-detail-button')}
                    //             onClick={() => navigate(`/company/${item.code}`)}
                    //         >
                    //             Xem chi tiết
                    //         </Button>
                    //     </div>
                    // </div>

                    <div className={cx('banner-bg')}>
                        <div className={cx('overview')}>
                            <div
                                className={cx('overview-background')}
                                style={{
                                    backgroundImage: item?.background ? `url(${BASE_URL + item?.background})` : null,
                                }}
                            >
                                <Avatar
                                    className={cx('avatar')}
                                    src={item?.logo ? BASE_URL + item?.logo : '/static/imgs/profile-default-avatar.jpg'}
                                    base64={false}
                                />
                            </div>

                            <div className={cx('content-wrapper')}>
                                <div className={cx('overview-content')}>
                                    <h2 className={cx('full-name')}>{item?.name}</h2>
                                    <p className={cx('slogan')}>{item?.sologan}</p>
                                    {/* <p className={cx('infor')}>
                                    Quy mô: <span>{item?.numOfEmployee} nhân viên</span>
                                    <br />
                                    Địa chỉ: <span>{item?.address}</span>
                                    <br />
                                    Liên hệ: <span>SĐT: {item?.phoneNumber}</span>
                                </p> */}
                                    <p className={cx('introduce')}>
                                        Giới thiệu về công ty: <span>{item?.description}</span>
                                    </p>
                                </div>
                                <Button
                                    className={cx('banner-detail-button')}
                                    onClick={() => navigate(`/company/${item.code}`)}
                                >
                                    Xem chi tiết
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            />
        </>
    );
}

export default EmployerCarousel;
