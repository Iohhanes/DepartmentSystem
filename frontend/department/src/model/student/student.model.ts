import {Group} from "../group/group.model";
import {Entity} from "../entity.model";
import {PersonData} from "../person/person.model";

export interface Student extends Entity, ExtendStudentData {
    group: Group;
}

export interface ExtendStudentData extends PersonData {
    fullName: string;
    abbreviatedName: string;
}