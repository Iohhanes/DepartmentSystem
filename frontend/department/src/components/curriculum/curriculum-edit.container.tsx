import React, {FC} from "react";
import {DepartmentType} from "../../model/department-type.model";
import NavigationComponent from "../navigation/navigation.component";
import CurriculumEditFormContainer from "./curriculum-edit-form.container";

const CurriculumEditContainer: FC = () => {
    return (
        <>
            <NavigationComponent
                currentOption={DepartmentType.CURRICULUMS}/>
            <CurriculumEditFormContainer/>
        </>
    )
}

export default CurriculumEditContainer;