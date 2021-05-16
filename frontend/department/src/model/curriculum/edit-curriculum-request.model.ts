import {Entity} from "../entity.model";
import {AddCurriculumRequest} from "./add-curriculum-request.model";

export interface EditCurriculumRequest extends Entity, AddCurriculumRequest {
}