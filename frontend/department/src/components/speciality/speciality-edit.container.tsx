import React, {FC} from "react";
import {DepartmentType} from "../../model/department-type.model";
import NavigationComponent from "../navigation/navigation.component";
import SpecialityEditFormContainer from "./speciality-edit-form.container";

const SpecialityEditContainer: FC = () => {
    return (
        <>
            <NavigationComponent
                currentOption={DepartmentType.DEGREES}/>
            <SpecialityEditFormContainer/>
        </>
    )
}

export default SpecialityEditContainer;