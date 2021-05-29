import React, {FC} from "react";
import isEmail from "validator/lib/isEmail";
import {Form, Input} from "antd";
import {useTranslation} from "react-i18next";

interface EmailFormComponentProps {
    formClassName?: string;
    inputClassName?: string;
}

const EmailFormComponent: FC<EmailFormComponentProps> = ({
                                                             formClassName,
                                                             inputClassName
                                                         }) => {
    const {t} = useTranslation();

    return (
        <Form.Item
            label={t("entities.person.fields.email")}
            labelCol={{span: 24}}
            className={formClassName ? formClassName : ""}
            name="email"
            rules={[
                {
                    validator: async (_, value) => {
                        if (value && !isEmail(value)) {
                            throw new Error(`${t("entities.person.validations.emailInvalid")}`);
                        }
                    }
                },
                {
                    max: 50,
                    message: t("entities.person.validations.emailMaxLength")
                }
            ]}
        >
            <Input
                className={inputClassName ? inputClassName : ""}
                placeholder="test@subdomain.domain"
            />
        </Form.Item>
    )
}

export default React.memo(EmailFormComponent);