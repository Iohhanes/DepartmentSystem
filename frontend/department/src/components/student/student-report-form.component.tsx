import React, {FC} from "react";
import {Button, Form} from "antd";
import {Group} from "../../model/group/group.model";
import DatePickerFormComponent from "../input-form/date-picker-form.component";
import SelectFormComponent from "../input-form/select-form.component";
import {useTranslation} from "react-i18next";

interface StudentReportFormComponentProps {
    onSubmit: (data: any) => void;
    groups: Group[]
}

const StudentReportFormComponent: FC<StudentReportFormComponentProps> = ({
                                                                             onSubmit,
                                                                             groups
                                                                         }) => {

    const {t} = useTranslation();

    return (
        <Form
            name="student-report"
            onFinish={onSubmit}>
            <DatePickerFormComponent
                label={t("entities.student.fields.signDate")}
                name="signDate"
                rules={[
                    {
                        required: true,
                        message: t("entities.student.validations.signDateRequired")
                    },
                ]}/>
            <SelectFormComponent
                label={t("entities.student.fields.group")}
                name="group"
                placeholder={t("entities.student.selectGroupPlaceholder")}
                options={groups?.map(group => {
                    return {label: group.number, value: group.id}
                })}
                rules={[
                    {
                        required: true,
                        message: t("entities.student.selectGroupPlaceholder")
                    },
                ]}
            />
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    {t("entities.person.btnDownload")}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default React.memo(StudentReportFormComponent);
