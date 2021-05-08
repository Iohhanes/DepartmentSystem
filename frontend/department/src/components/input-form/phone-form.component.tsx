import React, {FC} from "react";
import {MaskedInput} from "antd-mask-input";
import {Form} from "antd";

interface PhoneFormComponentProps {
    defaultValue?: string;
}

const PhoneFormComponent: FC<PhoneFormComponentProps> = ({defaultValue}) => {
    return (
        <Form.Item
            label="Phone"
            labelCol={{span: 24}}
            className="phone-form"
            name="phone"
            rules={[
                {
                    message: 'Please input valid phone'
                },
            ]}
        >
            <MaskedInput mask="+375(11)1111111" className="phone-form__input" defaultValue={defaultValue}/>
        </Form.Item>
    )
}

export default React.memo(PhoneFormComponent)