import React, {FC} from "react";
import {Alert, Button, Form} from "antd";
import TextFormComponent from "../input-form/text-form.component";
import {Link} from "react-router-dom";
import {Subject} from "../../model/subject/subject.model";
import {DepartmentType} from "../../model/department-type.model";
import {UploadStatus} from "../../model/upload-status.model";
import {RcFile} from "antd/es/upload";
import UploadDataComponent from "../upload-data/upload-data.component";
import {FileExtension, MimeType} from "../../model/file-type.model";
import {useTranslation} from "react-i18next";

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

    const {t} = useTranslation();

    return (
        <Form
            className="subject-form"
            name="subject"
            onFinish={onSubmit}
            initialValues={current && {
                title: current.title
            }}>
            <TextFormComponent
                label={t("entities.subject.fields.title")}
                name="title"
                rules={[
                    {
                        required: true,
                        message: t("entities.subject.validations.titleRequired")
                    },
                    {
                        max: 100,
                        message: t("entities.subject.validations.titleMaxLength"),
                    }
                ]}/>
            {uploadStatus === UploadStatus.ERROR &&
            <Alert type="error"
                   message={t("entities.subject.validations.uploadContentError")}
                   closable
                   banner
                   onClose={onCloseShowingUploadStatus}/>}
            <div className="subject-form__content">
                <UploadDataComponent
                    onSetMainFile={onSetMainFile}
                    fileTypes={[MimeType.XLSX, MimeType.XLS, MimeType.DOCX, MimeType.DOC, MimeType.PDF]}
                    fileExtensions={[FileExtension.XLSX, FileExtension.XLS, FileExtension.DOCX, FileExtension.DOC, FileExtension.PDF]}
                />
            </div>
            <div className="entity-form__buttons">
                <Form.Item>
                    <Button className="entity-form__buttons__save" type="primary" htmlType="submit">
                        {t("inputForms.btn.submit")}
                    </Button>
                </Form.Item>
                <Button type="primary">
                    <>
                        {t("inputForms.btn.cancel")}
                        <Link to={{pathname: `/${DepartmentType.SUBJECTS}`}}/>
                    </>
                </Button>
            </div>
        </Form>
    );
};

export default React.memo(SubjectFormComponent);
