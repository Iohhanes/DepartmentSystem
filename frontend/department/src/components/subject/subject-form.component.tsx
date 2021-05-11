import React, {FC} from "react";
import {Button, Form} from "antd";
import TextFormComponent from "../input-form/text-form.component";
import {Link} from "react-router-dom";
import {Subject} from "../../model/subject/subject.model";

interface SubjectFormComponentProps {
    current?: Subject;
    onSubmit: (data: any) => void;
}

const SubjectFormComponent: FC<SubjectFormComponentProps> = ({
                                                                 current,
                                                                 onSubmit
                                                             }) => {

    return (
        <Form name="subject" onFinish={onSubmit}>
            <TextFormComponent label="Title" name="title" defaultValue={current?.title} rules={[
                {
                    required: true,
                    message: 'Please input title'
                },
                {
                    max: 100,
                    message: 'Max 100 chars',
                }
            ]}/>
            <div style={{display: "flex"}}>
                <Form.Item>
                    <Button style={{marginRight: 10}} type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
                <Button type="primary">
                    <>
                        {"Cancel"}
                        <Link to={{pathname: '/subjects/'}}/>
                    </>
                </Button>
            </div>
        </Form>
    );
};

export default React.memo(SubjectFormComponent);
