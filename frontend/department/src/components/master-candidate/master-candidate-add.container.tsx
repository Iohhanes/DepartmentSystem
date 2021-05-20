import React, {FC} from "react";
import {DepartmentType} from "../../model/department-type.model";
import NavigationComponent from "../navigation/navigation.component";
import MasterCandidateAddFormContainer from "./master-candidate-add-form.container";

const MasterCandidateAddContainer: FC = () => {
    return (
        <>
            <NavigationComponent
                currentOption={DepartmentType.MASTER_CANDIDATES}/>
            <MasterCandidateAddFormContainer/>
        </>
    )
}

export default MasterCandidateAddContainer;