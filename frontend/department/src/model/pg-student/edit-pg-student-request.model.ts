import {Entity} from "../entity.model";
import {AddPGStudentRequest} from "./add-pg-student-request.model";

export interface EditPGStudentRequest extends AddPGStudentRequest, Entity {
}