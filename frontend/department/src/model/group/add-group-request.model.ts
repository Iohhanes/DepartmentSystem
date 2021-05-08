import {GroupData} from "./group.model";

export interface AddGroupRequest extends GroupData {
    specialityId: string;
}