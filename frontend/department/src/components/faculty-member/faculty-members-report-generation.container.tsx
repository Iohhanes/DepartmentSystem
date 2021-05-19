import React, {FC, useCallback, useState} from "react";
import EntityActionReportGenerationComponent from "../entity/entity-action-report-generation.component";
import {DepartmentType} from "../../model/department-type.model";
import {downloadDocument} from "../../utils/report.utils";
import {FacultyMemberReportRequest} from "../../model/faculty-member/faculty-member-report-request.model";
import FacultyMemberReportFormComponent from "./faculty-member-report-form.component";

const FacultyMembersReportGenerationContainer: FC = () => {

    const [downloadError, setDownloadError] = useState(false);

    const handleSubmit = useCallback((data) => {
        setDownloadError(false);
        downloadDocument(
            `/${DepartmentType.FACULTY_MEMBERS}/report`,
            "faculty_members_report.docx",
            {
                educationYear: data.educationYear,
                signDate: data.signDate
            } as FacultyMemberReportRequest,
            () => {
                setDownloadError(true)
            });
    }, []);

    const handleCloseShowingDownloadError = useCallback(() => {
        setDownloadError(false);
    }, []);

    return (
        <>
            <EntityActionReportGenerationComponent
                downloadError={downloadError}
                onCloseShowingDownloadError={handleCloseShowingDownloadError}
                reportForm={<FacultyMemberReportFormComponent
                    onSubmit={handleSubmit}/>}
            />
        </>
    )
}

export default FacultyMembersReportGenerationContainer;