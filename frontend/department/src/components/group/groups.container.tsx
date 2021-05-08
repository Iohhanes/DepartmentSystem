import React, {FC, useCallback} from "react";
import NavigationComponent from "../navigation/navigation.component";
import {DepartmentType} from "../../model/department-type.model";
import SearchBarComponent from "../search-bar/search-bar.component";
import {useHistory} from "react-router";
import {Group} from "../../model/group/group.model";
import GroupsDataContainer from "./groups-data.container";

const GroupsContainer: FC = () => {

    const history = useHistory();

    const handleSelect = useCallback((value: string) => {
        history.push(`/${DepartmentType.GROUPS}/${value}`)
    }, [history]);

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
                                       }} onSelect={handleSelect}/>
            <GroupsDataContainer/>
        </>
    )
}

export default GroupsContainer;