import React, {FC} from "react";
import {DepartmentType} from "../../model/department-type.model";
import NavigationComponent from "../navigation/navigation.component";
import DegreeAddFormContainer from "./degree-add-form.container";

const DegreeAddContainer: FC = () => {
    return (
        <>
            <NavigationComponent
                currentOption={DepartmentType.DEGREES}/>
            <DegreeAddFormContainer/>
        </>
    )
}

export default DegreeAddContainer;