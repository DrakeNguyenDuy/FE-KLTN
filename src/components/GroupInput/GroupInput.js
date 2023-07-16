import styles from './GroupInput.module.scss';
import className from 'classnames/bind';
import { Form } from 'react-bootstrap';
import CustomButton from '../CustomButton/CustomButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';

const cx = className.bind(styles);
function GroupInput({
    name = '',
    model = {},
    data,
    renderItem = () => null,
    // onDelete = () => null,
    onDelete,
    onAdd = () => null,
    onChange,
    ...props
}) {
    // const [listBlock, setListBlock] = useState([]);
    // const ref = useRef();

    // useEffect(() => {
    //     if (data && data.length !== 0) {
    //         setListBlock(data);
    //     }
    //     // eslint-disable-next-line
    // }, []);

    const handleAdd = () => {
        // setListBlock([...listBlock, model]);
        onAdd();
    };

    const handleDelete = (index) => {
        // const newList = listBlock.filter((block, i) => i !== index);
        // setListBlock(newList);
        onDelete();
    };
    return (
        <div className={cx('wrapper')} {...props}>
            {/* <div id="group-input-wrapper" ref={ref}> */}
            <div id="group-input-wrapper">
                <Form.Group className={cx('group-content', 'mb-3')}>
                    <Form.Label>{name}</Form.Label>
                    {/* {listBlock?.map((itemData, index) => (
                        <div className={cx('content-block')} key={index}>
                            <CustomButton
                                wrapperStyle={cx('delete-button')}
                                onClick={() => handleDelete(index)}
                                // disabled={listBlock.length === 1 ? true : false}
                            >
                                <FontAwesomeIcon icon={faXmark} />
                            </CustomButton>
                            {renderItem(itemData)}
                        </div>
                    ))} */}

                    {data?.map((itemData, index) => (
                        <div className={cx('content-block')} key={index} onChange={(e) => onChange(e, index)}>
                            <CustomButton
                                wrapperStyle={cx('delete-button')}
                                onClick={() => onDelete(index)}
                                // disabled={listBlock.length === 1 ? true : false}
                            >
                                <FontAwesomeIcon icon={faXmark} />
                            </CustomButton>
                            {renderItem(itemData)}
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
