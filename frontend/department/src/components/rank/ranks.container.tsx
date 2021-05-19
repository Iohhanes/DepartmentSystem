import React, {FC} from "react";
import NavigationComponent from "../navigation/navigation.component";
import {DepartmentType} from "../../model/department-type.model";
import SearchBarComponent from "../search-bar/search-bar.component";
import RanksDataContainer from "./ranks-data.container";
import {ProgressInfo} from "../../model/progress-info/progress-info.model";

const RanksContainer: FC = () => {
    return (
        <>
            <NavigationComponent currentOption={DepartmentType.RANKS}/>
            <SearchBarComponent<ProgressInfo>
                placeholder="Input title"
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