import Breadcrumb from 'react-bootstrap/Breadcrumb';
import styles from './CustomBreadCrumb.module.scss';
import className from 'classnames/bind';

const cx = className.bind(styles);

function CustomBreadCrumb({ items, ...props }) {
    console.log(items);
    return (
        <div className={cx('wrapper', props.className)}>
            <Breadcrumb>
                {items.map((item, index) => (
                    <Breadcrumb.Item
                        className={cx('item')}
                        key={index}
                        href={item.href}
                        active={index === items.length - 1 ? true : false}
                    >
                        {item.name}
                    </Breadcrumb.Item>
                ))}
            </Breadcrumb>
        </div>
    );
}

export default CustomBreadCrumb;
