import {PGStudentData} from "./pg-student.model";

export interface AddPGStudentRequest extends PGStudentData {
    facultyMemberId: string;
}