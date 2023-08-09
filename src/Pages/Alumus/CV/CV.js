import { useEffect, useRef, useState } from 'react';
import styles from './CV.module.scss';
import className from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CustomButton from '~/components/common/CustomButton';
import UpdateCVModal from '~/components/alumus/UpdateCVModal';
import UploadAvatarModal from '~/components/common/UploadAvatarModal';
import CVStyle1 from '~/components/alumus/CVStyle/CVStyle1';
import Loading from '~/components/common/Loading';
import NotLogin from '~/components/common/NotLogin';
import { robotoNormal } from './fonts/robotoNormal';
import { robotoItalic } from './fonts/robotoItalic';
import { robotoBold } from './fonts/robotoBold';
import { robotoBoldItalic } from './fonts/robotoBoldItalic';
import { createCV, getCVWithId, getCVWithToken, postAvatar, putUpdateCV } from '~/store/reducers/cvSlice';

const cx = className.bind(styles);

function CV() {
    const navigate = useNavigate();
    const { id } = useParams();
    const cvRef = useRef(null);

    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const user = useSelector((state) => state.alumusAuth.user);
    const authLoading = useSelector((state) => state.alumusAuth.authLoading);
    const cv = useSelector((state) => state.cv.cv);
    const profile = useSelector((state) => state.profile.profile);
    const isLoading = useSelector((state) => state.cv.isLoading);

    const dispath = useDispatch();
    useEffect(() => {
        if (id) {
            dispath(getCVWithId(id));
        } else {
            dispath(getCVWithToken());
        }
        // eslint-disable-next-line
    }, []);

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
        dispath(postAvatar({ data }));
    };

    const handleOpenUpdateModal = (data) => {
        if (profile) {
            setShowUpdateModal(true);
        } else {
            notify();
        }
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
    };

    const notify = () =>
        toast(
            <p>
                Bạn hãy cập nhật hồ sơ cá nhân trước để tạo cv.
                <br />
                <span
                    onClick={() => navigate('/profile')}
                    style={{ marginTop: '8px', color: 'blue', textDecoration: 'underline' }}
                >
                    Cập nhật ngay
                </span>
            </p>,
        );

    const handleSubmitUpdate = (data) => {
        if (cv && cv !== -1) {
            dispath(putUpdateCV({ id: cv.id, data }));
        } else {
            dispath(createCV(data));
        }
    };

    const convertFormatDate = (dateString) => {
        if (dateString) {
            const parts = dateString.split('/');
            return `${parts[2]}-${parts[1]}-${parts[0]}`;
        } else return null;
    };
    const mapCV = (data) => {
        if (data) {
            return {
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                dob: convertFormatDate(data.dob),
                address: data.address,
                avatar: data.avatar,
                gender: data.gender,
                email: data.email,
                phoneNumber: data.phoneNumber,
                title: data.title,
                carrer: data.carrer,
                englishLevel: data.englishLevel,
                introduce: data.introduce,
                goal: data.goal,
                websites:
                    data.contacts === null
                        ? []
                        : data.contacts.map((contact) => ({ name: contact.name, link: contact.link })),
                skills:
                    data.skills === null
                        ? []
                        : data.skills.map((skill) => ({
                              nameSkill: skill.nameSkill,
                              rate: skill.rate,
                              des: skill.des,
                          })),
                educations:
                    data.educations === null
                        ? []
                        : data.educations.map((education) => ({
                              school: education.school,
                              major: education.major,
                              startDate: convertFormatDate(education.startDate),
                              isGraduated: education.isGraduated ? 'true' : 'false',
                              endDate: convertFormatDate(education.endDate),
                              description: education.description,
                          })),
                experiences:
                    data.workExperiences === null
                        ? []
                        : data.workExperiences.map((experience) => ({
                              titlePosition: experience.titlePosition,
                              companyName: experience.companyName,
                              startDate: convertFormatDate(experience.startDate),
                              isCurrent: experience.endDate === null ? 'true' : 'false',
                              endDate: convertFormatDate(experience.endDate),
                              description: experience.description,
                          })),
                certificates:
                    data.certificates === null
                        ? []
                        : data.certificates.map((certificate) => ({
                              name: certificate.name,
                              linkReference: certificate.linkReference,
                          })),
            };
        } else return null;
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
    if (!authLoading && !user && !id) return <NotLogin />;
    return isLoading ? (
        <Loading />
    ) : (
        <div className={cx('wrapper')}>
            <ToastContainer />
            {cv !== -1 && (
                <>
                    <UploadAvatarModal
                        show={showAvatarModal}
                        handleClose={handleCloseAvatarModal}
                        handleSubmit={handleSubmitAvatar}
                    />
                    <UpdateCVModal
                        data={mapCV(cv)}
                        show={showUpdateModal}
                        handleClose={handleCloseUpdateModal}
                        handleSubmit={handleSubmitUpdate}
                    />
                </>
            )}
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
                            {cv !== -1 && <p>Xem CV của {cv?.firstName}</p>}
                            <div className={cx('header-btn-group')}>
                                {cv && cv !== -1 ? (
                                    <>
                                        <CustomButton onClick={handleOpenAvatarModal}>Cập nhật avatar</CustomButton>
                                        <CustomButton onClick={handleOpenUpdateModal}>Chỉnh sửa CV</CustomButton>
                                        <CustomButton onClick={handleSeeFull}>Xem full</CustomButton>
                                        <CustomButton onClick={handleDownloadCV}>Tải CV</CustomButton>
                                    </>
                                ) : null}
                            </div>
                        </div>
                    )}
                    <div className={cx('cv-wrapper')}>
                        <div ref={cvRef}>
                            {cv === -1 ? (
                                <>
                                    <div className={cx('update-cv-info')}>
                                        CV của bạn chưa được tạo. Hãy tạo cv của bạn để ứng tuyển việc làm ngay.
                                    </div>
                                    <CustomButton wrapperStyle={cx('create-cv')} onClick={handleOpenUpdateModal}>
                                        Tạo CV
                                    </CustomButton>
                                </>
                            ) : (
                                <CVStyle1 data={cv} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CV;
