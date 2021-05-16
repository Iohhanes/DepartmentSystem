import {Entity} from "../entity.model";
import {AddStudentRequest} from "./add-student-request.model";

export interface EditStudentRequest extends AddStudentRequest, Entity {
}