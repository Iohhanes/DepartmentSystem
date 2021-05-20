import React, {FC, useCallback, useEffect, useState} from "react";
import EntityActionReportGenerationComponent from "../entity/entity-action-report-generation.component";
import {DepartmentType} from "../../model/department-type.model";
import {downloadDocument} from "../../utils/report.utils";
import {PgStudentReportRequest} from "../../model/pg-student/pg-student-report-request.model";
import PgStudentReportFormComponent from "./pg-student-report-form.component";
import {selectAllData} from "../../utils/select-data.utils";
import {FacultyMember} from "../../model/faculty-member/faculty-member.model";

interface PgStudentsReportGenerationComponentProps {
    type: DepartmentType;
    fileReportName: string;
}

const PgStudentsReportGenerationComponent: FC<PgStudentsReportGenerationComponentProps> = ({
                                                                                               type,
                                                                                               fileReportName
                                                                                           }) => {

    const [facultyMembers, setFacultyMembers] = useState<FacultyMember[]>([]);
    const [downloadError, setDownloadError] = useState(false);

    useEffect(() => {
        selectAllData<FacultyMember>(DepartmentType.FACULTY_MEMBERS)
            .then(data => setFacultyMembers(data))
            .catch(error => console.log(error));
    }, [setFacultyMembers]);

    const handleSubmit = useCallback((data) => {
        setDownloadError(false);
        downloadDocument(
            `/${type}/report`,
            fileReportName,
            {
                facultyMemberId: data.facultyMember,
                signDate: data.signDate
            } as PgStudentReportRequest,
            () => {
                setDownloadError(true)
            });
    }, [type, fileReportName]);

    const handleCloseShowingDownloadError = useCallback(() => {
        setDownloadError(false);
    }, []);

    return (
        <>
            <EntityActionReportGenerationComponent
                downloadError={downloadError}
                onCloseShowingDownloadError={handleCloseShowingDownloadError}
                reportForm={<PgStudentReportFormComponent
                    facultyMembers={facultyMembers}
                    onSubmit={handleSubmit}/>}
            />
        </>
    )
}

export default PgStudentsReportGenerationComponent;