import React, {FC} from "react";
import NavigationComponent from "../navigation/navigation.component";
import {DepartmentType} from "../../model/department-type.model";
import SearchBarComponent from "../search-bar/search-bar.component";
import MasterCandidatesDataContainer from "./master-candidates-data.container";
import PgStudentsReportGenerationComponent from "../pg-student/pg-students-report-generation.component";
import MasterCandidatesUploadDataContainer from "./master-candidates-upload-data.container";
import {PGStudent} from "../../model/pg-student/pg-student.model";
import {useTranslation} from "react-i18next";

const MasterCandidatesContainer: FC = () => {

    const {t} = useTranslation();

    return (
        <>
            <NavigationComponent
                currentOption={DepartmentType.MASTER_CANDIDATES}/>
            <SearchBarComponent<PGStudent>
                placeholder={t("entities.person.searchBarPlaceholder")}
                prefix={DepartmentType.MASTER_CANDIDATES}
                onConvert={(entity: PGStudent) => {
                    return {
                        value: entity.id,
                        label: entity.fullName
                    }
                }}/>
            <PgStudentsReportGenerationComponent
                type={DepartmentType.MASTER_CANDIDATES}
                fileReportName="master_candidates_report.docx"/>
            <MasterCandidatesUploadDataContainer/>
            <MasterCandidatesDataContainer/>
        </>
    )
}

export default MasterCandidatesContainer;