import {Entity} from "../entity.model";

export interface Speciality extends Entity, SpecialityData {
}

export interface SpecialityData {
    code: string;
    title: string;
}