import React from 'react';
import styles from './Home.module.scss';
import className from 'classnames/bind';

import Job from '~/components/Job1';
import EmployerCarousel from './components/EmployerCarousel';
import WelcomeCarousel from './components/WelcomeCarousel';
import CustomCarousel from '~/components/CustomCarousel';

const cx = className.bind(styles);
const items = [
    'job1',
    'job2',
    'job3',
    'job4',
    'job5',
    'job6',
    'job7',
    'job8',
    'job9',
    'job10',
    'job11',
    'job12',
    'job13',
    'job14',
    'job15',
];

const mapItem = (items, numItem) => {
    let result = [];
    let num = Math.floor(items.length / numItem);
    let rest = items.length % numItem;
    let index = 0;
    for (let i = 0; i < num; i++) {
        const itemGet = [];
        for (let j = 0; j < numItem; j++) {
            itemGet.push(items[index]);
            index++;
        }
        result.push(itemGet);
    }
    if (rest !== 0) {
        const itemGet = [];
        for (let i = index; i < items.length; i++) {
            itemGet.push(items[i]);
        }
        result.push(itemGet);
    }

    return result;
};

const mapItemDesktop = mapItem(items, 6);
const mapItemMobile = mapItem(items, 2);

function Home() {
    return (
        <div id="home">
            <section>
                <WelcomeCarousel />
            </section>
            <section>
                <div className="session-title">Việc làm mới nhất</div>
                {/* desktop */}
                <CustomCarousel
                    items={mapItemDesktop}
                    wrapperClass={cx('desktop-carousel')}
                    render={(itemOnSlie) => (
                        <div className={cx('job-wrapper')}>
                            {itemOnSlie.map((item, index) => (
                                <Job key={index} className={cx('job-reponsive')} />
                            ))}
                        </div>
                    )}
                />
                {/* mobile */}
                <CustomCarousel
                    items={mapItemMobile}
                    wrapperClass={cx('mobile-carousel')}
                    render={(itemOnSlie) => (
                        <div className={cx('job-wrapper')}>
                            {itemOnSlie.map((item, index) => (
                                <Job key={index} className={cx('job-reponsive')} />
                            ))}
                        </div>
                    )}
                />
            </section>
            <section>
                <div className="session-title">Nhà tuyển dụng nổi bậc</div>
                <EmployerCarousel />
            </section>
        </div>
    );
}

export default Home;
