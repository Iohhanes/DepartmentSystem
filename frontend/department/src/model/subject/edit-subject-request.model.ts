import {Entity} from "../entity.model";
import {AddSubjectRequest} from "./add-subject-request.model";

export interface EditSubjectRequest extends Entity, AddSubjectRequest {
}