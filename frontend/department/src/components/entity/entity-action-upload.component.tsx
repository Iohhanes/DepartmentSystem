import React, {FC, useCallback, useState} from "react";
import {RcFile} from "antd/es/upload";
import {Alert, Button, Modal, Spin} from "antd";
import UploadDataComponent from "../upload-data/upload-data.component";
import {UploadStatus} from "../../model/upload-status.model";
import {LoadingOutlined} from "@ant-design/icons";
import {FileExtension, MimeType} from "../../model/file-type.model";
import {useTranslation} from "react-i18next";

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

    const {t} = useTranslation();

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
                {t("entityActionUpload.title")}
            </Button>
            <Modal
                title={t("entityActionUpload.title")}
                visible={visible}
                footer={null}
                closable
                onCancel={handleCloseUploadModal}
            >
                <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>} spinning={loading}>
                    {!loading && <>
                        {uploadStatus !== UploadStatus.NO_UPLOADING &&
                        <Alert type={uploadStatus === UploadStatus.ERROR ? "error" : "success"}
                               message={uploadStatus === UploadStatus.ERROR ? t("entityActionUpload.uploadDataError") : t("entityActionUpload.uploadDataSuccess")}
                               closable
                               banner
                               onClose={onCloseShowingUploadStatus}/>}
                        <div className="entity-action-upload__footer">
                            <UploadDataComponent
                                onSetMainFile={handleSetMainFile}
                                fileTypes={[MimeType.XLSX]}
                                fileExtensions={[FileExtension.XLSX]}/>
                            <Button type="primary" onClick={handleSubmit}
                                    className="entity-action-upload__footer__submit-button">
                                {t("entityActionUpload.btnSubmit")}
                            </Button>
                        </div>
                    </>}
                </Spin>
            </Modal>
        </>
    )
}

export default React.memo(EntityActionUploadComponent)