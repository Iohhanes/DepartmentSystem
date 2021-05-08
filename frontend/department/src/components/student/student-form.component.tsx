import React, {FC} from "react";
import {Button, Form} from "antd";
import {Group} from "../../model/group/group.model";
import PhoneInputComponent from "../input-form/phone-form.component";
import EmailFormComponent from "../input-form/email-form.component";
import TextFormComponent from "../input-form/text-form.component";
import DatePickerFormComponent from "../input-form/date-picker-form.component";
import SelectFormComponent from "../input-form/select-form.component";
import {Student} from "../../model/student/student.model";
import {Link} from "react-router-dom";

interface StudentFormComponentProps {
    current?: Student;
    onSubmit: (data: any) => void;
    groups?: Group[]
}

const StudentFormComponent: FC<StudentFormComponentProps> = ({
                                                                 current,
                                                                 onSubmit,
                                                                 groups
                                                             }) => {

    return (
        <Form name="student" onFinish={onSubmit}>
            <TextFormComponent label="Last name" name="lastName" defaultValue={current?.lastName} rules={[
                {
                    required: true,
                    message: 'Please input last name'
                },
                {
                    max: 20,
                    message: 'Max 20 chars',
                }
            ]}/>
            <TextFormComponent label="First name" name="firstName" defaultValue={current?.firstName} rules={[
                {
                    required: true,
                    message: 'Please input first name'
                },
                {
                    max: 20,
                    message: 'Max 20 chars',
                },
            ]}/>
            <TextFormComponent label="Middle name" name="middleName" defaultValue={current?.middleName} rules={[
                {
                    max: 20,
                    message: 'Max 20 chars',
                },
            ]}/>
            <DatePickerFormComponent label="Birth date" name="birthDate" defaultValue={current?.birthDate} rules={[
                {
                    required: true,
                    message: 'Please input birth date'
                },
            ]}/>
            <PhoneInputComponent defaultValue={current?.phone}/>
            <EmailFormComponent defaultValue={current?.email}/>
            <SelectFormComponent label="Group" name="group" placeholder="Select group"
                                 options={groups?.map(group => {
                                     return {label: group.number, value: group.id}
                                 })}
                                 defaultValue={current?.group.id}/>
            <div style={{display: "flex"}}>
                <Form.Item>
                    <Button style={{marginRight: 10}} type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
                <Button type="primary">
                    <>
                        {"Cancel"}
                        <Link to={{pathname: '/students/'}}/>
                    </>
                </Button>
            </div>
        </Form>
    );
};

export default React.memo(StudentFormComponent);
