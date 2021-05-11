import {Entity} from "../entity.model";

export interface ProgressInfo extends Entity, ProgressInfoData {
}

export interface ProgressInfoData {
    title: string;
    abbreviated: string;
}