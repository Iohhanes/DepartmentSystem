import React, {FC} from "react";
import {DepartmentType} from "../../model/department-type.model";
import NavigationComponent from "../navigation/navigation.component";
import GraduateStudentAddFormContainer from "./graduate-student-add-form.container";

const GraduateStudentAddContainer: FC = () => {
    return (
        <>
            <NavigationComponent
                currentOption={DepartmentType.GRADUATE_STUDENTS}/>
            <GraduateStudentAddFormContainer/>
        </>
    )
}

export default GraduateStudentAddContainer;