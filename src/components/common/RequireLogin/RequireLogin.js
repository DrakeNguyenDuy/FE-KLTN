import className from 'classnames/bind';
import styles from './RequireLogin.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

const cx = className.bind(styles);

function RequireLogin({ show, onClose, message, employer = false }) {
    const navigate = useNavigate();

    const handleLoginNow = () => {
        if (employer) {
            navigate('employer/login');
        } else {
            navigate('/login');
        }
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Bạn chưa đăng nhập</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Để sau
                </Button>
                <Button variant="primary" onClick={handleLoginNow}>
                    Đăng nhập ngay
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RequireLogin;
