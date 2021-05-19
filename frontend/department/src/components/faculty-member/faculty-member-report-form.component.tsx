import React, {FC} from "react";
import {Button, Form} from "antd";
import DatePickerFormComponent from "../input-form/date-picker-form.component";
import NumberFormComponent from "../input-form/number-form.component";

interface FacultyMemberReportFormComponentProps {
    onSubmit: (data: any) => void;
}

const FacultyMemberReportFormComponent: FC<FacultyMemberReportFormComponentProps> = ({
                                                                                         onSubmit
                                                                                     }) => {

    return (
        <Form
            name="faculty-member-report"
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
            <NumberFormComponent
                label="Education year"
                name="educationYear"
                min={1999}
                rules={[{
                    required: true,
                    message: 'Please input education year'
                }
                ]}/>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Download
                </Button>
            </Form.Item>
        </Form>
    );
};

export default React.memo(FacultyMemberReportFormComponent);
