import React, {FC} from "react";
import {DatePicker, Form} from "antd";
import {Rule} from "rc-field-form/lib/interface";
import moment from "moment";

interface DatePickerFormComponentProps {
    formClassName?: string;
    datePickerClassName?: string;
    name: string;
    label?: string;
    rules?: Rule[];
    defaultValue?: Date;
}

const DatePickerFormComponent: FC<DatePickerFormComponentProps> = ({
                                                                       formClassName,
                                                                       datePickerClassName,
                                                                       name,
                                                                       label,
                                                                       rules,
                                                                       defaultValue
                                                                   }) => {
    return (
        <Form.Item
            className={"date-picker-form " + (formClassName ? formClassName : "")}
            label={label}
            labelCol={{span: 24}}
            name={name}
            rules={rules}
        >
            <DatePicker className={"date-picker-form__input " + (datePickerClassName ? datePickerClassName : "")}
                        defaultValue={defaultValue ? moment(defaultValue) : defaultValue}
                        format="DD/MM/YYYY"/>
        </Form.Item>
    )
}

export default React.memo(DatePickerFormComponent)