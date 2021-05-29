import React, {FC} from "react";
import {DepartmentType} from "../../model/department-type.model";
import NavigationComponent from "../navigation/navigation.component";
import RankEditFormContainer from "./rank-edit-form.container";

const RankEditContainer: FC = () => {
    return (
        <>
            <NavigationComponent
                currentOption={DepartmentType.RANKS}/>
            <RankEditFormContainer/>
        </>
    )
}

export default RankEditContainer;