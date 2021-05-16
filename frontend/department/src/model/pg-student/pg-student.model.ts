import {Entity} from "../entity.model";
import {PersonData} from "../person/person.model";
import {FacultyMember} from "../faculty-member/faculty-member.model";

export interface PGStudent extends Entity, ExtendPGStudentData {
    facultyMember: FacultyMember;
}

export interface PGStudentData extends PersonData {
    startDate: Date;
    endDate: Date;
    comment: string;
}

export interface ExtendPGStudentData extends PGStudentData {
    fullName: string;
    abbreviatedName: string;
}