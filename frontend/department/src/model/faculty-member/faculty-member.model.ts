import {Entity} from "../entity.model";
import {PersonData} from "../person/person.model";
import {ProgressInfo} from "../progress-info/progress-info.model";

export interface FacultyMember extends Entity, ExtendFacultyMemberData {
    degree: ProgressInfo;
    rank: ProgressInfo;
    workload: Workload;
}

export interface ExtendFacultyMemberData extends PersonData {
    fullName: string;
    abbreviatedName: string;
}

export interface Workload extends Entity, WorkloadData {
    position: ProgressInfo;
    positionPT: ProgressInfo;
}

export interface WorkloadData {
    hours: number;
    hourly: number;
    support: number;
}