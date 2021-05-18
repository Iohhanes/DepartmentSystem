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
import moment from "moment";
import {DepartmentType} from "../../model/department-type.model";

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
        <Form
            className="student-form"
            name="student"
            onFinish={onSubmit}
            initialValues={current && {
                lastName: current.lastName,
                firstName: current.firstName,
                middleName: current.middleName,
                birthDate: moment(current.birthDate),
                phone: current.phone,
                email: current.email,
                group: current.group?.id,
            }}>
            <TextFormComponent
                label="Last name"
                name="lastName"
                rules={[
                    {
                        required: true,
                        message: 'Please input last name'
                    },
                    {
                        max: 20,
                        message: 'Max 20 chars',
                    }
                ]}/>
            <TextFormComponent
                label="First name"
                name="firstName"
                rules={[
                    {
                        required: true,
                        message: 'Please input first name'
                    },
                    {
                        max: 20,
                        message: 'Max 20 chars',
                    },
                ]}/>
            <TextFormComponent
                label="Middle name"
                name="middleName"
                rules={[
                    {
                        max: 20,
                        message: 'Max 20 chars',
                    },
                ]}/>
            <DatePickerFormComponent
                label="Birth date"
                name="birthDate"
                rules={[
                    {
                        required: true,
                        message: 'Please input birth date'
                    },
                ]}/>
            <PhoneInputComponent/>
            <EmailFormComponent/>
            <SelectFormComponent
                label="Group"
                name="group"
                placeholder="Select group"
                options={groups?.map(group => {
                    return {label: group.number, value: group.id}
                })}
            />
            <div className="entity-form__buttons">
                <Form.Item>
                    <Button className="entity-form__buttons__save" type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
                <Button type="primary">
                    <>
                        {"Cancel"}
                        <Link to={{pathname: `/${DepartmentType.STUDENTS}/`}}/>
                    </>
                </Button>
            </div>
        </Form>
    );
};

export default React.memo(StudentFormComponent);
