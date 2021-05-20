import React, {FC} from "react";
import {DepartmentType} from "../../model/department-type.model";
import NavigationComponent from "../navigation/navigation.component";
import MasterCandidateEditFormContainer from "./master-candidate-edit-form.container";

const MasterCandidateEditContainer: FC = () => {
    return (
        <>
            <NavigationComponent
                currentOption={DepartmentType.MASTER_CANDIDATES}/>
            <MasterCandidateEditFormContainer/>
        </>
    )
}

export default MasterCandidateEditContainer;