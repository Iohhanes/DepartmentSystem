import React, {FC} from "react";
import {DepartmentType} from "../../model/department-type.model";
import NavigationComponent from "../navigation/navigation.component";
import PositionAddFormContainer from "./position-add-form.container";

const PositionAddContainer: FC = () => {
    return (
        <>
            <NavigationComponent
                currentOption={DepartmentType.DEGREES}/>
            <PositionAddFormContainer/>
        </>
    )
}

export default PositionAddContainer;