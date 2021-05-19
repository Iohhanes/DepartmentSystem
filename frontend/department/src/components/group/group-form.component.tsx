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
                label="Number"
                name="number"
                rules={[
                    {
                        required: true,
                        message: 'Please input number'
                    },
                    {
                        max: 20,
                        message: 'Max 20 chars',
                    }
                ]}/>
            <NumberFormComponent
                label="Year of entry"
                name="yearOfEntry"
                min={1999}
                rules={[
                    {
                        required: true,
                        message: 'Please input year of entry'
                    }
                ]}/>
            <SelectFormComponent
                label="Speciality"
                name="speciality"
                placeholder="Select speciality"
                options={specialities?.map(speciality => {
                    return {label: speciality.code, value: speciality.id}
                })}
                rules={[{
                    required: true,
                    message: 'Please select speciality'
                }]}/>
            {students && <div>
                {"Students"}
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
                        Save
                    </Button>
                </Form.Item>
                <Button type="primary">
                    <>
                        {"Cancel"}
                        <Link to={{pathname: `/${DepartmentType.GROUPS}`}}/>
                    </>
                </Button>
            </div>
        </Form>
    );
};

export default React.memo(GroupFormComponent);
