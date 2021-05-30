import React, {FC} from "react";
import {Form, Select} from "antd";
import {Rule} from "rc-field-form/lib/interface";
import {useTranslation} from "react-i18next";

interface SelectFormComponentProps {
    options?: { label: string, value: string }[]
    placeholder: string;
    formClassName?: string;
    selectClassName?: string;
    name: string;
    label?: string;
    rules?: Rule[];
    disabled?: boolean;
}

const SelectFormComponent: FC<SelectFormComponentProps> = ({
                                                               options,
                                                               placeholder,
                                                               formClassName,
                                                               selectClassName,
                                                               name,
                                                               label,
                                                               rules,
                                                               disabled
                                                           }) => {

    const {t} = useTranslation();

    return (
        <Form.Item
            className={formClassName ? formClassName : ""}
            label={label}
            labelCol={{span: 24}}
            name={name}
            rules={rules}
        >
            <Select
                className={selectClassName ? selectClassName : ""}
                placeholder={placeholder}
                showSearch
                allowClear
                notFoundContent={t("inputForms.selectNotFoundOptions")}
                disabled={disabled}>
                {options?.map(option => <Select.Option
                    value={option.value}
                    key={option.value}>
                    {option.label}
                </Select.Option>)}
            </Select>
        </Form.Item>
    )
}

export default React.memo(SelectFormComponent)