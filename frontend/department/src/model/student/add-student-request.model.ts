import {PersonData} from "../person/person.model";

export interface AddStudentRequest extends PersonData {
    groupId: string;
}