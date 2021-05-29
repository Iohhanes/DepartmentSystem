import React, {FC} from "react";
import {Button, Form, Table} from "antd";
import {Group} from "../../model/group/group.model";
import TextFormComponent from "../input-form/text-form.component";
import SelectFormComponent from "../input-form/select-form.component";
import {Link} from "react-router-dom";
import {Speciality} from "../../model/speciality/speciality.model";
import NumberFormComponent from "../input-form/number-form.component";
import {Student} from "../../model/student/student.model";
import {DepartmentType} from "../../model/department-type.model";
import {useTranslation} from "react-i18next";

interface GroupFormComponentProps {
    current?: Group;
    onSubmit: (data: any) => void;
    specialities?: Speciality[]
    students?: Student[];
}

const GroupFormComponent: FC<GroupFormComponentProps> = ({
                                                             current,
                                                             onSubmit,
                                                             specialities,
                                                             students
                                                         }) => {

    const {t} = useTranslation();

    return (
        <Form
            className="group-form"
            name="group"
            onFinish={onSubmit}
            initialValues={current && {
                number: current.number,
                yearOfEntry: current.yearOfEntry,
                speciality: current.speciality.id
            }}>
            <TextFormComponent
                label={t("entities.group.fields.number")}
                name="number"
                rules={[
                    {
                        required: true,
                        message: t("entities.group.validations.numberRequired")
                    },
                    {
                        max: 20,
                        message: t("entities.group.validations.numberMaxLength")
                    }
                ]}/>
            <NumberFormComponent
                label={t("entities.group.fields.yearOfEntry")}
                name="yearOfEntry"
                min={1999}
                rules={[
                    {
                        required: true,
                        message: t("entities.group.validations.yearOfEntryRequired")
                    }
                ]}/>
            <SelectFormComponent
                label={t("entities.group.fields.speciality")}
                name="speciality"
                placeholder={t("entities.group.validations.specialityRequired")}
                options={specialities?.map(speciality => {
                    return {label: speciality.code, value: speciality.id}
                })}
                rules={[{
                    required: true,
                    message: t("entities.group.validations.specialityRequired")
                }]}/>
            {students && <div>
                {t("entities.group.fields.students")}
                <Table
                    className="group-form__students"
                    dataSource={students?.map(entity => {
                        return {
                            key: entity.id,
                            fullName: <Link to={{pathname: `/${DepartmentType.STUDENTS}/${entity.id}`}}>
                                {entity.fullName}</Link>
                        };

                    })} columns={[
                    {
                        dataIndex: "fullName",
                        key: "fullName"
                    }
                ]} size={"small"}
                    pagination={false}
                    showHeader={false}
                    bordered/>
            </div>
            }
            <div className="entity-form__buttons">
                <Form.Item>
                    <Button className="entity-form__buttons__save" type="primary" htmlType="submit">
                        {t("inputForms.btn.submit")}
                    </Button>
                </Form.Item>
                <Button type="primary">
                    <>
                        {t("inputForms.btn.cancel")}
                        <Link to={{pathname: `/${DepartmentType.GROUPS}`}}/>
                    </>
                </Button>
            </div>
        </Form>
    );
};

export default React.memo(GroupFormComponent);
