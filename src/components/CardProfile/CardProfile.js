import { Button, Image } from 'react-bootstrap';
import styles from './CardProfile.module.scss';
import className from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProfile } from '~/store/reducers/profileSlice';

const cx = className.bind(styles);

function CardProfile({
    avatar = 'static/imgs/profile-default-avatar.jpg',
    name = 'Chưa cập nhật',
    location = 'Chưa cập nhật',
    handleUpdateAvatar,
    ...props
}) {
    const navigate = useNavigate();
    const dispath = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const profile = useSelector((state) => state.profile.profile);

    useEffect(() => {
        if (token) {
            dispath(getProfile());
        }
        // eslint-disable-next-line
    }, []);
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
            {token ? (
                <div className={cx('action')}>
                    <Button variant="outline-primary" onClick={() => navigate('/profile')}>
                        Cập nhật hồ sơ
                    </Button>
                    {typeof profile !== 'string' && <Button onClick={handleUpdateAvatar}>Cập nhật ảnh</Button>}
                </div>
            ) : null}
        </div>
    );
}

export default CardProfile;
