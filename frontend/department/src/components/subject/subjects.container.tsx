import React, {FC} from "react";
import NavigationComponent from "../navigation/navigation.component";
import {DepartmentType} from "../../model/department-type.model";
import SearchBarComponent from "../search-bar/search-bar.component";
import SubjectsDataContainer from "./subjects-data.container";
import {Subject} from "../../model/subject/subject.model";

const SubjectsContainer: FC = () => {
    return (
        <>
            <NavigationComponent currentOption={DepartmentType.SUBJECTS}/>
            <SearchBarComponent<Subject> placeholder="Input title"
                                         prefix={DepartmentType.SUBJECTS}
                                         onConvert={(entity: Subject) => {
                                             return {
                                                 value: entity.id,
                                                 label: entity.title
                                             }
                                         }}/>
            <SubjectsDataContainer/>
        </>
    )
}

export default SubjectsContainer;