import { Button, Image } from 'react-bootstrap';
import styles from './CardProfile.module.scss';
import className from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

const cx = className.bind(styles);

function CardProfile({
    avatar = 'static/imgs/profile-default-avatar.jpg',
    name = 'Chưa cập nhật',
    location = 'Chưa cập nhật',
    handleUpdateAvatar,
    ...props
}) {
    const navigate = useNavigate();
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
                <Button variant="outline-primary" onClick={() => navigate('/profile')}>
                    Cập nhật hồ sơ
                </Button>
                <Button onClick={handleUpdateAvatar}>Cập nhật ảnh</Button>
            </div>
        </div>
    );
}

export default CardProfile;
