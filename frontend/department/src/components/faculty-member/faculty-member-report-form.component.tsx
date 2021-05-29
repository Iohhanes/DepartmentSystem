import React, {FC} from "react";
import {Button, Form} from "antd";
import DatePickerFormComponent from "../input-form/date-picker-form.component";
import NumberFormComponent from "../input-form/number-form.component";
import {useTranslation} from "react-i18next";

interface FacultyMemberReportFormComponentProps {
    onSubmit: (data: any) => void;
    onDownloadBtnClick: () => void;
    onPrintBtnClick: () => void;
}

const FacultyMemberReportFormComponent: FC<FacultyMemberReportFormComponentProps> = ({
                                                                                         onSubmit,
                                                                                         onDownloadBtnClick,
                                                                                         onPrintBtnClick
                                                                                     }) => {

    const {t} = useTranslation();

    return (
        <Form
            name="faculty-member-report"
            onFinish={onSubmit}>
            <DatePickerFormComponent
                label={t("entities.facultyMember.fields.signDate")}
                name="signDate"
                rules={[
                    {
                        required: true,
                        message: t("entities.facultyMember.validations.signDateRequired")
                    },
                ]}/>
            <NumberFormComponent
                label={t("entities.facultyMember.fields.educationYear")}
                name="educationYear"
                min={1999}
                rules={[{
                    required: true,
                    message: t("entities.facultyMember.validations.educationYearRequired")
                }
                ]}/>
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

export default React.memo(FacultyMemberReportFormComponent);
