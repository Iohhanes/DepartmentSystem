import React, {FC} from "react";
import NavigationComponent from "../navigation/navigation.component";
import {DepartmentType} from "../../model/department-type.model";
import SearchBarComponent from "../search-bar/search-bar.component";
import DegreesDataContainer from "./degrees-data.container";
import {ProgressInfo} from "../../model/progress-info/progress-info.model";

const DegreesContainer: FC = () => {
    return (
        <>
            <NavigationComponent currentOption={DepartmentType.DEGREES}/>
            <SearchBarComponent<ProgressInfo> placeholder="Input title"
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