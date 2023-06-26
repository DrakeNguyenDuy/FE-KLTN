import { useEffect, useRef } from 'react';
import styles from './CV.module.scss';
import className from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '~/components/CustomButton/CustomButton';
import { robotoNormal } from './fonts/robotoNormal';
import { robotoItalic } from './fonts/robotoItalic';
import { robotoBold } from './fonts/robotoBold';
import { robotoBoldItalic } from './fonts/robotoBoldItalic';
import { getCVWithToken } from '~/store/reducers/cvSlice';
import CVStyle1 from '~/components/CV/CVStyle1';

const cx = className.bind(styles);

function CV() {
    const dispath = useDispatch();

    const cvRef = useRef(null);
    const location = useLocation();

    const token = useSelector((state) => state.auth.token);
    const cv = useSelector((state) => state.cv.cv);

    useEffect(() => {
        if (token) {
            dispath(getCVWithToken(token));
        }
        // eslint-disable-next-line
    }, [token]);

    const checkPath = () => location.pathname === '/full-cv';
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
            <div className="container">
                <div className={cx('background-cv')}>
                    {checkPath() ? (
                        <div className={cx('cv-header')}>
                            <p>Xem CV của Nhi</p>

                            <div className={cx('header-btn-group')}>
                                <CustomButton onClick={() => handleDownloadCV()}>Tải CV</CustomButton>
                            </div>
                        </div>
                    ) : (
                        <div className={cx('cv-header')}>
                            <p>Xem CV của Nhi</p>

                            <div className={cx('header-btn-group')}>
                                <CustomButton>Cập nhật avatar</CustomButton>
                                <CustomButton>Chỉnh sửa CV</CustomButton>
                                <CustomButton>Xem full</CustomButton>
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
