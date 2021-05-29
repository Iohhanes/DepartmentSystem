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
import {useTranslation} from "react-i18next";

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

    const {t} = useTranslation();

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
            <SelectFormComponent
                label={t("entities.student.fields.group")}
                name="group"
                placeholder={t("entities.student.selectGroupPlaceholder")}
                options={groups?.map(group => {
                    return {label: group.number, value: group.id}
                })}
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
                        <Link to={{pathname: `/${DepartmentType.STUDENTS}`}}/>
                    </>
                </Button>
            </div>
        </Form>
    );
};

export default React.memo(StudentFormComponent);
