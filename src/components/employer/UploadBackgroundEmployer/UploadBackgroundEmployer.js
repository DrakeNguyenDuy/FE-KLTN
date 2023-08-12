import React, { useRef, useState } from 'react';
import { Modal, Button, Image } from 'react-bootstrap';

import styles from './UploadBackgroundEmployer.module.scss';
import className from 'classnames/bind';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import './UploadBackgroundEmployer.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from '~/constant';
import Avatar from '~/components/common/Avatar/Avatar';

const cx = className.bind(styles);

function UploadBackgroundEmployer({ data, show, handleClose, handleSubmit }) {
    const [src, setSrc] = useState('');
    const cropRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const inputFileRef = useRef();

    const handleUpload = () => {
        handleSubmit(preview);
        handleClose();
    };
    const onClose = () => {
        handleClose();
    };

    const onCrop = () => {
        const cropper = cropRef.current?.cropper;
        setPreview(cropper.getCroppedCanvas().toDataURL());
    };

    const onImageChange = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setSrc(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };

    const clearSrc = () => {
        setSrc(null);
        inputFileRef.current.value = null;
        setPreview(null);
    };
    return (
        <Modal show={show} onHide={onClose} className="modal-upload-background">
            <Modal.Header closeButton>
                <Modal.Title>Cập nhật ảnh nền</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={cx('upload-input')}>
                    <p>Hãy chọn ảnh có kích thước lớn để được nền đẹp nhất</p>
                    <input type="file" src={src} onChange={onImageChange} ref={inputFileRef} />
                </div>
                <div className={cx('cropWrapper')}>
                    {src && (
                        <>
                            <Cropper
                                ref={cropRef}
                                src={src}
                                style={{ height: 400, width: 1197 }}
                                zoomTo={1}
                                initialAspectRatio={1}
                                viewMode={1}
                                minCropBoxHeight={10}
                                minCropBoxWidth={10}
                                background={false}
                                responsive={true}
                                autoCropArea={1}
                                checkOrientation={false}
                                guides={true}
                                crop={onCrop}
                            />
                            <FontAwesomeIcon icon={faXmark} onClick={clearSrc} color="red" />
                        </>
                    )}
                </div>
                {preview && (
                    <div>
                        <h3>Xem trước</h3>
                        <div className={cx('overview')}>
                            <div className={cx('overview-background')} style={{ backgroundImage: `url(${preview})` }}>
                                <Avatar
                                    className={cx('avatar')}
                                    src={data?.logo ? BASE_URL + data?.logo : '/static/imgs/profile-default-avatar.jpg'}
                                    base64={false}
                                />
                            </div>

                            <div className={cx('overview-content')}>
                                <h2 className={cx('full-name')}>{data?.name}</h2>
                                <p className={cx('slogan')}>{data?.sologan}</p>
                                <p className={cx('infor')}>
                                    Quy mô: <span>{data?.numOfEmployee} nhân viên</span>
                                    <br />
                                    Địa chỉ: <span>{data?.address}</span>
                                    <br />
                                    Liên hệ: <span>SĐT: {data?.phoneNumber}</span>
                                </p>
                                <p className={cx('introduce')}>
                                    Giới thiệu về công ty: <span>{data?.description}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleUpload} disabled={!preview}>
                    Cập nhật
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UploadBackgroundEmployer;
