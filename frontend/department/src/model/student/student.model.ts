import {Group} from "../group/group.model";
import {Entity} from "../entity.model";

export interface Student extends Entity, ExtendStudentData {
    group: Group;
}


export interface StudentData {
    lastName: string;
    firstName: string;
    middleName: string;
    birthDate: Date;
    phone: string;
    email: string;
}

export interface ExtendStudentData extends StudentData {
    fullName: string;
    abbreviatedName: string;
}