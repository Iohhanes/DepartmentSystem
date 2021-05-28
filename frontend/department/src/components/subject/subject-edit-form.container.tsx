import React, {FC, useCallback, useEffect, useState} from "react";
import {Spin} from "antd";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {LoadingOutlined} from "@ant-design/icons";
import {Entity} from "../../model/entity.model";
import {
    editSubject,
    loadSubject,
    selectCurrentSubject,
    selectLoadingOnEdit,
    selectUploadStatus,
    setUploadStatus
} from "../../store/subject/subjects.slice";
import SubjectFormComponent from "./subject-form.component";
import {RcFile} from "antd/es/upload";
import {UploadStatus} from "../../model/upload-status.model";


const SubjectEditFormContainer: FC = () => {
    const dispatch = useDispatch();

    const {id} = useParams<Entity>();

    const [mainFile, setMainFile] = useState<RcFile>();

    const currentSubject = useSelector(selectCurrentSubject);
    const loading = useSelector(selectLoadingOnEdit);
    const uploadStatus = useSelector(selectUploadStatus);

    useEffect(() => {
        dispatch(loadSubject(id));
    }, [dispatch, id]);

    const handleSubmit = useCallback((data) => {
        dispatch(editSubject({
            id: id,
            title: data.title,
            content: mainFile
        }));
    }, [dispatch, id, mainFile])

    const handleSetMainFile = useCallback((file: RcFile | undefined) => {
        setMainFile(file);
    }, [])

    const handleCloseShowingUploadStatus = useCallback(() => {
        dispatch(setUploadStatus(UploadStatus.NO_UPLOADING))
    }, [dispatch]);

    return (
        <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>} spinning={loading}>
            {!loading &&
            <SubjectFormComponent
                onSubmit={handleSubmit}
                current={currentSubject}
                onSetMainFile={handleSetMainFile}
                uploadStatus={uploadStatus}
                onCloseShowingUploadStatus={handleCloseShowingUploadStatus}
            />}
        </Spin>
    )
}

export default SubjectEditFormContainer;