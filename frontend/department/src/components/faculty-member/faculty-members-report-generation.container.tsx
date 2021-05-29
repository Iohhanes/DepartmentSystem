import React, {FC, useCallback, useState} from "react";
import EntityActionReportGenerationComponent from "../entity/entity-action-report-generation.component";
import {DepartmentType} from "../../model/department-type.model";
import {downloadDocument, printDocument} from "../../utils/files.utils";
import {FacultyMemberReportRequest} from "../../model/faculty-member/faculty-member-report-request.model";
import FacultyMemberReportFormComponent from "./faculty-member-report-form.component";

const FacultyMembersReportGenerationContainer: FC = () => {

    const [downloadError, setDownloadError] = useState(false);
    const [printAction, setPrintAction] = useState(false);

    const handleSubmit = useCallback((data) => {
        setDownloadError(false);
        if (printAction) {
            printDocument(
                `/${DepartmentType.FACULTY_MEMBERS}/report/pdf`,
                {
                    educationYear: data.educationYear,
                    signDate: data.signDate
                } as FacultyMemberReportRequest,
                () => {
                    setDownloadError(true)
                });
        } else {
            downloadDocument(
                `/${DepartmentType.FACULTY_MEMBERS}/report/word`,
                "faculty_members_report.docx",
                {
                    educationYear: data.educationYear,
                    signDate: data.signDate
                } as FacultyMemberReportRequest,
                () => {
                    setDownloadError(true)
                });
        }
    }, [printAction]);

    const handleCloseShowingDownloadError = useCallback(() => {
        setDownloadError(false);
    }, []);

    const handleDownloadBtnClick = useCallback(() => {
        setPrintAction(false);
    }, [setPrintAction]);

    const handlePrintBtnClick = useCallback(() => {
        setPrintAction(true);
    }, [setPrintAction]);

    return (
        <>
            <EntityActionReportGenerationComponent
                downloadError={downloadError}
                onCloseShowingDownloadError={handleCloseShowingDownloadError}
                reportForm={<FacultyMemberReportFormComponent
                    onSubmit={handleSubmit}
                    onDownloadBtnClick={handleDownloadBtnClick}
                    onPrintBtnClick={handlePrintBtnClick}
                />}
            />
        </>
    )
}

export default FacultyMembersReportGenerationContainer;