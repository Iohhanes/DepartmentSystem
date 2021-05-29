import React, {FC} from "react";
import NavigationComponent from "../navigation/navigation.component";
import {DepartmentType} from "../../model/department-type.model";
import SearchBarComponent from "../search-bar/search-bar.component";
import SubjectsDataContainer from "./subjects-data.container";
import {Subject} from "../../model/subject/subject.model";
import {useTranslation} from "react-i18next";

const SubjectsContainer: FC = () => {

    const {t} = useTranslation();

    return (
        <>
            <NavigationComponent currentOption={DepartmentType.SUBJECTS}/>
            <SearchBarComponent<Subject>
                placeholder={t("entities.subject.searchBarPlaceholder")}
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