import React, {FC} from "react";
import NavigationComponent from "../navigation/navigation.component";
import {DepartmentType} from "../../model/department-type.model";
import CurriculumsDataContainer from "./curriculums-data.container";

const CurriculumsContainer: FC = () => {
    return (
        <>
            <NavigationComponent currentOption={DepartmentType.CURRICULUMS}/>
            <CurriculumsDataContainer/>
        </>
    )
}

export default CurriculumsContainer;