import React, {FC} from "react";
import isEmail from "validator/lib/isEmail";
import {Form, Input} from "antd";

interface EmailFormComponentProps {
    defaultValue?: string;
}

const EmailFormComponent: FC<EmailFormComponentProps> = ({defaultValue}) => {
    return (
        <Form.Item
            label="Email"
            labelCol={{span: 24}}
            className="email-form"
            name="email"
            rules={[
                {
                    validator: async (_, value) => {
                        if (value && !isEmail(value)) {
                            throw new Error("Please input valid email");
                        }
                    }
                },
                {
                    max: 50,
                    message: 'Max 50 chars'
                }
            ]}
        >
            <Input className="email-form__input" placeholder="test@subdomain.domain" defaultValue={defaultValue}/>
        </Form.Item>
    )
}

export default React.memo(EmailFormComponent);