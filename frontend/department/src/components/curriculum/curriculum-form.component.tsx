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
import {DepartmentType} from "../../model/department-type.model";

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
        <Form
            className="curriculum-form"
            name="curriculum"
            onFinish={onSubmit}
            initialValues={current && {
                yearOfEntry: current.yearOfEntry,
                speciality: current.speciality.id
            }}>
            <NumberFormComponent
                label="Year of entry"
                name="yearOfEntry"
                min={1999}
                rules={[{
                    required: true,
                    message: 'Please input year of entry'
                }]}/>
            <SelectFormComponent
                label="Speciality"
                name="speciality"
                placeholder="Select speciality"
                options={specialities?.map(speciality => {
                    return {label: speciality.code, value: speciality.id}
                })}
                rules={[{
                    required: true,
                    message: 'Please select speciality'
                }]}/>
            {uploadStatus === UploadStatus.ERROR &&
            <Alert type="error"
                   message="Invalid file content"
                   closable
                   banner
                   onClose={onCloseShowingUploadStatus}/>}
            <div className="curriculum-form__content">
                <UploadDataComponent onSetMainFile={onSetMainFile}/>
            </div>
            <div className="entity-form__buttons">
                <Form.Item>
                    <Button className="entity-form__buttons__save" type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
                <Button type="primary">
                    <>
                        {"Cancel"}
                        <Link to={{pathname: `/${DepartmentType.CURRICULUMS}`}}/>
                    </>
                </Button>
            </div>
        </Form>
    );
};

export default React.memo(CurriculumFormComponent);
