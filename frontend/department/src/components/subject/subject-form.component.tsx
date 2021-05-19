import React, {FC} from "react";
import {Button, Form} from "antd";
import TextFormComponent from "../input-form/text-form.component";
import {Link} from "react-router-dom";
import {Subject} from "../../model/subject/subject.model";
import {DepartmentType} from "../../model/department-type.model";

interface SubjectFormComponentProps {
    current?: Subject;
    onSubmit: (data: any) => void;
}

const SubjectFormComponent: FC<SubjectFormComponentProps> = ({
                                                                 current,
                                                                 onSubmit
                                                             }) => {

    return (
        <Form
            className="subject-form"
            name="subject"
            onFinish={onSubmit}
            initialValues={current && {
                title: current.title
            }}>
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
                        <Link to={{pathname: `/${DepartmentType.SUBJECTS}`}}/>
                    </>
                </Button>
            </div>
        </Form>
    );
};

export default React.memo(SubjectFormComponent);
