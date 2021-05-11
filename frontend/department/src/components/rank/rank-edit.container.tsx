import React, {FC, useCallback, useEffect} from "react";
import {Spin} from "antd";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {LoadingOutlined} from "@ant-design/icons";
import {Entity} from "../../model/entity.model";
import ProgressInfoFormComponent from "../progress-info/progress-info-form.component";
import {editRank, loadRank, selectCurrentRank, selectLoadingOnEdit} from "../../store/rank/ranks.slice";
import {DepartmentType} from "../../model/department-type.model";


const RankEditContainer: FC = () => {
    const dispatch = useDispatch();

    const {id} = useParams<Entity>();

    const currentRank = useSelector(selectCurrentRank);
    const loading = useSelector(selectLoadingOnEdit);

    useEffect(() => {
        dispatch(loadRank(id));
    }, [dispatch, id]);

    const handleSubmit = useCallback((data) => {
        dispatch(editRank({
            id: id,
            title: data.title,
            abbreviated: data.abbreviated
        }));
    }, [dispatch, id])

    return (
        <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>} spinning={loading}>
            {!loading &&
            <ProgressInfoFormComponent onSubmit={handleSubmit} current={currentRank} type={DepartmentType.RANKS}/>}
        </Spin>
    )
}

export default RankEditContainer;