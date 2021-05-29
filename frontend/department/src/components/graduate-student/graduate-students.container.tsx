import React, {FC} from "react";
import NavigationComponent from "../navigation/navigation.component";
import {DepartmentType} from "../../model/department-type.model";
import SearchBarComponent from "../search-bar/search-bar.component";
import GraduateStudentsDataContainer from "./graduate-students-data.container";
import PgStudentsReportGenerationComponent from "../pg-student/pg-students-report-generation.component";
import GraduateStudentsUploadDataContainer from "./graduate-students-upload-data.container";
import {PGStudent} from "../../model/pg-student/pg-student.model";
import {useTranslation} from "react-i18next";

const GraduateStudentsContainer: FC = () => {

    const {t} = useTranslation();

    return (
        <>
            <NavigationComponent
                currentOption={DepartmentType.GRADUATE_STUDENTS}/>
            <SearchBarComponent<PGStudent>
                placeholder={t("entities.person.searchBarPlaceholder")}
                prefix={DepartmentType.GRADUATE_STUDENTS}
                onConvert={(entity: PGStudent) => {
                    return {
                        value: entity.id,
                        label: entity.fullName
                    }
                }}/>
            <PgStudentsReportGenerationComponent
                type={DepartmentType.GRADUATE_STUDENTS}
                fileReportName="graduate_students_report.docx"/>
            <GraduateStudentsUploadDataContainer/>
            <GraduateStudentsDataContainer/>
        </>
    )
}

export default GraduateStudentsContainer;