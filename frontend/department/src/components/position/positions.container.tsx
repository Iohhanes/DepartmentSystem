import React, {FC} from "react";
import NavigationComponent from "../navigation/navigation.component";
import {DepartmentType} from "../../model/department-type.model";
import SearchBarComponent from "../search-bar/search-bar.component";
import PositionsDataContainer from "./positions-data.container";
import {ProgressInfo} from "../../model/progress-info/progress-info.model";

const PositionsContainer: FC = () => {
    return (
        <>
            <NavigationComponent currentOption={DepartmentType.POSITIONS}/>
            <SearchBarComponent<ProgressInfo> placeholder="Input title"
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