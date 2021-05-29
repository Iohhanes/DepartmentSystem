import React, {FC} from "react";
import NavigationComponent from "../navigation/navigation.component";
import {DepartmentType} from "../../model/department-type.model";
import SearchBarComponent from "../search-bar/search-bar.component";
import PositionsDataContainer from "./positions-data.container";
import {ProgressInfo} from "../../model/progress-info/progress-info.model";
import {useTranslation} from "react-i18next";

const PositionsContainer: FC = () => {

    const {t} = useTranslation();

    return (
        <>
            <NavigationComponent currentOption={DepartmentType.POSITIONS}/>
            <SearchBarComponent<ProgressInfo>
                placeholder={t("entities.progressInfo.searchBarPlaceholder")}
                prefix={DepartmentType.POSITIONS}
                onConvert={(entity: ProgressInfo) => {
                    return {
                        value: entity.id,
                        label: entity.title
                    }
                }}/>
            <PositionsDataContainer/>
        </>
    )
}

export default PositionsContainer;