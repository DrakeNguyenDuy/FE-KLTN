import styles from './Loading.module.scss';
import className from 'classnames/bind';

const cx = className.bind(styles);
function Loading({ styleWrapper }) {
    return (
        <div className={cx('wrapper', styleWrapper)}>
            <div className={cx('custom-loader')}></div>
        </div>
    );
}

export default Loading;
