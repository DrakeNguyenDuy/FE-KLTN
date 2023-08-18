import className from 'classnames/bind';
import styles from './NotFound.module.scss';
import CustomButton from '../CustomButton/CustomButton';
import { useNavigate } from 'react-router-dom';

const cx = className.bind(styles);

function NotFound() {
    const navigate = useNavigate();
    return (
        <div className={cx('wrapper', 'container d-flex justify-content-center align-items-center')}>
            <div className={cx('notfound')}>
                <div className={cx('notfound-404')}>
                    <h1>
                        4<span>0</span>4
                    </h1>
                </div>
                <h2>Không tìm thấy trang yêu cầu</h2>
                <CustomButton onClick={() => navigate('/')}>Quay lại trang chủ</CustomButton>
            </div>
        </div>
    );
}

export default NotFound;
