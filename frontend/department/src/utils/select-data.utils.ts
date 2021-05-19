import axios from "./department-api";
import {Entity} from "../model/entity.model";
import {Student} from "../model/student/student.model";
import {DepartmentType} from "../model/department-type.model";

export const selectAllData = async <T>(prefix: string) => {
    const {data} = await axios.get<T[]>(`/${prefix}`);
    return data;
}

export const selectStudentsByGroup = async (request: Entity) => {
    const {data} = await axios.get<Student[]>(`/${DepartmentType.STUDENTS}/group/${request.id}`)
    return data;
}