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
        <Form name="group" onFinish={onSubmit}>
            <TextFormComponent label="Number" name="number" defaultValue={current?.number} rules={[
                {
                    required: true,
                    message: 'Please input number'
                },
                {
                    max: 20,
                    message: 'Max 20 chars',
                }
            ]}/>
            <NumberFormComponent label="Year of entry"
                                 name="yearOfEntry"
                                 defaultValue={current?.yearOfEntry}
                                 min={1999}
                                 rules={[
                                     {
                                         required: true,
                                         message: 'Please input year of entry'
                                     }
                                 ]}/>
            <SelectFormComponent label="Speciality" name="speciality" placeholder="Select speciality"
                                 options={specialities?.map(speciality => {
                                     return {label: speciality.code, value: speciality.id}
                                 })}
                                 defaultValue={current?.speciality.id}
                                 rules={[{
                                     required: true,
                                     message: 'Please select speciality'
                                 }]}/>
            {students && <div>
                {"Students"}
                <Table style={{width: "25%", marginBottom: 20}} dataSource={students?.map(entity => {
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
            <div style={{display: "flex"}}>
                <Form.Item>
                    <Button style={{marginRight: 10}} type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
                <Button type="primary">
                    <>
                        {"Cancel"}
                        <Link to={{pathname: '/groups/'}}/>
                    </>
                </Button>
            </div>
        </Form>
    );
};

export default React.memo(GroupFormComponent);
