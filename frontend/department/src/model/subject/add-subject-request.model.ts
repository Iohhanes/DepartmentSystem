import {RcFile} from "antd/lib/upload";
import {SubjectData} from "./subject.model";

export interface AddSubjectRequest extends SubjectData {
    content?: RcFile;
}