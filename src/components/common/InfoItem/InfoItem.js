import styles from './InforItem.module.scss';
import className from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = className.bind(styles);

function InforItem({ icon, title, content, ...props }) {
    return (
        <div className={cx('wrapper')} {...props}>
            <div className={cx('icon')}>
                <FontAwesomeIcon icon={icon} />
            </div>
            <div>
                <p>{title}:</p>
                <p className={cx('content')}>{content}</p>
            </div>
        </div>
    );
}

export default InforItem;
