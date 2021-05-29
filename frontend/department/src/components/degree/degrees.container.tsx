import React, {FC} from "react";
import NavigationComponent from "../navigation/navigation.component";
import {DepartmentType} from "../../model/department-type.model";
import SearchBarComponent from "../search-bar/search-bar.component";
import DegreesDataContainer from "./degrees-data.container";
import {ProgressInfo} from "../../model/progress-info/progress-info.model";
import {useTranslation} from "react-i18next";

const DegreesContainer: FC = () => {

    const {t} = useTranslation();

    return (
        <>
            <NavigationComponent currentOption={DepartmentType.DEGREES}/>
            <SearchBarComponent<ProgressInfo>
                placeholder={t("entities.progressInfo.searchBarPlaceholder")}
                prefix={DepartmentType.DEGREES}
                onConvert={(entity: ProgressInfo) => {
                    return {
                        value: entity.id,
                        label: entity.title
                    }
                }}/>
            <DegreesDataContainer/>
        </>
    )
}

export default DegreesContainer;