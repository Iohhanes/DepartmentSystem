import {GroupData} from "./group.model";
import {Entity} from "../entity.model";

export interface EditGroupRequest extends Entity, GroupData {
    specialityId: string;
}