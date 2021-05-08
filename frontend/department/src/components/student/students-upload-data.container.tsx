import React, {FC, useCallback} from "react";
import EntityActionUploadComponent from "../entity/entity-action-upload.component";
import {useDispatch, useSelector} from "react-redux";
import {RcFile} from "antd/es/upload";
import {selectUploadStatus, setUploadStatus, uploadStudentData} from "../../store/student/students.slice";
import {UploadStatus} from "../../model/upload-status.model";

const StudentsUploadDataContainer: FC = () => {

    const dispatch = useDispatch();
    const uploadStatus = useSelector(selectUploadStatus);

    const handleUpload = useCallback((file: RcFile) => {
        dispatch(uploadStudentData({file: file}));
    }, [dispatch])

    const handleCloseShowingUploadStatus = useCallback(() => {
        dispatch(setUploadStatus(UploadStatus.NO_UPLOADING))
    }, [dispatch]);

    return (
        <>
            <EntityActionUploadComponent
                onUpload={handleUpload}
                onCloseShowingUploadStatus={handleCloseShowingUploadStatus}
                uploadStatus={uploadStatus}
            />
        </>
    )
}

export default StudentsUploadDataContainer;