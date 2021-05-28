import React, {FC, useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import SubjectFormComponent from "./subject-form.component";
import {addSubject, selectLoadingOnAdd, selectUploadStatus, setUploadStatus} from "../../store/subject/subjects.slice";
import {RcFile} from "antd/es/upload";
import {UploadStatus} from "../../model/upload-status.model";

const SubjectAddFormContainer: FC = () => {

    const dispatch = useDispatch();

    const [mainFile, setMainFile] = useState<RcFile>();

    const loading = useSelector(selectLoadingOnAdd);
    const uploadStatus = useSelector(selectUploadStatus);

    const handleSubmit = useCallback((data) => {
        dispatch(addSubject({
            title: data.title,
            content: mainFile
        }))
    }, [dispatch, mainFile]);

    const handleSetMainFile = useCallback((file: RcFile | undefined) => {
        setMainFile(file);
    }, [])

    const handleCloseShowingUploadStatus = useCallback(() => {
        dispatch(setUploadStatus(UploadStatus.NO_UPLOADING))
    }, [dispatch]);

    return (
        <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>} spinning={loading}>
            {!loading && <SubjectFormComponent
                onSubmit={handleSubmit}
                onSetMainFile={handleSetMainFile}
                uploadStatus={uploadStatus}
                onCloseShowingUploadStatus={handleCloseShowingUploadStatus}
            />}
        </Spin>
    )
};

export default SubjectAddFormContainer;