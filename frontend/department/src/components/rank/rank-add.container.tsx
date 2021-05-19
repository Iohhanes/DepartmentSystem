import React, {FC} from "react";
import {DepartmentType} from "../../model/department-type.model";
import NavigationComponent from "../navigation/navigation.component";
import RankAddFormContainer from "./rank-add-form.container";

const RankAddContainer: FC = () => {
    return (
        <>
            <NavigationComponent
                currentOption={DepartmentType.DEGREES}/>
            <RankAddFormContainer/>
        </>
    )
}

export default RankAddContainer;