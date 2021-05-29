import React, {FC} from "react";
import {DepartmentType} from "../../model/department-type.model";
import NavigationComponent from "../navigation/navigation.component";
import PositionEditFormContainer from "./position-edit-form.container";

const PositionEditContainer: FC = () => {
    return (
        <>
            <NavigationComponent
                currentOption={DepartmentType.POSITIONS}/>
            <PositionEditFormContainer/>
        </>
    )
}

export default PositionEditContainer;