import { Button, Image } from 'react-bootstrap';
import styles from './CardProfile.module.scss';
import className from 'classnames/bind';

const cx = className.bind(styles);

function CardProfile({
    avatar = 'https://antimatter.vn/wp-content/uploads/2022/12/anh-avatar-facebook-vo-danh-avt-fb-cho-nu-1.jpg',
    name = 'Khách',
    location = 'Chưa có',
    handleUpdateAvatar,
    ...props
}) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('profile')}>
                <div className={cx('avatar')}>
                    <Image alt="avatar" src={avatar} />
                </div>
                <div className={cx('content')}>
                    <p>Ứng viên</p>
                    <h4>{name}</h4>
                    <p>Đ/c: {location}</p>
                </div>
            </div>
            <div className={cx('action')}>
                <Button
                    variant="outline-primary"
                    onClick={() => {
                        window.location.href = '/profile';
                    }}
                >
                    Cập nhật hồ sơ
                </Button>
                <Button onClick={handleUpdateAvatar}>Cập nhật ảnh</Button>
            </div>
        </div>
    );
}

export default CardProfile;
