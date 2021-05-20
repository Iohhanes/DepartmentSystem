import React, {FC} from "react";
import {Button, Form} from "antd";
import PhoneInputComponent from "../input-form/phone-form.component";
import EmailFormComponent from "../input-form/email-form.component";
import TextFormComponent from "../input-form/text-form.component";
import DatePickerFormComponent from "../input-form/date-picker-form.component";
import SelectFormComponent from "../input-form/select-form.component";
import {Link} from "react-router-dom";
import moment from "moment";
import {DepartmentType} from "../../model/department-type.model";
import {PGStudent} from "../../model/pg-student/pg-student.model";
import {FacultyMember} from "../../model/faculty-member/faculty-member.model";
import MemoFormComponent from "../input-form/memo-form.component";

interface PgStudentFormComponentProps {
    current?: PGStudent
    onSubmit: (data: any) => void;
    facultyMembers?: FacultyMember[]
}

const PgStudentFormComponent: FC<PgStudentFormComponentProps> = ({
                                                                     current,
                                                                     onSubmit,
                                                                     facultyMembers
                                                                 }) => {

    return (
        <Form
            className="pg-student-form"
            name="pg-student"
            onFinish={onSubmit}
            initialValues={current && {
                lastName: current.lastName,
                firstName: current.firstName,
                middleName: current.middleName,
                birthDate: moment(current.birthDate),
                phone: current.phone,
                email: current.email,
                startDate: current.startDate ? moment(current.startDate) : undefined,
                endDate: current.endDate ? moment(current.endDate) : undefined,
                comment: current.comment,
                facultyMember: current.facultyMember?.id
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
            <DatePickerFormComponent
                label="Start date"
                name="startDate"
            />
            <DatePickerFormComponent
                label="End date"
                name="endDate"
            />
            <SelectFormComponent
                label="Faculty member"
                name="facultyMember"
                placeholder="Select faculty member"
                options={facultyMembers?.map(facultyMember => {
                    return {label: facultyMember.fullName, value: facultyMember.id}
                })}
            />
            <MemoFormComponent
                label="Comment"
                name="comment"
                maxLength={500}
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
                        <Link to={{pathname: `/${DepartmentType.FACULTY_MEMBERS}`}}/>
                    </>
                </Button>
            </div>
        </Form>
    );
};

export default React.memo(PgStudentFormComponent);
