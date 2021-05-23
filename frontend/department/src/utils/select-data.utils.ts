import axios from "./department-api";
import {Entity} from "../model/entity.model";
import {Student} from "../model/student/student.model";
import {DepartmentType} from "../model/department-type.model";
import {DEFAULT_SEARCH_PAGE_SIZE, FIRST_TABLE_PAGE_INDEX} from "./constants.utils";

export const selectAllData = async <T>(prefix: string) => {
    const {data} = await axios.get<T[]>(`/${prefix}`);
    return data;
}

export const selectDataFromFirstPage = async <T>(prefix: string) => {
    const {data} = await axios.get<T[]>(`/${prefix}/page/${FIRST_TABLE_PAGE_INDEX}/count/${DEFAULT_SEARCH_PAGE_SIZE}`)
    return data;
}

export const selectStudentsByGroup = async (request: Entity) => {
    const {data} = await axios.get<Student[]>(`/${DepartmentType.STUDENTS}/group/${request.id}`)
    return data;
}