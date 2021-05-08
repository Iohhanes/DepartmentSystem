import React, {FC} from "react";
import {Switch, Route} from "react-router-dom";
import SpecialitiesContainer from "../components/speciality/specialities.container";
import SpecialityEditContainer from "../components/speciality/speciality-edit.container";
import StudentsContainer from "../components/student/students.container";
import {DepartmentType} from "../model/department-type.model";
import StudentEditContainer from "../components/student/student-edit.container";
import StudentAddContainer from "../components/student/student-add.container";
import GroupsContainer from "../components/group/groups.container";
import GroupEditContainer from "../components/group/group-edit.container";
import SpecialityAddContainer from "../components/speciality/speciality-add.container";

const MainRouterComponent: FC = () => {
    return (
        <>
            <Switch>
                <Route exact path='/' component={StudentsContainer}/>

                <Route exact path={`/${DepartmentType.STUDENTS}`} component={StudentsContainer}/>
                <Route path={`/${DepartmentType.STUDENTS}/:id`} component={StudentEditContainer}/>
                <Route exact path={`/${DepartmentType.STUDENTS}-new`} component={StudentAddContainer}/>

                <Route exact path={`/${DepartmentType.GROUPS}`} component={GroupsContainer}/>
                <Route path={`/${DepartmentType.GROUPS}/:id`} component={GroupEditContainer}/>
                <Route exact path={`/${DepartmentType.GROUPS}-new`} component={GroupEditContainer}/>

                <Route exact path={`/${DepartmentType.SPECIALITIES}`} component={SpecialitiesContainer}/>
                <Route path={`/${DepartmentType.SPECIALITIES}/:id`} component={SpecialityEditContainer}/>
                <Route exact path={`/${DepartmentType.SPECIALITIES}-new`} component={SpecialityAddContainer}/>
            </Switch>
        </>
    );
}

export default MainRouterComponent;