import { useNavigate } from 'react-router-dom';
import CustomButton from '../CustomButton/CustomButton';
import styles from './NotLogin.module.scss';
import className from 'classnames/bind';

const cx = className.bind(styles);

function NotLogin() {
    const navigate = useNavigate();
    return (
        <div className={cx('wrapper')}>
            <p className={cx('infor')}>Hãy đăng nhập trước để thực hiện chức năng này</p>
            <CustomButton wrapperStyle={cx('wrapper-button')} onClick={() => navigate('/login')}>
                Đăng nhập ngay
            </CustomButton>
        </div>
    );
}

export default NotLogin;
