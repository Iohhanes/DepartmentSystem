import React, {FC, ReactNode, useCallback, useState} from "react";
import {Alert, Button, Modal} from "antd";

interface EntityActionReportGenerationComponentProps {
    downloadError: boolean;
    onCloseShowingDownloadError: () => void;
    reportForm: ReactNode;
}

const EntityActionReportGenerationComponent: FC<EntityActionReportGenerationComponentProps> = ({
                                                                                                   downloadError,
                                                                                                   onCloseShowingDownloadError,
                                                                                                   reportForm
                                                                                               }) => {
    const [visible, setVisible] = useState(false);

    const handleOpenReportGenerationModal = useCallback(() => {
        setVisible(true);
    }, []);

    const handleCloseReportGenerationModal = useCallback(() => {
        onCloseShowingDownloadError();
        setVisible(false);
    }, [onCloseShowingDownloadError]);

    return (
        <>
            <Button style={{marginBottom: 20, marginRight: 10}} type="primary"
                    onClick={handleOpenReportGenerationModal}>
                Report
            </Button>
            <Modal
                title="Report"
                visible={visible}
                footer={null}
                closable
                onCancel={handleCloseReportGenerationModal}
            >
                <>
                    {downloadError &&
                    <Alert type="error"
                           message="Report generation error"
                           closable
                           banner
                           onClose={onCloseShowingDownloadError}/>}
                    {reportForm}
                </>
            </Modal>
        </>
    )
}

export default React.memo(EntityActionReportGenerationComponent)