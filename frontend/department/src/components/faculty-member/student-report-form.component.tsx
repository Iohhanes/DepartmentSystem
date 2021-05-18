import React, {FC} from "react";
import {Button, Form} from "antd";
import {Group} from "../../model/group/group.model";
import DatePickerFormComponent from "../input-form/date-picker-form.component";
import SelectFormComponent from "../input-form/select-form.component";

interface StudentReportFormComponentProps {
    onSubmit: (data: any) => void;
    groups?: Group[]
}

const StudentReportFormComponent: FC<StudentReportFormComponentProps> = ({
                                                                             onSubmit,
                                                                             groups
                                                                         }) => {

    return (
        <Form name="student-report" onFinish={onSubmit}>
            <DatePickerFormComponent label="Sign date" name="signDate" rules={[
                {
                    required: true,
                    message: 'Please input sign date'
                },
            ]}/>
            <SelectFormComponent label="Group" name="group" placeholder="Select group"
                                 options={groups?.map(group => {
                                     return {label: group.number, value: group.id}
                                 })}
                                 rules={[
                                     {
                                         required: true,
                                         message: 'Please select group'
                                     },
                                 ]}/>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Download
                </Button>
            </Form.Item>
        </Form>
    );
};

export default React.memo(StudentReportFormComponent);
