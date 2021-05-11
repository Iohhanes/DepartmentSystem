import React, {FC, useCallback, useEffect, useState} from "react";
import EntityActionReportGenerationComponent from "../entity/entity-action-report-generation.component";
import {DepartmentType} from "../../model/department-type.model";
import {StudentReportRequest} from "../../model/student/student-report-request.model";
import {selectAllData} from "../../utils/select-all-data.utils";
import {Group} from "../../model/group/group.model";
import {downloadDocument} from "../../utils/report.utils";
import StudentReportFormComponent from "./student-report-form.component";

const StudentsReportGenerationContainer: FC = () => {

    const [groups, setGroups] = useState<Group[]>([]);
    const [downloadError, setDownloadError] = useState(false);

    useEffect(() => {
        selectAllData<Group>(DepartmentType.GROUPS)
            .then(data => setGroups(data))
            .catch(error => console.log(error));
    }, [setGroups]);

    const handleSubmit = useCallback((data) => {
        setDownloadError(false);
        downloadDocument(
            `/${DepartmentType.STUDENTS}/report`,
            "students_report.docx",
            {
                groupId: data.group,
                signDate: data.signDate
            } as StudentReportRequest,
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
                reportForm={<StudentReportFormComponent groups={groups} onSubmit={handleSubmit}/>}
            />
        </>
    )
}

export default StudentsReportGenerationContainer;