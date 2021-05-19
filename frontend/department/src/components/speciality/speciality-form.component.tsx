import React, {FC} from "react";
import {Button, Form} from "antd";
import TextFormComponent from "../input-form/text-form.component";
import {Link} from "react-router-dom";
import {Speciality} from "../../model/speciality/speciality.model";
import {DepartmentType} from "../../model/department-type.model";

interface SpecialityFormComponentProps {
    current?: Speciality;
    onSubmit: (data: any) => void;
}

const SpecialityFormComponent: FC<SpecialityFormComponentProps> = ({
                                                                       current,
                                                                       onSubmit
                                                                   }) => {

    return (
        <Form
            className="speciality-form"
            name="speciality"
            onFinish={onSubmit}
            initialValues={current && {
                code: current.code,
                title: current.title
            }}>
            <TextFormComponent
                label="Code"
                name="code"
                rules={[
                    {
                        required: true,
                        message: 'Please input code'
                    },
                    {
                        max: 50,
                        message: 'Max 50 chars',
                    }
                ]}/>
            <TextFormComponent
                label="Title"
                name="title"
                rules={[
                    {
                        required: true,
                        message: 'Please input title'
                    },
                    {
                        max: 100,
                        message: 'Max 100 chars',
                    }
                ]}/>
            <div className="entity-form__buttons">
                <Form.Item>
                    <Button className="entity-form__buttons__save" type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
                <Button type="primary">
                    <>
                        {"Cancel"}
                        <Link to={{pathname: `/${DepartmentType.SPECIALITIES}`}}/>
                    </>
                </Button>
            </div>
        </Form>
    );
};

export default React.memo(SpecialityFormComponent);
