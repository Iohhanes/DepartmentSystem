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
        <div className="navigation">
            <Menu defaultSelectedKeys={[currentOption]} mode="horizontal">
                <Menu.Item key={DepartmentType.STUDENTS} icon={<ProfileOutlined/>}>
                    Students
                    {<Link to={{pathname: `/${DepartmentType.STUDENTS}`}}/>}
                </Menu.Item>
                <Menu.Item key={DepartmentType.GROUPS} icon={<ProfileOutlined/>}>
                    Groups
                    {<Link to={{pathname: `/${DepartmentType.GROUPS}`}}/>}
                </Menu.Item>
                <Menu.Item key={DepartmentType.SPECIALITIES} icon={<ProfileOutlined/>}>
                    Specialities
                    {<Link to={{pathname: `/${DepartmentType.SPECIALITIES}`}}/>}
                </Menu.Item>
                <Menu.Item key={DepartmentType.SUBJECTS} icon={<ProfileOutlined/>}>
                    Subjects
                    {<Link to={{pathname: `/${DepartmentType.SUBJECTS}`}}/>}
                </Menu.Item>
                <Menu.Item key={DepartmentType.CURRICULUMS} icon={<ProfileOutlined/>}>
                    Curriculums
                    {<Link to={{pathname: `/${DepartmentType.CURRICULUMS}`}}/>}
                </Menu.Item>
                <Menu.Item key={DepartmentType.FACULTY_MEMBERS} icon={<ProfileOutlined/>}>
                    Faculty Members
                    {<Link to={{pathname: `/${DepartmentType.FACULTY_MEMBERS}`}}/>}
                </Menu.Item>
                <Menu.Item key={DepartmentType.MASTER_CANDIDATES} icon={<ProfileOutlined/>}>
                    Master Candidates
                    {<Link to={{pathname: `/${DepartmentType.MASTER_CANDIDATES}`}}/>}
                </Menu.Item>
                <Menu.Item key={DepartmentType.GRADUATE_STUDENTS} icon={<ProfileOutlined/>}>
                    Graduate Students
                    {<Link to={{pathname: `/${DepartmentType.GRADUATE_STUDENTS}`}}/>}
                </Menu.Item>
                <Menu.Item key={DepartmentType.DEGREES} icon={<ProfileOutlined/>}>
                    Degrees
                    {<Link to={{pathname: `/${DepartmentType.DEGREES}`}}/>}
                </Menu.Item>
                <Menu.Item key={DepartmentType.RANKS} icon={<ProfileOutlined/>}>
                    Ranks
                    {<Link to={{pathname: `/${DepartmentType.RANKS}`}}/>}
                </Menu.Item>
                <Menu.Item key={DepartmentType.POSITIONS} icon={<ProfileOutlined/>}>
                    Positions
                    {<Link to={{pathname: `/${DepartmentType.POSITIONS}`}}/>}
                </Menu.Item>
            </Menu>
        </div>)
}

export default React.memo(NavigationComponent);