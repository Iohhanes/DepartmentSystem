import React, {FC} from "react";
import {Form, Input} from "antd";
import {Rule} from "rc-field-form/lib/interface";

interface TextFormComponentProps {
    formClassName?: string;
    inputClassName?: string;
    name: string;
    label?: string;
    rules?: Rule[];
}

const TextFormComponent: FC<TextFormComponentProps> = ({
                                                           formClassName,
                                                           inputClassName,
                                                           name,
                                                           label,
                                                           rules
                                                       }) => {
    return (
        <Form.Item
            className={formClassName ? formClassName : ""}
            label={label}
            labelCol={{span: 24}}
            name={name}
            rules={rules}
        >
            <Input
                className={inputClassName ? inputClassName : ""}
            />
        </Form.Item>
    )
}

export default React.memo(TextFormComponent)