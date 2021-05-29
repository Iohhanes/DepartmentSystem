import React, {FC} from "react";
import NavigationComponent from "../navigation/navigation.component";
import {DepartmentType} from "../../model/department-type.model";
import {Speciality} from "../../model/speciality/speciality.model";
import SearchBarComponent from "../search-bar/search-bar.component";
import SpecialitiesDataContainer from "./specialities-data.container";
import {useTranslation} from "react-i18next";

const SpecialitiesContainer: FC = () => {

    const {t} = useTranslation();

    return (
        <>
            <NavigationComponent currentOption={DepartmentType.SPECIALITIES}/>
            <SearchBarComponent<Speciality>
                placeholder={t("entities.speciality.searchBarPlaceholder")}
                prefix={DepartmentType.SPECIALITIES}
                onConvert={(entity: Speciality) => {
                    return {
                        value: entity.id,
                        label: entity.code
                    }
                }}/>
            <SpecialitiesDataContainer/>
        </>
    )
}

export default SpecialitiesContainer;