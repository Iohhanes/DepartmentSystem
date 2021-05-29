import React, {FC} from "react";
import {DepartmentType} from "../../model/department-type.model";
import NavigationComponent from "../navigation/navigation.component";
import SpecialityAddFormContainer from "./speciality-add-form.container";

const SpecialityAddContainer: FC = () => {
    return (
        <>
            <NavigationComponent
                currentOption={DepartmentType.SPECIALITIES}/>
            <SpecialityAddFormContainer/>
        </>
    )
}

export default SpecialityAddContainer;