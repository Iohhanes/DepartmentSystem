import React, {FC} from "react";
import {DepartmentType} from "../../model/department-type.model";
import NavigationComponent from "../navigation/navigation.component";
import DegreeEditFormContainer from "./degree-edit-form.container";

const DegreeEditContainer: FC = () => {
    return (
        <>
            <NavigationComponent
                currentOption={DepartmentType.DEGREES}/>
            <DegreeEditFormContainer/>
        </>
    )
}

export default DegreeEditContainer;