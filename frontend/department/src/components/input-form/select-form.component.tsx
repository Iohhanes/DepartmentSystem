import React, {FC} from "react";
import {Form, Select} from "antd";
import {Rule} from "rc-field-form/lib/interface";

interface SelectFormComponentProps {
    options?: { label: string, value: string }[]
    placeholder: string;
    formClassName?: string;
    selectClassName?: string;
    name: string;
    label?: string;
    rules?: Rule[];
    defaultValue?: string;
}

const SelectFormComponent: FC<SelectFormComponentProps> = ({
                                                               options,
                                                               placeholder,
                                                               formClassName,
                                                               selectClassName,
                                                               name,
                                                               label,
                                                               rules,
                                                               defaultValue
                                                           }) => {
    return (
        <Form.Item
            className={"select-form " + (formClassName ? formClassName : "")}
            label={label}
            labelCol={{span: 24}}
            name={name}
            rules={rules}
        >
            <Select className={"select__input " + (selectClassName ? selectClassName : "")}
                    placeholder={placeholder}
                    showSearch
                    defaultValue={defaultValue}>
                {options?.map(option => <Select.Option value={option.value} key={option.value}>
                    {option.label}
                </Select.Option>)}
            </Select>
        </Form.Item>
    )
}

export default React.memo(SelectFormComponent)