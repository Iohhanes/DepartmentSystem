import {configureStore, ThunkAction, Action} from "@reduxjs/toolkit";
import {specialitiesReducer} from "./speciality/specialities.slice";
import {groupsReducer} from "./group/groups.slice";
import {studentsReducer} from "./student/students.slice";

const store = configureStore({
    reducer: {
        specialities: specialitiesReducer,
        groups: groupsReducer,
        students: studentsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export default store;