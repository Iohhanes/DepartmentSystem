import {PageRequest} from "./page-request.model";

export interface DeleteEntitiesRequest extends PageRequest{
    ids:string[];
}