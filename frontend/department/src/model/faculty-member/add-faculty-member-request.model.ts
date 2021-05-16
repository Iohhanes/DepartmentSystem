import {PersonData} from "../person/person.model";
import {WorkloadData} from "./faculty-member.model";

export interface AddFacultyMemberRequest extends PersonData {
    degreeId: string;
    rankId: string;
    workloadRequest: AddWorkloadRequest;
}

export interface AddWorkloadRequest extends WorkloadData {
    positionId: string;
    positionPTId: string;
}