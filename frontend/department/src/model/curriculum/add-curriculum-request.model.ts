import {CurriculumData} from "./curriculum.model";
import {RcFile} from "antd/lib/upload";

export interface AddCurriculumRequest extends CurriculumData {
    specialityId: string;
    content?: RcFile;
}