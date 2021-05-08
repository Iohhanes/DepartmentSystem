import React, {FC} from "react";
import {Form, Input} from "antd";
import {Rule} from "rc-field-form/lib/interface";

interface TextFormComponentProps {
    formClassName?: string;
    inputClassName?: string;
    name: string;
    label?: string;
    rules?: Rule[];
    defaultValue?: string;
}

const TextFormComponent: FC<TextFormComponentProps> = ({
                                                           formClassName,
                                                           inputClassName,
                                                           name,
                                                           label,
                                                           rules,
                                                           defaultValue
                                                       }) => {
    return (
        <Form.Item
            className={"text-form " + (formClassName ? formClassName : "")}
            label={label}
            labelCol={{span: 24}}
            name={name}
            rules={rules}
        >
            <Input className={"text-form__input " + (inputClassName ? inputClassName : "")}
                   defaultValue={defaultValue}/>
        </Form.Item>
    )
}

export default React.memo(TextFormComponent)