import {Entity} from "../entity.model";
import {AddFacultyMemberRequest} from "./add-faculty-member-request.model";

export interface EditFacultyMemberRequest extends AddFacultyMemberRequest, Entity {
}