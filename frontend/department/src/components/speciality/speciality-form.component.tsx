import React, {FC} from "react";
import {Button, Form} from "antd";
import TextFormComponent from "../input-form/text-form.component";
import {Link} from "react-router-dom";
import {Speciality} from "../../model/speciality/speciality.model";

interface SpecialityFormComponentProps {
    current?: Speciality;
    onSubmit: (data: any) => void;
}

const SpecialityFormComponent: FC<SpecialityFormComponentProps> = ({
                                                                       current,
                                                                       onSubmit
                                                                   }) => {

    return (
        <Form name="speciality" onFinish={onSubmit}>
            <TextFormComponent label="Code" name="code" defaultValue={current?.code} rules={[
                {
                    max: 50,
                    message: 'Max 50 chars',
                }
            ]}/>
            <TextFormComponent label="Title" name="title" defaultValue={current?.title} rules={[
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
                        <Link to={{pathname: '/specialities/'}}/>
                    </>
                </Button>
            </div>
        </Form>
    );
};

export default React.memo(SpecialityFormComponent);
