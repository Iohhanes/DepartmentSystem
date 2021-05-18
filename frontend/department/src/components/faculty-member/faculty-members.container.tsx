import React, {FC} from "react";
import NavigationComponent from "../navigation/navigation.component";
import {DepartmentType} from "../../model/department-type.model";
import SearchBarComponent from "../search-bar/search-bar.component";
import FacultyMembersDataContainer from "./faculty-members-data.container";
import {FacultyMember} from "../../model/faculty-member/faculty-member.model";

const FacultyMembersContainer: FC = () => {
    return (
        <>
            <NavigationComponent
                currentOption={DepartmentType.FACULTY_MEMBERS}/>
            <SearchBarComponent<FacultyMember>
                placeholder="Input name"
                prefix={DepartmentType.FACULTY_MEMBERS}
                onConvert={(entity: FacultyMember) => {
                    return {
                        value: entity.id,
                        label: entity.fullName
                    }
                }}/>
            {/*<StudentsReportGenerationContainer/>*/}
            {/*<StudentsUploadDataContainer/>*/}
            <FacultyMembersDataContainer/>
        </>
    )
}

export default FacultyMembersContainer;