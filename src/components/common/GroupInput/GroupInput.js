import { useEffect, useRef, useState } from 'react';
import styles from './GroupInput.module.scss';
import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Form } from 'react-bootstrap';

import CustomButton from '~/components/common/CustomButton';

const cx = className.bind(styles);
function GroupInput({
    name = '',
    model = {},
    data,
    renderItem = () => null,
    onDelete,
    onAdd = () => null,
    onChange = () => null,
    ...props
}) {
    const handleAdd = () => {
        onAdd();
    };
    return (
        <div className={cx('wrapper')} {...props}>
            <div id="group-input-wrapper">
                <Form.Group className={cx('group-content', 'mb-3')}>
                    <Form.Label>{name}</Form.Label>
                    {data?.map((itemData, index) => (
                        <div className={cx('content-block')} key={index} onChange={(e) => onChange(e, index)}>
                            <CustomButton wrapperStyle={cx('delete-button')} onClick={() => onDelete(index)}>
                                <FontAwesomeIcon icon={faXmark} />
                            </CustomButton>
                            {renderItem(itemData, index)}
                        </div>
                    ))}
                </Form.Group>
            </div>
            <CustomButton wrapperStyle={cx('add-button')} onClick={handleAdd}>
                Thêm {name} <FontAwesomeIcon icon={faPlus} />
            </CustomButton>
        </div>
    );
}

export default GroupInput;
