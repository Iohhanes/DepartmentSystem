import {Entity} from "../entity.model";
import {Speciality} from "../speciality/speciality.model";

export interface Curriculum extends Entity, CurriculumData {
    speciality: Speciality;
}

export interface CurriculumData {
    yearOfEntry: number;
    hasContent?: boolean;
}