import React, {FC} from "react";
import {Menu} from "antd";
import {ProfileOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {DepartmentType} from "../../model/department-type.model";

interface NavigationComponentProps {
    currentOption: DepartmentType;
}

const NavigationComponent: FC<NavigationComponentProps> = ({currentOption}) => {
    return (
        <div style={{marginBottom:"20px"}}>
            <Menu defaultSelectedKeys={[currentOption]} mode="horizontal">
                <Menu.Item key={DepartmentType.STUDENTS} icon={<ProfileOutlined/>}>
                    Students
                    {<Link to={{pathname: "/students"}}/>}
                </Menu.Item>
                <Menu.Item key={DepartmentType.GROUPS} icon={<ProfileOutlined/>}>
                    Groups
                    {<Link to={{pathname: "/groups"}}/>}
                </Menu.Item>
                <Menu.Item key={DepartmentType.SPECIALITIES} icon={<ProfileOutlined/>}>
                    Specialities
                    {<Link to={{pathname: "/specialities"}}/>}
                </Menu.Item>
            </Menu>
        </div>)
}

export default React.memo(NavigationComponent);