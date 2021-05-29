import React, {FC} from "react";
import NavigationComponent from "../navigation/navigation.component";
import {DepartmentType} from "../../model/department-type.model";
import SearchBarComponent from "../search-bar/search-bar.component";
import RanksDataContainer from "./ranks-data.container";
import {ProgressInfo} from "../../model/progress-info/progress-info.model";
import {useTranslation} from "react-i18next";

const RanksContainer: FC = () => {

    const {t} = useTranslation();

    return (
        <>
            <NavigationComponent currentOption={DepartmentType.RANKS}/>
            <SearchBarComponent<ProgressInfo>
                placeholder={t("entities.progressInfo.searchBarPlaceholder")}
                prefix={DepartmentType.RANKS}
                onConvert={(entity: ProgressInfo) => {
                    return {
                        value: entity.id,
                        label: entity.title
                    }
                }}/>
            <RanksDataContainer/>
        </>
    )
}

export default RanksContainer;