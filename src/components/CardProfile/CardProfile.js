import { Button, Image } from 'react-bootstrap';
import styles from './CardProfile.module.scss';
import className from 'classnames/bind';

const cx = className.bind(styles);

function CardProfile() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('profile')}>
                <Image
                    alt="avatar"
                    src="https://antimatter.vn/wp-content/uploads/2022/12/anh-avatar-facebook-vo-danh-avt-fb-cho-nu-1.jpg"
                    className={cx('avatar')}
                    width={100}
                    height={100}
                />
                <div className={cx('content')}>
                    <p>Ứng viên</p>
                    <h3>Mao Doãn Nhi</h3>
                    <p>Đ/c: Bình Thạnh, TP.HCM</p>
                </div>
            </div>
            <div className={cx('action')}>
                <Button variant="outline-primary">Cập nhật hồ sơ</Button>
                <Button>Cập nhật ảnh</Button>
            </div>
        </div>
    );
}

export default CardProfile;
