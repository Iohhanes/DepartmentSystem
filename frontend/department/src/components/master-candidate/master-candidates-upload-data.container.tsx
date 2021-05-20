import React, {FC, useCallback} from "react";
import EntityActionUploadComponent from "../entity/entity-action-upload.component";
import {useDispatch, useSelector} from "react-redux";
import {RcFile} from "antd/es/upload";
import {UploadStatus} from "../../model/upload-status.model";
import {
    selectUploadStatus,
    setUploadStatus,
    uploadMasterCandidateData
} from "../../store/master-candidate/master-candidates.slice";

const MasterCandidatesUploadDataContainer: FC = () => {

    const dispatch = useDispatch();
    const uploadStatus = useSelector(selectUploadStatus);

    const handleUpload = useCallback((file: RcFile) => {
        dispatch(uploadMasterCandidateData({file: file}));
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

export default MasterCandidatesUploadDataContainer;