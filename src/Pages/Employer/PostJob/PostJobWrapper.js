import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './PostJob.module.scss';
import 'react-quill/dist/quill.snow.css';

import { getJobDetail, resetUpdateStatus } from '~/store/reducers/common/jobSlice';
import { getDistrict, getProvince, getWard } from '~/store/reducers/common/locationSlice';
import Loading from '~/components/common/Loading/Loading';
import PostJob from './PostJob';

function PostJobWrapper({ id, updateCallBack, update = true, active }) {
    const dispath = useDispatch();

    const jobDetailIsLoading = useSelector((state) => state.job.jobDetailIsLoading);
    const jobDetails = useSelector((state) => state.job.jobDetails);

    const districtLoading = useSelector((state) => state.location.districtLoading);
    const wardLoading = useSelector((state) => state.location.wardLoading);
    useEffect(() => {
        // eslint-disable-next-line
        update ? id && dispath(getJobDetail({ id })) : active === 'post-job' && id && dispath(getJobDetail({ id }));
    }, [id, active]);

    useEffect(() => {
        update
            ? jobDetails && dispath(getDistrict(jobDetails?.locations[0].idProvince))
            : active === 'post-job' && jobDetails && dispath(getDistrict(jobDetails?.locations[0].idProvince));
        update
            ? jobDetails && dispath(getWard(jobDetails?.locations[0].idDistinct))
            : active === 'post-job' && jobDetails && dispath(getWard(jobDetails?.locations[0].idDistinct));
    }, [jobDetails, active]);

    const getValue = () => {
        return {
            id: jobDetails?.id,
            sku: jobDetails?.sku,
            name: jobDetails?.name,
            career: jobDetails?.type.code,
            skills: jobDetails?.skills.map((skill) => ({ value: skill.code, label: skill.name })),
            position: jobDetails?.positions[0].code,
            experience: jobDetails?.experience.code,
            gender: jobDetails?.codeGender,
            quantity: jobDetails?.quantity,
            province: jobDetails?.locations[0].idProvince,
            idLocation: jobDetails?.locations[0].locationID,
            district: jobDetails?.locations[0].idDistinct,
            ward: jobDetails?.locations[0].idWard,
            addressDetail: jobDetails?.locations[0].detailAddress,
            salary: jobDetails?.price,
            payCircle: jobDetails?.codePayCycle,
            typeWork: jobDetails?.categories[0].code,
            dateExpire: jobDetails?.dateExperience,
            description: jobDetails?.description,
        };
    };
    return (update || id) && (jobDetailIsLoading || districtLoading || wardLoading) ? (
        <Loading />
    ) : (
        <>
            <PostJob data={id ? getValue() : null} updateCallback={updateCallBack} update={update} />
        </>
    );
}

export default PostJobWrapper;
