import styles from './CVStyle1.module.scss';
import className from 'classnames/bind';

import Avatar from '~/components/Avatar/Avatar';
import { Image } from 'react-bootstrap';
import { BASE_URL } from '~/constant';
import { useEffect, useRef, useState } from 'react';

const cx = className.bind(styles);

function CVStyle1({ data, ...props }) {
    const [valGoal, setValGoal] = useState('');
    const textAreaRef = useRef(null);

    useEffect(() => {
        if (data) {
            setValGoal(data.goal);
        }
        resizeTextArea();
    }, [valGoal, data]);

    const resizeTextArea = () => {
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    };

    return (
        <div className={cx('cv-body')} {...props}>
            <div className={cx('top-group-header')}></div>
            <div className={cx('group-header')}>
                <div className={cx('avatar-wrapper')}>
                    <Avatar src={BASE_URL + data?.avatar} base64={false} alt="avatart" />
                </div>
                <div className={cx('short-profile-info')}>
                    <h2 className={cx('name')}>
                        {data?.lastName + ' ' + data?.firstName}
                        <span>
                            <Image src="/static/imgs/fontawesome/faCircleCheck.png" />
                        </span>
                    </h2>
                    <p className={cx('career')}>@{data?.title}</p>
                </div>
            </div>
            <div className={cx('details-profile-info')}>
                <div className={cx('details-info')}>
                    <div className={cx('left-info')}>
                        <div className={cx('item')}>
                            <div className={cx('item-title')}>
                                <span>
                                    <Image src="/static/imgs/fontawesome/faEnvelope.png" />
                                </span>
                                Email:
                            </div>
                            <p>{data?.email}</p>
                        </div>
                        <div className={cx('item')}>
                            <div className={cx('item-title')}>
                                <span>
                                    <Image src="/static/imgs/fontawesome/faUser.png" />
                                </span>
                                Giới tính:
                            </div>
                            <p>{data?.gender === 'M' ? 'Nam' : 'Nữ'}</p>
                        </div>
                        <div className={cx('item')}>
                            <div className={cx('item-title')}>
                                <span>
                                    <Image src="/static/imgs/fontawesome/faHome.png" />
                                </span>
                                Địa chỉ:
                            </div>
                            {/* <p>Ở xã nào đó, huyện nào đó, tỉnh nào đó</p> */}
                            <p>{data?.address}</p>
                        </div>
                    </div>
                    <div className={cx('right-info')}>
                        <div className={cx('item')}>
                            <div className={cx('item-title')}>
                                <span>
                                    <Image src="/static/imgs/fontawesome/faPhone.png" />
                                </span>
                                Số điện thoại:
                            </div>
                            <p>{data?.phoneNumber}</p>
                        </div>
                        <div className={cx('item')}>
                            <div className={cx('item-title')}>
                                <span>
                                    <Image src="/static/imgs/fontawesome/faCalendar.png" />
                                </span>
                                Ngày sinh:
                            </div>
                            <p>{data?.dob}</p>
                        </div>
                        {data?.contacts !== undefined && data?.contacts !== null && data?.contacts.length !== 0 && (
                            <div className={cx('item', 'website')}>
                                <div className={cx('item-title')}>
                                    <span>
                                        <Image src="/static/imgs/fontawesome/faGlobe.png" />
                                    </span>
                                    Website:
                                </div>
                                {data?.contacts.map((contact, index) => (
                                    <p key={index}>{contact?.name + ': ' + contact?.link}</p>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className={cx('details-target')}>
                    <div className={cx('item', 'target')}>
                        <div className={cx('item-title')}>
                            <span>
                                <Image src="/static/imgs/fontawesome/faCircleExclamation.png" />
                            </span>
                            Mục tiêu:
                        </div>
                        <textarea disabled value={valGoal} ref={textAreaRef}></textarea>
                    </div>
                </div>
            </div>

            <div className={cx('main-cv')}>
                {data?.educations !== undefined && data?.educations !== null && data?.educations.length !== 0 && (
                    <div className={cx('education-group', 'main-block')}>
                        <div className={cx('main-block-title')}>
                            <span>@</span>
                            Học vấn
                            <div></div>
                        </div>
                        {data?.educations.map((education, index) => (
                            <div className={cx('item', 'school-item')} key={index}>
                                <div className={cx('item-title')}>
                                    <span>
                                        <Image src="/static/imgs/fontawesome/faGraduationCap.png" />
                                    </span>
                                    {education.school},<p className={cx('major')}> {education?.major}</p>
                                    <p className={cx('time')}>
                                        ({education?.startDate} {' - '}
                                        {education?.isGraduated ? education?.endDate : 'Hiện tại'})
                                    </p>
                                </div>
                                <div className={cx('item-body')}>
                                    <p className={cx('description')}>{education?.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {data?.skills !== undefined && data?.skills !== null && data?.skills.length !== 0 && (
                    <div className={cx('skills-group', 'main-block')}>
                        <div className={cx('main-block-title')}>
                            <span>@</span>
                            Kỹ năng
                            <div></div>
                        </div>
                        {data?.skills.map((skill, index) => (
                            <div className={cx('item', 'school-item')} key={index}>
                                <div className={cx('item-title')}>
                                    <p>- {skill.nameSkill}: </p>
                                </div>
                                <div className={cx('item-body')}>
                                    <p className={cx('description')}>{skill.des}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {data?.workExperiences !== undefined &&
                    data?.workExperiences !== null &&
                    data?.workExperiences.length !== 0 && (
                        <div className={cx('experiences-group', 'main-block')}>
                            <div className={cx('main-block-title')}>
                                <span>@</span>
                                Kinh nghiệm
                                <div></div>
                            </div>
                            {data?.workExperiences.map((workExperience, index) => (
                                <div className={cx('item', 'school-item')} key={index}>
                                    <div className={cx('item-title')}>
                                        <span>
                                            <Image src="/static/imgs/fontawesome/faBriefcase.png" />
                                        </span>
                                        {workExperience?.titlePosition}, {workExperience?.companyName}
                                        <p className={cx('time')}>
                                            ({workExperience?.startDate} {' - '}{' '}
                                            {workExperience?.endDate === null ? 'Hiện tại' : workExperience?.endDate})
                                        </p>
                                    </div>
                                    <div className={cx('item-body')}>
                                        <p className={cx('description')}>{workExperience?.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                {data?.certificates !== undefined && data?.certificates !== null && data?.certificates.length !== 0 && (
                    <div className={cx('certificate-group', 'main-block')}>
                        <div className={cx('main-block-title')}>
                            <span>@</span>
                            Bằng cấp
                            <div></div>
                        </div>
                        {data?.certificates.map((certificate, index) => (
                            <div className={cx('item', 'school-item')} key={index}>
                                <div className={cx('item-title')}>
                                    <span>
                                        <Image src="/static/imgs/fontawesome/faBriefcase.png" />
                                    </span>
                                    {certificate?.name}
                                </div>
                                <div className={cx('item-body')}>
                                    <a className={cx('link')} href={certificate?.linkReference}>
                                        <p>{certificate?.linkReference}</p>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CVStyle1;
