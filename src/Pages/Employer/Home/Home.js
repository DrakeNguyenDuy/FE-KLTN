import React, { useEffect } from 'react';
import styles from './Home.module.scss';
import className from 'classnames/bind';
import CustomButton from '~/components/common/CustomButton/CustomButton';
import { useNavigate } from 'react-router-dom';
const cx = className.bind(styles);

function Home() {
    const navigate = useNavigate();
    return (
        <div id="home" className={cx('wrapper')}>
            <div className={cx('overview-background')}>
                <div className={cx('content')}>
                    <h1 className={cx('hello')}>Xin chào,</h1>
                    <h1>nhà tuyển dụng</h1>
                    <CustomButton wrapperStyle={cx('button')} onClick={() => navigate('/employer/manage-job/post-job')}>
                        Đăng tin tuyển ngay
                    </CustomButton>
                </div>
            </div>
        </div>
    );
}

export default Home;
