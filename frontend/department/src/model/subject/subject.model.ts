import {Entity} from "../entity.model";

export interface Subject extends Entity, ExtendSubjectData {
}

export interface SubjectData {
    title: string;
}

export interface ExtendSubjectData extends SubjectData{
    contentExist: boolean;
    contentName?: string;
}