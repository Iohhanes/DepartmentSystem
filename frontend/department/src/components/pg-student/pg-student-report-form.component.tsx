import React, {FC} from "react";
import {Button, Form} from "antd";
import DatePickerFormComponent from "../input-form/date-picker-form.component";
import {FacultyMember} from "../../model/faculty-member/faculty-member.model";
import SelectFormComponent from "../input-form/select-form.component";
import {useTranslation} from "react-i18next";

interface PgStudentReportFormComponentProps {
    onSubmit: (data: any) => void;
    facultyMembers: FacultyMember[];
    onDownloadBtnClick: () => void;
    onPrintBtnClick: () => void;
}

const PgStudentReportFormComponent: FC<PgStudentReportFormComponentProps> = ({
                                                                                 onSubmit,
                                                                                 facultyMembers,
                                                                                 onDownloadBtnClick,
                                                                                 onPrintBtnClick
                                                                             }) => {

    const {t} = useTranslation();

    return (
        <Form
            name="pg-student-report"
            onFinish={onSubmit}>
            <DatePickerFormComponent
                label={t("entities.pgStudent.fields.signDate")}
                name="signDate"
                rules={[
                    {
                        required: true,
                        message: t("entities.pgStudent.validations.signDateRequired")
                    },
                ]}/>
            <SelectFormComponent
                label={t("entities.pgStudent.fields.facultyMember")}
                name="facultyMember"
                placeholder={t("entities.pgStudent.selectFacultyMemberPlaceholder")}
                options={facultyMembers?.map(facultyMember => {
                    return {label: facultyMember.fullName, value: facultyMember.id}
                })}
                rules={[
                    {
                        required: true,
                        message: t("entities.pgStudent.selectFacultyMemberPlaceholder")
                    },
                ]}
            />
            <Form.Item>
                <Button type="primary" htmlType="submit" onClick={onDownloadBtnClick}>
                    {t("entities.person.btnDownload")}
                </Button>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" onClick={onPrintBtnClick}>
                    {t("entities.person.btnPrint")}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default React.memo(PgStudentReportFormComponent);
