import {StudentData} from "./student.model";
import {Entity} from "../entity.model";

export interface EditStudentRequest extends StudentData, Entity {
    groupId: string;
}