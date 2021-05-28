import React, {FC} from "react";
import {Alert, Button, Form} from "antd";
import TextFormComponent from "../input-form/text-form.component";
import {Link} from "react-router-dom";
import {Subject} from "../../model/subject/subject.model";
import {DepartmentType} from "../../model/department-type.model";
import {UploadStatus} from "../../model/upload-status.model";
import {RcFile} from "antd/es/upload";
import UploadDataComponent from "../upload-data/upload-data.component";
import {DOCX_FILE_EXTENSION, DOCX_FILE_TYPE} from "../../utils/constants.utils";

interface SubjectFormComponentProps {
    current?: Subject;
    onSubmit: (data: any) => void;
    uploadStatus: UploadStatus;
    onSetMainFile: (file: RcFile | undefined) => void;
    onCloseShowingUploadStatus: () => void;
}

const SubjectFormComponent: FC<SubjectFormComponentProps> = ({
                                                                 current,
                                                                 onSubmit,
                                                                 uploadStatus,
                                                                 onSetMainFile,
                                                                 onCloseShowingUploadStatus
                                                             }) => {

    return (
        <Form
            className="subject-form"
            name="subject"
            onFinish={onSubmit}
            initialValues={current && {
                title: current.title
            }}>
            <TextFormComponent
                label="Title"
                name="title"
                rules={[
                    {
                        required: true,
                        message: 'Please input title'
                    },
                    {
                        max: 100,
                        message: 'Max 100 chars',
                    }
                ]}/>
            {uploadStatus === UploadStatus.ERROR &&
            <Alert type="error"
                   message="Invalid file content"
                   closable
                   banner
                   onClose={onCloseShowingUploadStatus}/>}
            <div className="subject-form__content">
                <UploadDataComponent
                    onSetMainFile={onSetMainFile}
                    fileType={DOCX_FILE_TYPE}
                    fileExtension={DOCX_FILE_EXTENSION}/>
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
                        <Link to={{pathname: `/${DepartmentType.SUBJECTS}`}}/>
                    </>
                </Button>
            </div>
        </Form>
    );
};

export default React.memo(SubjectFormComponent);
