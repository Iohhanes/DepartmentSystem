import React, {FC} from "react";
import {Switch, Route} from "react-router-dom";
import SpecialitiesContainer from "../components/speciality/specialities.container";
import SpecialityEditContainer from "../components/speciality/speciality-edit.container";
import StudentsContainer from "../components/student/students.container";
import {DepartmentType} from "../model/department-type.model";
import GroupsContainer from "../components/group/groups.container";
import GroupEditContainer from "../components/group/group-edit.container";
import SpecialityAddContainer from "../components/speciality/speciality-add.container";
import SubjectsContainer from "../components/subject/subjects.container";
import SubjectEditContainer from "../components/subject/subject-edit.container";
import SubjectAddContainer from "../components/subject/subject-add.container";
import CurriculumAddContainer from "../components/curriculum/curriculum-add.container";
import CurriculumEditContainer from "../components/curriculum/curriculum-edit.container";
import CurriculumsContainer from "../components/curriculum/curriculums.container";
import GroupAddContainer from "../components/group/group-add.container";
import DegreesContainer from "../components/degree/degrees.container";
import DegreeEditContainer from "../components/degree/degree-edit.container";
import DegreeAddContainer from "../components/degree/degree-add.container";
import RanksContainer from "../components/rank/ranks.container";
import RankEditContainer from "../components/rank/rank-edit.container";
import RankAddContainer from "../components/rank/rank-add.container";
import PositionsContainer from "../components/position/positions.container";
import PositionEditContainer from "../components/position/position-edit.container";
import PositionAddContainer from "../components/position/position-add.container";
import StudentAddContainer from "../components/student/student-add.container";
import StudentEditContainer from "../components/student/student-edit.container";
import FacultyMembersContainer from "../components/faculty-member/faculty-members.container";
import FacultyMemberEditContainer from "../components/faculty-member/faculty-member-edit.container";
import FacultyMemberAddContainer from "../components/faculty-member/faculty-member-add.container";

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
                <Route exact path={`/${DepartmentType.GROUPS}-new`} component={GroupAddContainer}/>

                <Route exact path={`/${DepartmentType.SPECIALITIES}`} component={SpecialitiesContainer}/>
                <Route path={`/${DepartmentType.SPECIALITIES}/:id`} component={SpecialityEditContainer}/>
                <Route exact path={`/${DepartmentType.SPECIALITIES}-new`} component={SpecialityAddContainer}/>

                <Route exact path={`/${DepartmentType.SUBJECTS}`} component={SubjectsContainer}/>
                <Route path={`/${DepartmentType.SUBJECTS}/:id`} component={SubjectEditContainer}/>
                <Route exact path={`/${DepartmentType.SUBJECTS}-new`} component={SubjectAddContainer}/>

                <Route exact path={`/${DepartmentType.CURRICULUMS}`} component={CurriculumsContainer}/>
                <Route path={`/${DepartmentType.CURRICULUMS}/:id`} component={CurriculumEditContainer}/>
                <Route exact path={`/${DepartmentType.CURRICULUMS}-new`} component={CurriculumAddContainer}/>

                <Route exact path={`/${DepartmentType.DEGREES}`} component={DegreesContainer}/>
                <Route path={`/${DepartmentType.DEGREES}/:id`} component={DegreeEditContainer}/>
                <Route exact path={`/${DepartmentType.DEGREES}-new`} component={DegreeAddContainer}/>

                <Route exact path={`/${DepartmentType.RANKS}`} component={RanksContainer}/>
                <Route path={`/${DepartmentType.RANKS}/:id`} component={RankEditContainer}/>
                <Route exact path={`/${DepartmentType.RANKS}-new`} component={RankAddContainer}/>

                <Route exact path={`/${DepartmentType.POSITIONS}`} component={PositionsContainer}/>
                <Route path={`/${DepartmentType.POSITIONS}/:id`} component={PositionEditContainer}/>
                <Route exact path={`/${DepartmentType.POSITIONS}-new`} component={PositionAddContainer}/>

                <Route exact path={`/${DepartmentType.FACULTY_MEMBERS}`} component={FacultyMembersContainer}/>
                <Route path={`/${DepartmentType.FACULTY_MEMBERS}/:id`} component={FacultyMemberEditContainer}/>
                <Route exact path={`/${DepartmentType.FACULTY_MEMBERS}-new`} component={FacultyMemberAddContainer}/>
            </Switch>
        </>
    );
}

export default MainRouterComponent;