import React, {FC} from "react";
import NavigationComponent from "../navigation/navigation.component";
import {DepartmentType} from "../../model/department-type.model";
import SearchBarComponent from "../search-bar/search-bar.component";
import {Group} from "../../model/group/group.model";
import GroupsDataContainer from "./groups-data.container";

const GroupsContainer: FC = () => {
    return (
        <>
            <NavigationComponent currentOption={DepartmentType.GROUPS}/>
            <SearchBarComponent<Group> placeholder="Input number"
                                       prefix={DepartmentType.GROUPS}
                                       onConvert={(entity: Group) => {
                                           return {
                                               value: entity.id,
                                               label: entity.number
                                           }
                                       }}/>
            <GroupsDataContainer/>
        </>
    )
}

export default GroupsContainer;