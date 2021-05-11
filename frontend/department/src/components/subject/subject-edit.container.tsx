import React, {FC, useCallback, useEffect} from "react";
import {Spin} from "antd";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {LoadingOutlined} from "@ant-design/icons";
import {Entity} from "../../model/entity.model";
import {editSubject, loadSubject, selectCurrentSubject, selectLoadingOnEdit} from "../../store/subject/subjects.slice";
import SubjectFormComponent from "./subject-form.component";


const SubjectEditContainer: FC = () => {
    const dispatch = useDispatch();

    const {id} = useParams<Entity>();

    const currentSubject = useSelector(selectCurrentSubject);
    const loading = useSelector(selectLoadingOnEdit);

    useEffect(() => {
        dispatch(loadSubject(id));
    }, [dispatch, id]);

    const handleSubmit = useCallback((data) => {
        dispatch(editSubject({
            id: id,
            title: data.title
        }));
    }, [dispatch, id])

    return (
        <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>} spinning={loading}>
            {!loading &&
            <SubjectFormComponent onSubmit={handleSubmit} current={currentSubject}/>}
        </Spin>
    )
}

export default SubjectEditContainer;