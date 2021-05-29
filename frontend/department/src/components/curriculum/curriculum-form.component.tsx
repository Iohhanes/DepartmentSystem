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
import {FileExtension, MimeType} from "../../model/file-type.model";
import {useTranslation} from "react-i18next";

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

    const {t} = useTranslation();

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
                label={t("entities.curriculum.fields.yearOfEntry")}
                name="yearOfEntry"
                min={1999}
                rules={[{
                    required: true,
                    message: t("entities.curriculum.validations.yearOfEntryRequired")
                }]}/>
            <SelectFormComponent
                label={t("entities.curriculum.fields.speciality")}
                name="speciality"
                placeholder={t("entities.curriculum.validations.specialityRequired")}
                options={specialities?.map(speciality => {
                    return {label: speciality.code, value: speciality.id}
                })}
                rules={[{
                    required: true,
                    message: t("entities.curriculum.validations.specialityRequired")
                }]}/>
            {uploadStatus === UploadStatus.ERROR &&
            <Alert type="error"
                   message={t("entities.curriculum.validations.uploadContentError")}
                   closable
                   banner
                   onClose={onCloseShowingUploadStatus}/>}
            <div className="curriculum-form__content">
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
                        <Link to={{pathname: `/${DepartmentType.CURRICULUMS}`}}/>
                    </>
                </Button>
            </div>
        </Form>
    );
};

export default React.memo(CurriculumFormComponent);
