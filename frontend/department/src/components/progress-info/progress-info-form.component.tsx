import React, {FC} from "react";
import {Button, Form} from "antd";
import TextFormComponent from "../input-form/text-form.component";
import {Link} from "react-router-dom";
import {ProgressInfo} from "../../model/progress-info/progress-info.model";
import {DepartmentType} from "../../model/department-type.model";

interface ProgressInfoFormComponentProps {
    type: DepartmentType
    current?: ProgressInfo;
    onSubmit: (data: any) => void;
}

const ProgressInfoFormComponent: FC<ProgressInfoFormComponentProps> = ({
                                                                           type,
                                                                           current,
                                                                           onSubmit
                                                                       }) => {

    return (
        <Form
            className="progress-info-form"
            name="progress-info"
            onFinish={onSubmit}
            initialValues={current && {
                title: current.title,
                abbreviated: current.abbreviated
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
                        max: 150,
                        message: 'Max 100 chars',
                    }
                ]}/>
            <TextFormComponent
                label="Abbreviated"
                name="abbreviated"
                rules={[
                    {
                        required: true,
                        message: 'Please input abbreviated'
                    },
                    {
                        max: 20,
                        message: 'Max 20 chars',
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
                        <Link to={{pathname: `/${type}`}}/>
                    </>
                </Button>
            </div>
        </Form>
    );
};

export default React.memo(ProgressInfoFormComponent);
