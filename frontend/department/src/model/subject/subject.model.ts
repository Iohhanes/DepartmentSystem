import {Entity} from "../entity.model";

export interface Subject extends Entity, SubjectData {
}

export interface SubjectData {
    title: string;
}