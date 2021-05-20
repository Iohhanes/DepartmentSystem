import React, {FC} from "react";
import {DepartmentType} from "../../model/department-type.model";
import NavigationComponent from "../navigation/navigation.component";
import GraduateStudentEditFormContainer from "./graduate-student-edit-form.container";

const GraduateStudentEditContainer: FC = () => {
    return (
        <>
            <NavigationComponent
                currentOption={DepartmentType.GRADUATE_STUDENTS}/>
            <GraduateStudentEditFormContainer/>
        </>
    )
}

export default GraduateStudentEditContainer;