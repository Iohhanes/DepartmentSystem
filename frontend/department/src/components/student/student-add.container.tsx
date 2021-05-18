import React, {FC} from "react";
import {DepartmentType} from "../../model/department-type.model";
import NavigationComponent from "../navigation/navigation.component";
import StudentAddFormContainer from "./student-add-form.container";

const StudentAddContainer: FC = () => {
    return (
        <>
            <NavigationComponent
                currentOption={DepartmentType.STUDENTS}/>
            <StudentAddFormContainer/>
        </>
    )
}

export default StudentAddContainer;