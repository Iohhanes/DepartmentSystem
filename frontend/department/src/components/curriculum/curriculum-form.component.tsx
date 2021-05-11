import React, {FC} from "react";
import {Alert, Button, Form} from "antd";
import SelectFormComponent from "../input-form/select-form.component";
import {Link} from "react-router-dom";
import {Speciality} from "../../model/speciality/speciality.model";
import NumberFormComponent from "../input-form/number-form.component";
import {Curriculum} from "../../model/curriculum/curriculum.model";
import UploadDataComponent from "../upload-data/upload-data.component";
import {RcFile} from "antd/es/upload";
import {UploadStatus} from "../../model/upload-status.model";

interface CurriculumFormComponentProps {
    current?: Curriculum;
    onSubmit: (data: any) => void;
    specialities?: Speciality[];
    uploadStatus: UploadStatus;
    onSetMainFile: (file: RcFile | undefined) => void;
    onCloseShowingUploadStatus: () => void;
}

const CurriculumFormComponent: FC<CurriculumFormComponentProps> = ({
                                                                       current,
                                                                       onSubmit,
                                                                       specialities,
                                                                       uploadStatus,
                                                                       onSetMainFile,
                                                                       onCloseShowingUploadStatus
                                                                   }) => {
    return (
        <Form name="curriculum" onFinish={onSubmit}>
            <NumberFormComponent label="Year of entry"
                                 name="yearOfEntry"
                                 defaultValue={current?.yearOfEntry}
                                 min={1999}/>
            <SelectFormComponent label="Speciality" name="speciality" placeholder="Select speciality"
                                 options={specialities?.map(speciality => {
                                     return {label: speciality.code, value: speciality.id}
                                 })}
                                 defaultValue={current?.speciality.id}/>
            {uploadStatus === UploadStatus.ERROR &&
            <Alert type="error"
                   message="Invalid file content"
                   closable
                   banner
                   onClose={onCloseShowingUploadStatus}/>}
            <UploadDataComponent onSetMainFile={onSetMainFile}/>
            <div style={{display: "flex"}}>
                <Form.Item>
                    <Button style={{marginRight: 10}} type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
                <Button type="primary">
                    <>
                        {"Cancel"}
                        <Link to={{pathname: '/curriculums/'}}/>
                    </>
                </Button>
            </div>
        </Form>
    );
};

export default React.memo(CurriculumFormComponent);
