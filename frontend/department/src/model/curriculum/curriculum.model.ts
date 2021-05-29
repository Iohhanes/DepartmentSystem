import {Entity} from "../entity.model";
import {Speciality} from "../speciality/speciality.model";

export interface Curriculum extends Entity, ExtendCurriculumData {
    speciality: Speciality;
}

export interface CurriculumData {
    yearOfEntry: number;
}

export interface ExtendCurriculumData extends CurriculumData {
    contentExist: boolean;
    contentName?: string;
}