import React, {FC} from "react";
import {Menu} from "antd";
import {FolderOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {DepartmentType} from "../../model/department-type.model";
import SubMenu from "antd/es/menu/SubMenu";

interface NavigationComponentProps {
    currentOption: DepartmentType;
}

const NavigationComponent: FC<NavigationComponentProps> = ({currentOption}) => {
    return (
        <div className="navigation">
            <Menu defaultSelectedKeys={[currentOption]} mode="horizontal">
                <SubMenu title="Academic work" icon={<FolderOutlined/>}>
                    <Menu.Item key={DepartmentType.SUBJECTS}>
                        Subjects
                        {<Link to={{pathname: `/${DepartmentType.SUBJECTS}`}}/>}
                    </Menu.Item>
                    <Menu.Item key={DepartmentType.SPECIALITIES}>
                        Specialities
                        {<Link to={{pathname: `/${DepartmentType.SPECIALITIES}`}}/>}
                    </Menu.Item>
                    <Menu.Item key={DepartmentType.CURRICULUMS}>
                        Curriculums
                        {<Link to={{pathname: `/${DepartmentType.CURRICULUMS}`}}/>}
                    </Menu.Item>
                    <Menu.Item key={DepartmentType.FACULTY_MEMBERS}>
                        Faculty Members
                        {<Link to={{pathname: `/${DepartmentType.FACULTY_MEMBERS}`}}/>}
                    </Menu.Item>
                </SubMenu>
                <SubMenu title="Accounting of students" icon={<FolderOutlined/>}>
                    <Menu.Item key={DepartmentType.STUDENTS}>
                        Students
                        {<Link to={{pathname: `/${DepartmentType.STUDENTS}`}}/>}
                    </Menu.Item>
                    <Menu.Item key={DepartmentType.GROUPS}>
                        Groups
                        {<Link to={{pathname: `/${DepartmentType.GROUPS}`}}/>}
                    </Menu.Item>
                    <Menu.Item key={DepartmentType.MASTER_CANDIDATES}>
                        Master Candidates
                        {<Link to={{pathname: `/${DepartmentType.MASTER_CANDIDATES}`}}/>}
                    </Menu.Item>
                    <Menu.Item key={DepartmentType.GRADUATE_STUDENTS}>
                        Graduate Students
                        {<Link to={{pathname: `/${DepartmentType.GRADUATE_STUDENTS}`}}/>}
                    </Menu.Item>
                </SubMenu>
                <SubMenu title="Utils" icon={<FolderOutlined/>}>
                    <Menu.Item key={DepartmentType.DEGREES}>
                        Degrees
                        {<Link to={{pathname: `/${DepartmentType.DEGREES}`}}/>}
                    </Menu.Item>
                    <Menu.Item key={DepartmentType.RANKS}>
                        Ranks
                        {<Link to={{pathname: `/${DepartmentType.RANKS}`}}/>}
                    </Menu.Item>
                    <Menu.Item key={DepartmentType.POSITIONS}>
                        Positions
                        {<Link to={{pathname: `/${DepartmentType.POSITIONS}`}}/>}
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </div>)
}

export default React.memo(NavigationComponent);