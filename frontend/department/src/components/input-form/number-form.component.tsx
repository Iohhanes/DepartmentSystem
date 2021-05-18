import React, {FC} from "react";
import {Form, InputNumber} from "antd";
import {Rule} from "rc-field-form/lib/interface";

interface NumberFormComponentProps {
    formClassName?: string;
    inputClassName?: string;
    name: string;
    label?: string;
    rules?: Rule[];
    defaultValue?: number;
    min?: number;
    max?: number;
}

const NumberFormComponent: FC<NumberFormComponentProps> = ({
                                                               formClassName,
                                                               inputClassName,
                                                               name,
                                                               label,
                                                               rules,
                                                               defaultValue,
                                                               min,
                                                               max
                                                           }) => {
    return (
        <Form.Item
            className={formClassName ? formClassName : ""}
            label={label}
            labelCol={{span: 24}}
            name={name}
            rules={rules}
        >
            <InputNumber
                className={inputClassName ? inputClassName : ""}
                min={min}
                max={max}/>
        </Form.Item>
    )
}

export default React.memo(NumberFormComponent)