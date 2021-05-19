import React, {FC} from "react";
import {DepartmentType} from "../../model/department-type.model";
import NavigationComponent from "../navigation/navigation.component";
import GroupAddFormContainer from "./group-add-form.container";

const GroupAddContainer: FC = () => {
    return (
        <>
            <NavigationComponent
                currentOption={DepartmentType.DEGREES}/>
            <GroupAddFormContainer/>
        </>
    )
}

export default GroupAddContainer;