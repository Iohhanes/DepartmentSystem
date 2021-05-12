import axios from "./department-api";
import {Entity} from "../model/entity.model";
import {Student} from "../model/student/student.model";

export const selectAllData = async <T>(prefix: string) => {
    const {data} = await axios.get<T[]>(`/${prefix}`);
    return data;
}

export const selectStudentsByGroup = async (request: Entity) => {
    const {data} = await axios.get<Student[]>(`/students/group/${request.id}`)
    return data;
}