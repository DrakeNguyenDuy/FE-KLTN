import styles from './CVStyle1.module.scss';
import className from 'classnames/bind';

import Avatar from '~/components/Avatar/Avatar';
import { Image } from 'react-bootstrap';

const cx = className.bind(styles);

function CVStyle1({ data, ...props }) {
    return (
        <div className={cx('cv-body')} {...props}>
            <div className={cx('top-group-header')}></div>
            <div className={cx('group-header')}>
                <div className={cx('avatar-wrapper')}>
                    <Avatar src={data?.avatar} base64={true} alt="avatart" />
                </div>
                <div className={cx('short-profile-info')}>
                    <h2 className={cx('name')}>
                        {/* MAO DOÃN NHI */}
                        {data?.lastName + ' ' + data?.firstName}
                        <span>
                            <Image src="/static/imgs/fontawesome/faCircleCheck.png" />
                        </span>
                    </h2>
                    {/* <p className={cx('career')}>@Thực tập IT</p> */}
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
                            {/* <p>
                                nhidoan@gmail.com nhidoan nhidoan nhidoan nhidoan nhidoan nhidoan nhidoan nhidoan
                                nhidoan
                            </p> */}
                            <p>{data?.email}</p>
                        </div>
                        <div className={cx('item')}>
                            <div className={cx('item-title')}>
                                <span>
                                    {/* <FontAwesomeIcon icon={faUser} /> */}
                                    <Image src="/static/imgs/fontawesome/faUser.png" />
                                </span>
                                Giới tính:
                            </div>
                            {/* <p>Nữ</p> */}
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
                            {/* <p>096+++++++</p> */}
                            <p>{data?.phoneNumber}</p>
                        </div>
                        <div className={cx('item')}>
                            <div className={cx('item-title')}>
                                <span>
                                    <Image src="/static/imgs/fontawesome/faCalendar.png" />
                                </span>
                                Ngày sinh:
                            </div>
                            {/* <p>00/00/0000</p> */}
                            <p>{data?.dob}</p>
                        </div>
                        {data?.contacts !== undefined && data?.contacts.length !== 0 && (
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
                        {/* <p>
                            Facebook: https://www.facebook.com/**** https://www.facebook.com/****
                            https://www.facebook.com /****https://www.facebook.com/**** https://www.fac ebook.com/****
                        </p> */}
                        <p>{data?.goal}</p>
                    </div>
                    {/* <div className={cx('item', 'target')}>
                        <div className={cx('item-title')}>
                            <span>
                                <Image src="/static/imgs/fontawesome/faCircleExclamation.png" />
                            </span>
                            Mục tiêu ngắn hạn:
                        </div>
                        <p>Facebook: https://www.facebook.com/****</p>
                    </div> */}
                </div>
            </div>

            <div className={cx('main-cv')}>
                {data?.educations !== undefined && data?.educations.length !== 0 && (
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
                                    <p className={cx('time')}>({education?.startDate + ' - ' + education?.endDate})</p>
                                </div>
                                <div className={cx('item-body')}>
                                    <p className={cx('description')}>
                                        {education?.isGraduated
                                            ? 'Trạng thái: Đã tốt nghiệp'
                                            : 'Trong quá trình học tập'}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {/* <div className={cx('item', 'school-item')}>
                            <div className={cx('item-title')}>
                                <span>
                                    <Image src="/static/imgs/fontawesome/faGraduationCap.png" />
                                </span>
                                Đại học Nâm Lông TP.HCM,
                                <p className={cx('major')}> Công nghệ thông tin</p>
                                <p className={cx('time')}>(09/2019 - 09/2023)</p>
                            </div>
                            <div className={cx('item-body')}>
                                <p className={cx('description')}>Điểm trung bình 5.0/4.0</p>
                            </div>
                        </div> */}
                    </div>
                )}

                {data?.skills !== undefined && data?.skills.length !== 0 && (
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
                        {/* <div className={cx('item', 'school-item')}>
                            <div className={cx('item-title')}>
                                <p>- Ngoại ngữ: </p>
                            </div>
                            <div className={cx('item-body')}>
                                <p className={cx('description')}>Tiếng Anh: có khả năng đọc hiểu tài liệu</p>
                            </div>
                        </div>
                        <div className={cx('item', 'school-item')}>
                            <div className={cx('item-title')}>
                                <p>- Kỹ năng lập trình: </p>
                            </div>
                            <div className={cx('item-body')}>
                                <p className={cx('description')}>Java, HTML, CSS, JavaScript, Reactjs, Git, MySQL</p>
                            </div>
                        </div>
                        <div className={cx('item', 'school-item')}>
                            <div className={cx('item-title')}>
                                <p>- Phần mềm: </p>
                            </div>
                            <div className={cx('item-body')}>
                                <p className={cx('description')}>Visual Studio Code, IntelliJ, Postman</p>
                            </div>
                        </div> */}
                    </div>
                )}

                {data?.workExperiences !== undefined && data?.workExperiences.length !== 0 && (
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
                                    <p className={cx('time')}>({workExperience?.startDate})</p>
                                </div>
                                <div className={cx('item-body')}>
                                    <p className={cx('description')}>{workExperience?.description}</p>
                                </div>
                            </div>
                        ))}
                        {/* <div className={cx('item', 'school-item')}>
                            <div className={cx('item-title')}>
                                <span>
                                    <Image src="/static/imgs/fontawesome/faBriefcase.png" />
                                </span>
                                Xây dựng website chat trực tuyến với Firebase và ReactJS
                                <p className={cx('time')}>(27/12/2022 - 31/12/2022)</p>
                            </div>
                            <div className={cx('item-body')}>
                                <p className={cx('description')}>
                                    - Github: https://github.com/LuongHuuLuan/chat-app-firebase
                                </p>
                                <p className={cx('description')}>- Số lượng thành viên: 1 (Dự án cá nhân)</p>
                                <p className={cx('description')}>- Công nghệ sử dụng: ReactJS, Firebase</p>
                                <p className={cx('description')}>
                                    - Các chức năng chính: Đăng nhập với google,tạo phòng chat, tham gia phòng chat,
                                    chat
                                </p>
                            </div>
                        </div>

                        <div className={cx('item', 'school-item')}>
                            <div className={cx('item-title')}>
                                <span>
                                    <Image src="/static/imgs/fontawesome/faBriefcase.png" />
                                </span>
                                Xây dựng website chat trực tuyến với Firebase và ReactJS
                                <p className={cx('time')}>(27/12/2022 - 31/12/2022)</p>
                            </div>
                            <div className={cx('item-body')}>
                                <p className={cx('description')}>
                                    - Github: https://github.com/LuongHuuLuan/chat-app-firebase
                                </p>
                                <p className={cx('description')}>- Số lượng thành viên: 1 (Dự án cá nhân)</p>
                                <p className={cx('description')}>- Công nghệ sử dụng: ReactJS, Firebase</p>
                                <p className={cx('description')}>
                                    - Các chức năng chính: Đăng nhập với google,tạo phòng chat, tham gia phòng chat,
                                    chat
                                </p>
                            </div>
                        </div> */}
                    </div>
                )}

                {data?.certificates !== undefined && data?.certificates.length !== 0 && (
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
                        {/* <div className={cx('item', 'school-item')}>
                            <div className={cx('item-title')}>
                                <span>
                                    <Image src="/static/imgs/fontawesome/faBriefcase.png" />
                                </span>
                                Chứng chỉ đa cấp xuyên lục địa
                            </div>
                            <div className={cx('item-body')}>
                                <a className={cx('link')} href="https://www.404.com/1">
                                    <p>www.404.com/1</p>
                                </a>
                            </div>
                        </div> */}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CVStyle1;
