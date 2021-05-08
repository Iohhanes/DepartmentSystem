import React, {FC, useCallback} from "react";
import 'antd/dist/antd.css';
import NavigationComponent from "../navigation/navigation.component";
import {DepartmentType} from "../../model/department-type.model";
import {Speciality} from "../../model/speciality/speciality.model";
import {useHistory} from "react-router";
import SearchBarComponent from "../search-bar/search-bar.component";
import SpecialitiesDataContainer from "./specialities-data.container";

const SpecialitiesContainer: FC = () => {

    const history = useHistory();

    const handleSelect = useCallback((value: string) => {
        history.push(`/${DepartmentType.SPECIALITIES}/${value}`)
    }, [history]);

    return (
        <>
            <NavigationComponent currentOption={DepartmentType.SPECIALITIES}/>
            <SearchBarComponent<Speciality> placeholder="Input code"
                                            prefix={DepartmentType.SPECIALITIES}
                                            onConvert={(entity: Speciality) => {
                                                return {
                                                    value: entity.id,
                                                    label: entity.code
                                                }
                                            }} onSelect={handleSelect}/>
            <SpecialitiesDataContainer/>
        </>
    )
}

export default SpecialitiesContainer;