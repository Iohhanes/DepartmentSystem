import React, {FC} from "react";
import {DepartmentType} from "../../model/department-type.model";
import NavigationComponent from "../navigation/navigation.component";
import SubjectAddFormContainer from "./subject-add-form.container";

const SubjectAddContainer: FC = () => {
    return (
        <>
            <NavigationComponent
                currentOption={DepartmentType.SUBJECTS}/>
            <SubjectAddFormContainer/>
        </>
    )
}

export default SubjectAddContainer;