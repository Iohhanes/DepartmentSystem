import React, {FC} from "react";
import {MaskedInput} from "antd-mask-input";
import {Form} from "antd";

interface PhoneFormComponentProps {
    formClassName?: string;
    inputClassName?: string;
    defaultValue?: string;
}

const PhoneFormComponent: FC<PhoneFormComponentProps> = ({
                                                             formClassName,
                                                             inputClassName,
                                                             defaultValue
                                                         }) => {
    return (
        <Form.Item
            label="Phone"
            labelCol={{span: 24}}
            className={formClassName ? formClassName : ""}
            name="phone"
            rules={[
                {
                    message: 'Please input valid phone'
                },
            ]}
        >
            <MaskedInput
                mask="+375(11)1111111"
                className={inputClassName ? inputClassName : ""}
            />
        </Form.Item>
    )
}

export default React.memo(PhoneFormComponent)