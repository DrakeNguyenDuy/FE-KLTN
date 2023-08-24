import classNames from 'classnames/bind';
import styles from './NoResult.module.scss';
import { Image } from 'react-bootstrap';

const cx = classNames.bind(styles);

function NoResult({ message = 'Không tìm thấy kết quả' }) {
    return (
        <div className={cx('not-found')}>
            <Image src="/static/imgs/not-found-result.gif" alt="not-found" />
            <p>{message}</p>
        </div>
    );
}

export default NoResult;
