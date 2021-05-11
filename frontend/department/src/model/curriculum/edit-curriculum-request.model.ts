import {Entity} from "../entity.model";
import {CurriculumData} from "./curriculum.model";
import {RcFile} from "antd/lib/upload";

export interface EditCurriculumRequest extends Entity, CurriculumData {
    specialityId: string;
    content?: RcFile;
}