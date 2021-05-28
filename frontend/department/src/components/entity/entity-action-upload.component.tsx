import React, {FC, useCallback, useState} from "react";
import {RcFile} from "antd/es/upload";
import {Alert, Button, Modal, Spin} from "antd";
import UploadDataComponent from "../upload-data/upload-data.component";
import {UploadStatus} from "../../model/upload-status.model";
import {LoadingOutlined} from "@ant-design/icons";
import {XLSX_FILE_EXTENSION, XLSX_FILE_TYPE} from "../../utils/constants.utils";

interface EntityActionUploadComponentProps {
    onUpload: (file: RcFile) => void;
    uploadStatus: UploadStatus;
    onCloseShowingUploadStatus: () => void;
}

const EntityActionUploadComponent: FC<EntityActionUploadComponentProps> = ({
                                                                               onUpload,
                                                                               uploadStatus,
                                                                               onCloseShowingUploadStatus
                                                                           }) => {
    const [visible, setVisible] = useState(false);
    const [mainFile, setMainFile] = useState<RcFile>()

    const loading = uploadStatus === UploadStatus.PENDING;

    const handleOpenUploadModal = () => {
        setVisible(true);
    }

    const handleCloseUploadModal = () => {
        if (uploadStatus === UploadStatus.SUCCESS || uploadStatus === UploadStatus.ERROR) {
            onCloseShowingUploadStatus()
        }
        setVisible(false);
    }

    const handleSubmit = () => {
        if (mainFile) {
            onUpload(mainFile)
        }
    }

    const handleSetMainFile = useCallback((file: RcFile | undefined) => {
        setMainFile(file);
    }, [])

    return (
        <>
            <Button className="entity-action-upload__button-upload" type="primary" onClick={handleOpenUploadModal}>
                Upload data
            </Button>
            <Modal
                title="Upload data"
                visible={visible}
                footer={null}
                closable
                onCancel={handleCloseUploadModal}
            >
                <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>} spinning={loading}>
                    {!loading && <>
                        {uploadStatus !== UploadStatus.NO_UPLOADING &&
                        <Alert type={uploadStatus === UploadStatus.ERROR ? "error" : "success"}
                               message={uploadStatus === UploadStatus.ERROR ? "Invalid file content" : "File uploaded successfully"}
                               closable
                               banner
                               onClose={onCloseShowingUploadStatus}/>}
                        <div className="entity-action-upload__footer">
                            <UploadDataComponent
                                onSetMainFile={handleSetMainFile}
                                fileType={XLSX_FILE_TYPE}
                                fileExtension={XLSX_FILE_EXTENSION}/>
                            <Button type="primary" onClick={handleSubmit}
                                    className="entity-action-upload__footer__submit-button">
                                Submit
                            </Button>
                        </div>
                    </>}
                </Spin>
            </Modal>
        </>
    )
}

export default React.memo(EntityActionUploadComponent)