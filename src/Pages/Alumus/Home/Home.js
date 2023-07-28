import React, { useEffect } from 'react';
import styles from './Home.module.scss';
import className from 'classnames/bind';

import JobItem from '~/components/JobItem';
import EmployerCarousel from './components/EmployerCarousel';
import WelcomeCarousel from './components/WelcomeCarousel';
import CustomCarousel from '~/components/CustomCarousel';
import { useDispatch, useSelector } from 'react-redux';
import { getJobLastest } from '~/store/reducers/jobSlice';
import { getTopEmlpyer } from '~/store/reducers/searchSlice';

const cx = className.bind(styles);

function Home() {
    const dispatch = useDispatch();
    const jobsLatest = useSelector((state) => state.job.jobLatest);
    const topEmployers = useSelector((state) => state.search.topEmployers);
    const jobLatestLoading = useSelector((state) => state.job.jobLatestLoading);
    const topEmloyerIsLoading = useSelector((state) => state.search.topEmloyerIsLoading);

    useEffect(() => {
        dispatch(getJobLastest('alumus'));
        dispatch(getTopEmlpyer());
        // eslint-disable-next-line
    }, []);

    const getItems = (items, numItem) => {
        let result = [];
        if (items) {
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
        }

        return result;
    };

    return (
        <div id="home" className={cx('wrapper')}>
            <section>
                <WelcomeCarousel />
            </section>
            <section>
                <div className="session-title">Việc làm mới nhất</div>
                {/* desktop */}
                <CustomCarousel
                    // items={itemsDesktop}
                    items={getItems(jobsLatest, 4)}
                    wrapperClass={cx('desktop-carousel')}
                    render={(itemOnSlie) => (
                        <div className={cx('job-wrapper')}>
                            {itemOnSlie.map((item, index) => (
                                <JobItem
                                    key={index}
                                    data={item}
                                    // className={cx('job-reponsive')}
                                    // onClick={() => navigate(`/job/${item.sku}`)}
                                />
                            ))}
                        </div>
                    )}
                    loading={jobLatestLoading}
                />
                {/* mobile */}
                <CustomCarousel
                    // items={itemsMobile}
                    items={getItems(jobsLatest, 2)}
                    wrapperClass={cx('mobile-carousel')}
                    render={(itemOnSlie) => (
                        <div className={cx('job-wrapper')}>
                            {itemOnSlie.map((item, index) => (
                                <JobItem
                                    key={index}
                                    data={item}
                                    // className={cx('job-reponsive')}
                                    // onClick={() => navigate(`/job/${item.sku}`)}
                                />
                            ))}
                        </div>
                    )}
                    loading={jobLatestLoading}
                />
            </section>
            <section>
                <div className="session-title">Nhà tuyển dụng nổi bậc</div>
                <EmployerCarousel items={topEmployers} loading={topEmloyerIsLoading} />
            </section>
        </div>
    );
}

export default Home;
