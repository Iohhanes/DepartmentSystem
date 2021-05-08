import React, {FC, useCallback} from "react";
import NavigationComponent from "../navigation/navigation.component";
import {DepartmentType} from "../../model/department-type.model";
import SearchBarComponent from "../search-bar/search-bar.component";
import {Student} from "../../model/student/student.model";
import StudentsDataContainer from "./students-data.container";
import StudentsUploadDataContainer from "./students-upload-data.container";
import {useHistory} from "react-router";
import StudentsReportGenerationContainer from "./students-report-generation.container";

const StudentsContainer: FC = () => {

    const history = useHistory();

    const handleSelect = useCallback((value: string) => {
        history.push(`/${DepartmentType.STUDENTS}/${value}`)
    }, [history]);

    return (
        <>
            <NavigationComponent currentOption={DepartmentType.STUDENTS}/>
            <SearchBarComponent<Student> placeholder="Input name"
                                         prefix={DepartmentType.STUDENTS}
                                         onConvert={(entity: Student) => {
                                             return {
                                                 value: entity.id,
                                                 label: entity.fullName
                                             }
                                         }} onSelect={handleSelect}/>
            <StudentsReportGenerationContainer/>
            <StudentsUploadDataContainer/>
            <StudentsDataContainer/>
        </>
    )
}

export default StudentsContainer;