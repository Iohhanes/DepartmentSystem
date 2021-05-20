import React, {FC} from "react";
import {Button, Form} from "antd";
import DatePickerFormComponent from "../input-form/date-picker-form.component";
import {FacultyMember} from "../../model/faculty-member/faculty-member.model";
import SelectFormComponent from "../input-form/select-form.component";

interface PgStudentReportFormComponentProps {
    onSubmit: (data: any) => void;
    facultyMembers: FacultyMember[];
}

const PgStudentReportFormComponent: FC<PgStudentReportFormComponentProps> = ({
                                                                                 onSubmit,
                                                                                 facultyMembers
                                                                             }) => {

    return (
        <Form
            name="pg-student-report"
            onFinish={onSubmit}>
            <DatePickerFormComponent
                label="Sign date"
                name="signDate"
                rules={[
                    {
                        required: true,
                        message: 'Please input sign date'
                    },
                ]}/>
            <SelectFormComponent
                label="Faculty member"
                name="facultyMember"
                placeholder="Select faculty member"
                options={facultyMembers?.map(facultyMember => {
                    return {label: facultyMember.fullName, value: facultyMember.id}
                })}
                rules={[
                    {
                        required: true,
                        message: 'Please select faculty member'
                    },
                ]}
            />
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Download
                </Button>
            </Form.Item>
        </Form>
    );
};

export default React.memo(PgStudentReportFormComponent);
