import React, {FC, useCallback, useEffect} from "react";
import {Spin} from "antd";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {LoadingOutlined} from "@ant-design/icons";
import {Entity} from "../../model/entity.model";
import ProgressInfoFormComponent from "../progress-info/progress-info-form.component";
import {editDegree, loadDegree, selectCurrentDegree, selectLoadingOnEdit} from "../../store/degree/degrees.slice";
import {DepartmentType} from "../../model/department-type.model";


const DegreeEditFormContainer: FC = () => {
    const dispatch = useDispatch();

    const {id} = useParams<Entity>();

    const currentDegree = useSelector(selectCurrentDegree);
    const loading = useSelector(selectLoadingOnEdit);

    useEffect(() => {
        dispatch(loadDegree(id));
    }, [dispatch, id]);

    const handleSubmit = useCallback((data) => {
        dispatch(editDegree({
            id: id,
            title: data.title,
            abbreviated: data.abbreviated
        }));
    }, [dispatch, id])

    return (
        <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>} spinning={loading}>
            {!loading &&
            <ProgressInfoFormComponent
                onSubmit={handleSubmit}
                current={currentDegree}
                type={DepartmentType.DEGREES}/>}
        </Spin>
    )
}

export default DegreeEditFormContainer;