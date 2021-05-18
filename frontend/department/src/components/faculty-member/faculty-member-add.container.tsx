import React, {FC} from "react";
import {DepartmentType} from "../../model/department-type.model";
import NavigationComponent from "../navigation/navigation.component";
import FacultyMemberAddFormContainer from "./faculty-member-add-form.container";

const FacultyMemberAddContainer: FC = () => {
    return (
        <>
            <NavigationComponent
                currentOption={DepartmentType.FACULTY_MEMBERS}/>
            <FacultyMemberAddFormContainer/>
        </>
    )
}

export default FacultyMemberAddContainer;