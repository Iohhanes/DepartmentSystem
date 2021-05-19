import React, {FC} from "react";
import {Form, InputNumber} from "antd";
import {Rule} from "rc-field-form/lib/interface";

interface NumberFormComponentProps {
    formClassName?: string;
    inputClassName?: string;
    name: string;
    label?: string;
    rules?: Rule[];
    min?: number;
    max?: number;
    strictMode?: boolean;
    step?: string
}

const NumberFormComponent: FC<NumberFormComponentProps> = ({
                                                               formClassName,
                                                               inputClassName,
                                                               name,
                                                               label,
                                                               rules,
                                                               min,
                                                               max,
                                                               strictMode,
                                                               step
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
                max={max}
                step={step}
                stringMode={strictMode}/>
        </Form.Item>
    )
}

export default React.memo(NumberFormComponent)