import React, {FC, ReactNode, useCallback, useState} from "react";
import {Alert, Button, Modal} from "antd";
import {useTranslation} from "react-i18next";

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
    const {t} = useTranslation();

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
            <Button className="entity-action-report-generation__button-report" type="primary"
                    onClick={handleOpenReportGenerationModal}>
                {t("entityActionReportGeneration.title")}
            </Button>
            <Modal
                title={t("entityActionReportGeneration.title")}
                visible={visible}
                footer={null}
                closable
                onCancel={handleCloseReportGenerationModal}
            >
                <>
                    {downloadError &&
                    <Alert type="error"
                           message={t("entities.person.validations.generationReportError")}
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