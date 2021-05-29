import React, {FC} from "react";
import {DepartmentType} from "../../model/department-type.model";
import NavigationComponent from "../navigation/navigation.component";
import GroupEditFormContainer from "./group-edit-form.container";

const GroupEditContainer: FC = () => {
    return (
        <>
            <NavigationComponent
                currentOption={DepartmentType.GROUPS}/>
            <GroupEditFormContainer/>
        </>
    )
}

export default GroupEditContainer;