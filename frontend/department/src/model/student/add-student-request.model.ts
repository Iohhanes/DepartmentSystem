import {StudentData} from "./student.model";

export interface AddStudentRequest extends StudentData {
    groupId: string;
}