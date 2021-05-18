import React, {FC} from "react";
import {DepartmentType} from "../../model/department-type.model";
import NavigationComponent from "../navigation/navigation.component";
import StudentEditFormContainer from "./student-edit-form.container";

const StudentEditContainer: FC = () => {
    return (
        <>
            <NavigationComponent
                currentOption={DepartmentType.STUDENTS}/>
            <StudentEditFormContainer/>
        </>
    )
}

export default StudentEditContainer;