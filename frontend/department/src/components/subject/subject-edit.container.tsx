import React, {FC} from "react";
import {DepartmentType} from "../../model/department-type.model";
import NavigationComponent from "../navigation/navigation.component";
import SubjectEditFormContainer from "./subject-edit-form.container";

const SubjectEditContainer: FC = () => {
    return (
        <>
            <NavigationComponent
                currentOption={DepartmentType.SUBJECTS}/>
            <SubjectEditFormContainer/>
        </>
    )
}

export default SubjectEditContainer;