import Button from 'react-bootstrap/Button';
import { BeatLoader } from 'react-spinners';
import className from 'classnames/bind';
import styles from './CustomButton.module.scss';

const cx = className.bind(styles);

function CustomButton({ isLoading = false, children, wrapperStyle, ...props }) {
    return (
        <div className={cx('wrapper', wrapperStyle)}>
            <Button {...props}>{children}</Button>
            {isLoading ? (
                <div className={cx('loading-overlay')}>
                    <BeatLoader size={20} color={'var(--primary-color)'} loading={isLoading} />
                </div>
            ) : null}
        </div>
    );
}

export default CustomButton;
