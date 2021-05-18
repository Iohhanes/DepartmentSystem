import React, {FC} from "react";
import isEmail from "validator/lib/isEmail";
import {Form, Input} from "antd";

interface EmailFormComponentProps {
    formClassName?: string;
    inputClassName?: string;
    defaultValue?: string;
}

const EmailFormComponent: FC<EmailFormComponentProps> = ({
                                                             formClassName,
                                                             inputClassName,
                                                             defaultValue
                                                         }) => {
    return (
        <Form.Item
            label="Email"
            labelCol={{span: 24}}
            className={formClassName ? formClassName : ""}
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
            <Input
                className={inputClassName ? inputClassName : ""}
                placeholder="test@subdomain.domain"
            />
        </Form.Item>
    )
}

export default React.memo(EmailFormComponent);