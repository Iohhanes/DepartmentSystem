import React, {FC} from "react";
import {DepartmentType} from "../../model/department-type.model";
import NavigationComponent from "../navigation/navigation.component";
import CurriculumAddFormContainer from "./curriculum-add-form.container";

const CurriculumAddContainer: FC = () => {
    return (
        <>
            <NavigationComponent
                currentOption={DepartmentType.CURRICULUMS}/>
            <CurriculumAddFormContainer/>
        </>
    )
}

export default CurriculumAddContainer;