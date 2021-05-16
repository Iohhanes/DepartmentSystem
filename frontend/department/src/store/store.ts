import {configureStore, ThunkAction, Action} from "@reduxjs/toolkit";
import {specialitiesReducer} from "./speciality/specialities.slice";
import {groupsReducer} from "./group/groups.slice";
import {studentsReducer} from "./student/students.slice";
import {subjectsReducer} from "./subject/subjects.slice";
import {curriculumsReducer} from "./curriculum/curriculums.slice";
import {degreesReducer} from "./degree/degrees.slice";
import {ranksReducer} from "./rank/ranks.slice";
import {positionsReducer} from "./position/positions.slice";
import {masterCandidatesReducer} from "./master-candidate/master-candidates.slice";
import {graduateStudentsReducer} from "./graduate-student/graduate-students.slice";
import {facultyMembersReducer} from "./faculty-member/faculty-members.slice";

const store = configureStore({
    reducer: {
        specialities: specialitiesReducer,
        groups: groupsReducer,
        students: studentsReducer,
        subjects: subjectsReducer,
        curriculums: curriculumsReducer,
        degrees: degreesReducer,
        ranks: ranksReducer,
        positions: positionsReducer,
        masterCandidates: masterCandidatesReducer,
        graduateStudents: graduateStudentsReducer,
        facultyMembers: facultyMembersReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export default store;