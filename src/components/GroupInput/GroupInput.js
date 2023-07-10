import styles from './GroupInput.module.scss';
import className from 'classnames/bind';
import { Form } from 'react-bootstrap';
import CustomButton from '../CustomButton/CustomButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';

const cx = className.bind(styles);
const listData = [
    {
        nameSkill: '',
        rate: 0.0,
        des: '',
    },
];
function GroupInput() {
    const [listBlock, setListBlock] = useState([]);
    const ref = useRef();

    useEffect(() => {
        setListBlock(listData);
    }, []);

    const onDelete = (index) => {
        const newList = listBlock.filter((block, i) => i !== index);
        setListBlock(newList);
    };
    const onAdd = () => {
        setListBlock([
            ...listBlock,
            {
                nameSkill: '',
                rate: 0.0,
                des: '',
            },
        ]);
        // getListContent();
        console.log(listBlock);
    };
    const getListContent = () => {
        const elements = document.querySelectorAll('#group-input-wrapper input, textarea');
        const data = listBlock.map((block, index) => ({
            nameSkill: elements[index].value,
            rate: 0,
            des: elements[index * 2].value,
        }));
        console.log(data);
    };
    return (
        <div className={cx('wrapper')}>
            <Form.Group className={cx('group-content', 'mb-3')}>
                <Form.Label>Chọn kỹ năng</Form.Label>
                <div id="group-input-wrapper" ref={ref}>
                    {listBlock.map((data, index) => (
                        <ContentBlock
                            key={index}
                            name={data.nameSkill}
                            description={data.des}
                            onDelete={() => onDelete(index)}
                            valName={listBlock[index].nameSkill}
                            onChangeName={(e) => {
                                const newList = [...listBlock];
                                newList[index].nameSkill = e.target.value;
                                return setListBlock(newList);
                            }}
                            valDes={listBlock[index].des}
                            onChangeDes={(e) => {
                                const newList = [...listBlock];
                                newList[index].des = e.target.value;
                                return setListBlock(newList);
                            }}
                            disabled={listBlock.length === 1 ? true : false}
                        />
                    ))}
                </div>
            </Form.Group>
            <CustomButton wrapperStyle={cx('add-button')} onClick={onAdd}>
                Thêm kỹ năng <FontAwesomeIcon icon={faPlus} />
            </CustomButton>
        </div>
    );
}

function ContentBlock({
    valName,
    valDes,
    onChangeDes,
    onChangeName,
    onDelete,
    name,
    description,
    disabled = false,
    ...props
}) {
    return (
        <div className={cx('content-block')} {...props}>
            <CustomButton wrapperStyle={cx('delete-button')} onClick={onDelete} disabled={disabled}>
                <FontAwesomeIcon icon={faXmark} />
            </CustomButton>
            <Form.Control
                type="text"
                placeholder="Tên kỹ năng"
                // defaultValue={name}
                value={valName}
                onChange={onChangeName}
            />
            <Form.Control
                className={cx('description')}
                as="textarea"
                placeholder="Mô tả"
                value={valDes}
                onChange={onChangeDes}
            />
        </div>
    );
}

export default GroupInput;
