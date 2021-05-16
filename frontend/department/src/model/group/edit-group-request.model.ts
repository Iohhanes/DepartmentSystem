import {Entity} from "../entity.model";
import {AddGroupRequest} from "./add-group-request.model";

export interface EditGroupRequest extends Entity, AddGroupRequest {
}