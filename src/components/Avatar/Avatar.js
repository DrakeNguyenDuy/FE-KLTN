import { Image } from 'react-bootstrap';
import styles from './Avatar.module.scss';
import className from 'classnames/bind';

const cx = className.bind(styles);

function Avatar({
    src = null,
    alt = 'default',
    base64 = true,
    width,
    height,
    name = 'default',
    color = '#12ad5d',
    ...props
}) {
    const getLastCharacter = (name) => {
        if (name) {
            const lastDigit = name.substring(name.lastIndexOf(' ') + 1, name.lastIndexOf(' ') + 2);
            return lastDigit.toUpperCase();
        } else return null;
    };

    return (
        <div
            className={cx('wrapper', props.className)}
            style={{
                width: width,
                height: height,
                backgroundColor: src ? 'transparent' : color,
            }}
            {...props}
        >
            {src !== null ? (
                <Image src={base64 ? `data:image/png;base64, ${src}` : src} alt={alt} />
            ) : (
                <span>{getLastCharacter(name)}</span>
            )}
        </div>
    );
}

export default Avatar;
