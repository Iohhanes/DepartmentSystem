import React, {FC} from "react";
import NavigationComponent from "../navigation/navigation.component";
import {DepartmentType} from "../../model/department-type.model";
import SearchBarComponent from "../search-bar/search-bar.component";
import FacultyMembersDataContainer from "./faculty-members-data.container";
import {FacultyMember} from "../../model/faculty-member/faculty-member.model";
import FacultyMembersReportGenerationContainer from "./faculty-members-report-generation.container";
import FacultyMembersUploadDataContainer from "./faculty-members-upload-data.container";
import {useTranslation} from "react-i18next";

const FacultyMembersContainer: FC = () => {

    const {t} = useTranslation();

    return (
        <>
            <NavigationComponent
                currentOption={DepartmentType.FACULTY_MEMBERS}/>
            <SearchBarComponent<FacultyMember>
                placeholder={t("entities.person.searchBarPlaceholder")}
                prefix={DepartmentType.FACULTY_MEMBERS}
                onConvert={(entity: FacultyMember) => {
                    return {
                        value: entity.id,
                        label: entity.fullName
                    }
                }}/>
            <FacultyMembersReportGenerationContainer/>
            <FacultyMembersUploadDataContainer/>
            <FacultyMembersDataContainer/>
        </>
    )
}

export default FacultyMembersContainer;