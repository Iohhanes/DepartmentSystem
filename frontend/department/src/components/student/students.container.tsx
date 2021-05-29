import React, {FC} from "react";
import NavigationComponent from "../navigation/navigation.component";
import {DepartmentType} from "../../model/department-type.model";
import SearchBarComponent from "../search-bar/search-bar.component";
import {Student} from "../../model/student/student.model";
import StudentsDataContainer from "./students-data.container";
import StudentsUploadDataContainer from "./students-upload-data.container";
import StudentsReportGenerationContainer from "./students-report-generation.container";
import {useTranslation} from "react-i18next";

const StudentsContainer: FC = () => {

    const {t} = useTranslation();

    return (
        <>
            <NavigationComponent
                currentOption={DepartmentType.STUDENTS}/>
            <SearchBarComponent<Student>
                placeholder={t("entities.person.searchBarPlaceholder")}
                prefix={DepartmentType.STUDENTS}
                onConvert={(entity: Student) => {
                    return {
                        value: entity.id,
                        label: entity.fullName
                    }
                }}/>
            <StudentsReportGenerationContainer/>
            <StudentsUploadDataContainer/>
            <StudentsDataContainer/>
        </>
    )
}

export default StudentsContainer;