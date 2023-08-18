import className from 'classnames/bind';
import styles from './DashBoard.module.scss';
import { useSelector } from 'react-redux';

const cx = className.bind(styles);

function DashBoard() {
    const user = useSelector((state) => state.adminAuth.user);

    return (
        <div className={cx('wrapper', 'container d-flex justify-content-start align-items-center')}>
            <img src="/assets/imgs/Saly-14.png" alt="Saly-14" />
            <div>
                <h1 className={cx('hello')}>Xin chào,</h1>
                <h1 className={cx('admin')}>{user?.userName}</h1>
            </div>
        </div>
    );
}

export default DashBoard;
