import {Speciality} from "../speciality/speciality.model";
import {Entity} from "../entity.model";

export interface Group extends Entity, GroupData {
    speciality: Speciality;
}

export interface GroupData {
    number: string;
    yearOfEntry: number;
}