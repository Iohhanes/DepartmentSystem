import React, {FC, useCallback, useEffect, useState} from "react";
import EntityActionReportGenerationComponent from "../entity/entity-action-report-generation.component";
import {DepartmentType} from "../../model/department-type.model";
import {StudentReportRequest} from "../../model/student/student-report-request.model";
import {selectAllData} from "../../utils/select-data.utils";
import {Group} from "../../model/group/group.model";
import {downloadDocument, printDocument} from "../../utils/files.utils";
import StudentReportFormComponent from "./student-report-form.component";

const StudentsReportGenerationContainer: FC = () => {

    const [groups, setGroups] = useState<Group[]>([]);
    const [downloadError, setDownloadError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [printAction, setPrintAction] = useState(false);

    useEffect(() => {
        selectAllData<Group>(DepartmentType.GROUPS)
            .then(data => setGroups(data))
            .catch(error => console.log(error));
    }, [setGroups]);

    const handleSubmit = useCallback((data) => {
        setDownloadError(false);
        if (printAction) {
            printDocument(
                `/${DepartmentType.STUDENTS}/report/pdf`,
                {
                    groupId: data.group,
                    signDate: data.signDate
                } as StudentReportRequest,
                () => {
                    setLoading(false);
                },
                () => {
                    setDownloadError(true);
                });
        } else {
            downloadDocument(
                `/${DepartmentType.STUDENTS}/report/word`,
                "students_report.docx",
                {
                    groupId: data.group,
                    signDate: data.signDate
                } as StudentReportRequest,
                () => {
                    setLoading(false);
                },
                () => {
                    setDownloadError(true);
                });
        }
    }, [printAction]);

    const handleCloseShowingDownloadError = useCallback(() => {
        setDownloadError(false);
        setLoading(false);
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
                loading={loading}
                reportForm={<StudentReportFormComponent
                    groups={groups}
                    onSubmit={handleSubmit}
                    onDownloadBtnClick={handleDownloadBtnClick}
                    onPrintBtnClick={handlePrintBtnClick}
                />}
            />
        </>
    )
}

export default StudentsReportGenerationContainer;