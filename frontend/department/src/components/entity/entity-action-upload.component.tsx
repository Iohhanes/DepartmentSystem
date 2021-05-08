import React, {FC, useState} from "react";
import {RcFile} from "antd/es/upload";
import {Alert, Button, Modal, Spin} from "antd";
import UploadDataComponent from "../upload-data/upload-data.component";
import {UploadStatus} from "../../model/upload-status.model";
import {LoadingOutlined} from "@ant-design/icons";

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

    return (
        <>
            <Button style={{marginBottom: 20}} type="primary" onClick={handleOpenUploadModal}>
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
                        <UploadDataComponent onUpload={onUpload}/></>}
                </Spin>
            </Modal>
        </>
    )
}

export default React.memo(EntityActionUploadComponent)