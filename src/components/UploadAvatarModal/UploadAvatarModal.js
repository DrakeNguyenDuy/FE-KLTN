import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

import styles from './UploadAvatarModal.module.scss';
import className from 'classnames/bind';
import Avatar from 'react-avatar-edit';

const cx = className.bind(styles);

function UploadAvatarModal({ show, handleClose, handleSubmit }) {
    const [src, setSrc] = useState('');
    const [preview, setPreview] = useState(null);

    const handleUpload = () => {
        handleSubmit(preview);
        handleClose();
    };
    const onClose = () => {
        setPreview(null);
        handleClose();
    };
    const onCrop = (preview) => {
        setPreview(preview);
    };
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Cập nhật ảnh đại diện</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Avatar width={450} height={295} onCrop={onCrop} onClose={() => setPreview(null)} src={src} />
                {!!preview ? (
                    <div>
                        <h3>Xem trước</h3>
                        <img width={130} src={preview} alt="Preview" />
                    </div>
                ) : null}
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

export default UploadAvatarModal;
