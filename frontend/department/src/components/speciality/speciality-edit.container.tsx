import React, {FC, useCallback, useEffect} from "react";
import {Spin} from "antd";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    editSpeciality,
    loadSpeciality,
    selectCurrentSpeciality, selectLoadingOnEdit
} from "../../store/speciality/specialities.slice";
import {LoadingOutlined} from "@ant-design/icons";
import {Entity} from "../../model/entity.model";
import SpecialityFormComponent from "./speciality-form.component";


const SpecialityEditContainer: FC = () => {
    const dispatch = useDispatch();

    const {id} = useParams<Entity>();

    const currentSpeciality = useSelector(selectCurrentSpeciality);
    const loading = useSelector(selectLoadingOnEdit);

    useEffect(() => {
        dispatch(loadSpeciality(id));
    }, [dispatch, id]);

    const handleSubmit = useCallback((data) => {
        dispatch(editSpeciality({
            id: id,
            code: data.code,
            title: data.title
        }));
    }, [dispatch, id])

    return (
        <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>} spinning={loading}>
            {!loading &&
            <SpecialityFormComponent onSubmit={handleSubmit} current={currentSpeciality}/>}
        </Spin>
    )
}

export default SpecialityEditContainer;