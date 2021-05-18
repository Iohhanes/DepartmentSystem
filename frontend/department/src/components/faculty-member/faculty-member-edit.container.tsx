import React, {FC} from "react";
import {DepartmentType} from "../../model/department-type.model";
import NavigationComponent from "../navigation/navigation.component";
import FacultyMemberEditFormContainer from "./faculty-member-edit-form.container";

const FacultyMemberEditContainer: FC = () => {
    return (
        <>
            <NavigationComponent
                currentOption={DepartmentType.FACULTY_MEMBERS}/>
            <FacultyMemberEditFormContainer/>
        </>
    )
}

export default FacultyMemberEditContainer;