import { useEffect, useRef, useState } from 'react';
import styles from './CV.module.scss';
import className from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '~/components/CustomButton/CustomButton';
import { robotoNormal } from './fonts/robotoNormal';
import { robotoItalic } from './fonts/robotoItalic';
import { robotoBold } from './fonts/robotoBold';
import { robotoBoldItalic } from './fonts/robotoBoldItalic';
import { getCVWithId, getCVWithToken, postAvatar, putUpdateCV } from '~/store/reducers/cvSlice';
import CVStyle1 from '~/components/CVStyle/CVStyle1';
import UploadAvatarModal from '~/components/UploadAvatarModal/UploadAvatarModal';
import UpdateCVModal from '~/components/UpdateCVModal/UpdateCVModal';

const cx = className.bind(styles);

function CV() {
    const navigate = useNavigate();
    const { id } = useParams();
    const cvRef = useRef(null);

    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const token = useSelector((state) => state.auth.token);
    const cv = useSelector((state) => state.cv.cv);

    const dispath = useDispatch();

    useEffect(() => {
        if (token) {
            dispath(getCVWithToken(token));
        }
        if (id) {
            console.log('cvid', id);
            dispath(getCVWithId(id));
        }
        // eslint-disable-next-line
    }, [token]);

    const handleSeeFull = () => {
        navigate('/full-cv/' + cv?.id);
    };

    const handleOpenAvatarModal = () => {
        setShowAvatarModal(true);
    };

    const handleCloseAvatarModal = () => {
        setShowAvatarModal(false);
    };

    const handleSubmitAvatar = (data) => {
        dispath(postAvatar({ token, data }));
    };

    const handleOpenUpdateModal = (data) => {
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
    };

    const handleSubmitUpdate = (data) => {
        dispath(putUpdateCV({ id: cv.id, token, data }));
    };

    const handleDownloadCV = () => {
        const doc = new jsPDF({
            format: 'a4',
            unit: 'px',
        });

        doc.addFileToVFS('Roboto-Regular.tff', robotoNormal);
        doc.addFont('Roboto-Regular.tff', 'Roboto', 'normal');

        doc.addFileToVFS('Roboto-Italic.ttf', robotoItalic);
        doc.addFont('Roboto-Italic.ttf', 'Roboto', 'italic');

        doc.addFileToVFS('Roboto-Bold.ttf', robotoBold);
        doc.addFont('Roboto-Bold.ttf', 'Roboto', 'bold');

        doc.addFileToVFS('Roboto-Bolditalic.ttf', robotoBoldItalic);
        doc.addFont('Roboto-Bolditalic.ttf', 'Roboto', 'bolditalic');

        doc.setFont('Roboto');

        doc.html(cvRef.current, {
            html2canvas: {
                scale: [0.4725],
            },
            callback: async (doc) => {
                await doc.save('cv');
            },
        });
    };

    return (
        <div className={cx('wrapper')}>
            <UploadAvatarModal
                show={showAvatarModal}
                handleClose={handleCloseAvatarModal}
                handleSubmit={handleSubmitAvatar}
            />
            <UpdateCVModal
                data={cv}
                show={showUpdateModal}
                handleClose={handleCloseUpdateModal}
                handleSubmit={handleSubmitUpdate}
            />
            <div className="container">
                <div className={cx('background-cv')}>
                    {id ? (
                        <div className={cx('cv-header')}>
                            <p>Xem CV của {cv?.firstName}</p>

                            <div className={cx('header-btn-group')}>
                                <CustomButton onClick={() => handleDownloadCV()}>Tải CV</CustomButton>
                            </div>
                        </div>
                    ) : (
                        <div className={cx('cv-header')}>
                            <p>Xem CV của {cv?.firstName}</p>

                            <div className={cx('header-btn-group')}>
                                <CustomButton onClick={handleOpenAvatarModal}>Cập nhật avatar</CustomButton>
                                <CustomButton onClick={handleOpenUpdateModal}>Chỉnh sửa CV</CustomButton>
                                <CustomButton onClick={handleSeeFull}>Xem full</CustomButton>
                                <CustomButton onClick={() => handleDownloadCV()}>Tải CV</CustomButton>
                            </div>
                        </div>
                    )}
                    <div className={cx('cv-wrapper')}>
                        <div ref={cvRef}>
                            <CVStyle1 data={cv} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CV;
