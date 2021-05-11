import React, {FC, useCallback, useEffect} from "react";
import {Spin} from "antd";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {LoadingOutlined} from "@ant-design/icons";
import {Entity} from "../../model/entity.model";
import ProgressInfoFormComponent from "../progress-info/progress-info-form.component";
import {
    editPosition,
    loadPosition,
    selectCurrentPosition,
    selectLoadingOnEdit
} from "../../store/position/positions.slice";
import {DepartmentType} from "../../model/department-type.model";


const PositionEditContainer: FC = () => {
    const dispatch = useDispatch();

    const {id} = useParams<Entity>();

    const currentPosition = useSelector(selectCurrentPosition);
    const loading = useSelector(selectLoadingOnEdit);

    useEffect(() => {
        dispatch(loadPosition(id));
    }, [dispatch, id]);

    const handleSubmit = useCallback((data) => {
        dispatch(editPosition({
            id: id,
            title: data.title,
            abbreviated: data.abbreviated
        }));
    }, [dispatch, id])

    return (
        <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>} spinning={loading}>
            {!loading &&
            <ProgressInfoFormComponent onSubmit={handleSubmit}
                                       current={currentPosition}
                                       type={DepartmentType.POSITIONS}/>}
        </Spin>
    )
}

export default PositionEditContainer;