import React, {FC} from "react";
import {DatePicker, Form} from "antd";
import {Rule} from "rc-field-form/lib/interface";

interface DatePickerFormComponentProps {
    formClassName?: string;
    datePickerClassName?: string;
    name: string;
    label?: string;
    rules?: Rule[];
}

const DatePickerFormComponent: FC<DatePickerFormComponentProps> = ({
                                                                       formClassName,
                                                                       datePickerClassName,
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
            <DatePicker
                className={datePickerClassName ? datePickerClassName : ""}
                placeholder={""}
                format="DD/MM/YYYY"/>
        </Form.Item>
    )
}

export default React.memo(DatePickerFormComponent)