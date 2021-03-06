import React, {FC} from "react";
import {MaskedInput} from "antd-mask-input";
import {Form} from "antd";
import {useTranslation} from "react-i18next";

interface PhoneFormComponentProps {
    formClassName?: string;
    inputClassName?: string;
}

const PhoneFormComponent: FC<PhoneFormComponentProps> = ({
                                                             formClassName,
                                                             inputClassName
                                                         }) => {
    const {t} = useTranslation();

    return (
        <Form.Item
            label={t("entities.person.fields.phone")}
            labelCol={{span: 24}}
            className={formClassName ? formClassName : ""}
            name="phone"
        >
            <MaskedInput
                mask="+375(11)1111111"
                className={inputClassName ? inputClassName : ""}
            />
        </Form.Item>
    )
}

export default React.memo(PhoneFormComponent)