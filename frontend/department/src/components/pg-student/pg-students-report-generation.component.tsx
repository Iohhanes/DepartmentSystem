import React, {FC, useCallback, useEffect, useState} from "react";
import EntityActionReportGenerationComponent from "../entity/entity-action-report-generation.component";
import {DepartmentType} from "../../model/department-type.model";
import {downloadDocument, printDocument} from "../../utils/files.utils";
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
    const [printAction, setPrintAction] = useState(false);

    useEffect(() => {
        selectAllData<FacultyMember>(DepartmentType.FACULTY_MEMBERS)
            .then(data => setFacultyMembers(data))
            .catch(error => console.log(error));
    }, [setFacultyMembers]);

    const handleSubmit = useCallback((data) => {
        setDownloadError(false);
        if (printAction) {
            printDocument(
                `/${type}/report/pdf`,
                {
                    facultyMemberId: data.facultyMember,
                    signDate: data.signDate
                } as PgStudentReportRequest,
                () => {
                    setDownloadError(true)
                });
        } else {
            downloadDocument(
                `/${type}/report/word`,
                fileReportName,
                {
                    facultyMemberId: data.facultyMember,
                    signDate: data.signDate
                } as PgStudentReportRequest,
                () => {
                    setDownloadError(true)
                });
        }
    }, [type, fileReportName, printAction]);

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
                reportForm={<PgStudentReportFormComponent
                    facultyMembers={facultyMembers}
                    onSubmit={handleSubmit}
                    onDownloadBtnClick={handleDownloadBtnClick}
                    onPrintBtnClick={handlePrintBtnClick}/>}
            />
        </>
    )
}

export default PgStudentsReportGenerationComponent;