import React, {FC} from "react";
import {Menu} from "antd";
import {FolderOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {DepartmentType} from "../../model/department-type.model";
import SubMenu from "antd/es/menu/SubMenu";
import {useTranslation} from "react-i18next";

interface NavigationComponentProps {
    currentOption: DepartmentType;
}

const NavigationComponent: FC<NavigationComponentProps> = ({currentOption}) => {

    const {t} = useTranslation();

    return (
        <div className="navigation">
            <Menu defaultSelectedKeys={[currentOption]} mode="horizontal">
                <SubMenu title={t("navigation.academicWork.title")} icon={<FolderOutlined/>}>
                    <Menu.Item key={DepartmentType.SUBJECTS}>
                        {t("navigation.academicWork.subjects")}
                        {<Link to={{pathname: `/${DepartmentType.SUBJECTS}`}}/>}
                    </Menu.Item>
                    <Menu.Item key={DepartmentType.SPECIALITIES}>
                        {t("navigation.academicWork.specialities")}
                        {<Link to={{pathname: `/${DepartmentType.SPECIALITIES}`}}/>}
                    </Menu.Item>
                    <Menu.Item key={DepartmentType.CURRICULUMS}>
                        {t("navigation.academicWork.curriculums")}
                        {<Link to={{pathname: `/${DepartmentType.CURRICULUMS}`}}/>}
                    </Menu.Item>
                    <Menu.Item key={DepartmentType.FACULTY_MEMBERS}>
                        {t("navigation.academicWork.facultyMembers")}
                        {<Link to={{pathname: `/${DepartmentType.FACULTY_MEMBERS}`}}/>}
                    </Menu.Item>
                </SubMenu>
                <SubMenu title={t("navigation.accountingOfStudents.title")} icon={<FolderOutlined/>}>
                    <Menu.Item key={DepartmentType.STUDENTS}>
                        {t("navigation.accountingOfStudents.students")}
                        {<Link to={{pathname: `/${DepartmentType.STUDENTS}`}}/>}
                    </Menu.Item>
                    <Menu.Item key={DepartmentType.GROUPS}>
                        {t("navigation.accountingOfStudents.groups")}
                        {<Link to={{pathname: `/${DepartmentType.GROUPS}`}}/>}
                    </Menu.Item>
                    <Menu.Item key={DepartmentType.MASTER_CANDIDATES}>
                        {t("navigation.accountingOfStudents.masterCandidates")}
                        {<Link to={{pathname: `/${DepartmentType.MASTER_CANDIDATES}`}}/>}
                    </Menu.Item>
                    <Menu.Item key={DepartmentType.GRADUATE_STUDENTS}>
                        {t("navigation.accountingOfStudents.graduateStudents")}
                        {<Link to={{pathname: `/${DepartmentType.GRADUATE_STUDENTS}`}}/>}
                    </Menu.Item>
                </SubMenu>
                <SubMenu title={t("navigation.utils.title")} icon={<FolderOutlined/>}>
                    <Menu.Item key={DepartmentType.DEGREES}>
                        {t("navigation.utils.degrees")}
                        {<Link to={{pathname: `/${DepartmentType.DEGREES}`}}/>}
                    </Menu.Item>
                    <Menu.Item key={DepartmentType.RANKS}>
                        {t("navigation.utils.ranks")}
                        {<Link to={{pathname: `/${DepartmentType.RANKS}`}}/>}
                    </Menu.Item>
                    <Menu.Item key={DepartmentType.POSITIONS}>
                        {t("navigation.utils.positions")}
                        {<Link to={{pathname: `/${DepartmentType.POSITIONS}`}}/>}
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </div>)
}

export default React.memo(NavigationComponent);