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
import {useTranslation} from "react-i18next";

interface PgStudentFormComponentProps {
    current?: PGStudent
    onSubmit: (data: any) => void;
    type: DepartmentType;
    facultyMembers?: FacultyMember[]
}

const PgStudentFormComponent: FC<PgStudentFormComponentProps> = ({
                                                                     current,
                                                                     onSubmit,
                                                                     type,
                                                                     facultyMembers
                                                                 }) => {

    const {t} = useTranslation();

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
                label={t("entities.person.fields.lastName")}
                name="lastName"
                rules={[
                    {
                        required: true,
                        message: t("entities.person.validations.lastNameRequired")
                    },
                    {
                        max: 20,
                        message: t("entities.person.validations.lastNameMaxLength")
                    }
                ]}/>
            <TextFormComponent
                label={t("entities.person.fields.firstName")}
                name="firstName"
                rules={[
                    {
                        required: true,
                        message: t("entities.person.validations.firstNameRequired")
                    },
                    {
                        max: 20,
                        message: t("entities.person.validations.firstNameMaxLength")
                    },
                ]}/>
            <TextFormComponent
                label={t("entities.person.fields.middleName")}
                name="middleName"
                rules={[
                    {
                        max: 20,
                        message: t("entities.person.validations.middleNameMaxLength")
                    },
                ]}/>
            <DatePickerFormComponent
                label={t("entities.person.fields.birthDate")}
                name="birthDate"
                rules={[
                    {
                        required: true,
                        message: t("entities.person.validations.birthDateRequired")
                    },
                ]}/>
            <PhoneInputComponent/>
            <EmailFormComponent/>
            <DatePickerFormComponent
                label={t("entities.pgStudent.fields.startDate")}
                name="startDate"
            />
            <DatePickerFormComponent
                label={t("entities.pgStudent.fields.endDate")}
                name="endDate"
            />
            <SelectFormComponent
                label={t("entities.pgStudent.fields.facultyMember")}
                name="facultyMember"
                placeholder={t("entities.pgStudent.selectFacultyMemberPlaceholder")}
                options={facultyMembers?.map(facultyMember => {
                    return {label: facultyMember.fullName, value: facultyMember.id}
                })}
            />
            <MemoFormComponent
                label={t("entities.pgStudent.fields.comment")}
                name="comment"
                maxLength={500}
            />
            <div className="entity-form__buttons">
                <Form.Item>
                    <Button className="entity-form__buttons__save" type="primary" htmlType="submit">
                        {t("inputForms.btn.submit")}
                    </Button>
                </Form.Item>
                <Button type="primary">
                    <>
                        {t("inputForms.btn.cancel")}
                        <Link to={{pathname: `/${type}`}}/>
                    </>
                </Button>
            </div>
        </Form>
    );
};

export default React.memo(PgStudentFormComponent);
