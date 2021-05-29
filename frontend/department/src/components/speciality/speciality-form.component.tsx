import React, {FC} from "react";
import {Button, Form} from "antd";
import TextFormComponent from "../input-form/text-form.component";
import {Link} from "react-router-dom";
import {Speciality} from "../../model/speciality/speciality.model";
import {DepartmentType} from "../../model/department-type.model";
import {useTranslation} from "react-i18next";

interface SpecialityFormComponentProps {
    current?: Speciality;
    onSubmit: (data: any) => void;
}

const SpecialityFormComponent: FC<SpecialityFormComponentProps> = ({
                                                                       current,
                                                                       onSubmit
                                                                   }) => {
    const {t} = useTranslation();

    return (
        <Form
            className="speciality-form"
            name="speciality"
            onFinish={onSubmit}
            initialValues={current && {
                code: current.code,
                title: current.title
            }}>
            <TextFormComponent
                label={t("entities.speciality.fields.code")}
                name="code"
                rules={[
                    {
                        required: true,
                        message: t("entities.speciality.fields.codeRequired")
                    },
                    {
                        max: 50,
                        message: t("entities.speciality.fields.codeMaxLength")
                    }
                ]}/>
            <TextFormComponent
                label={t("entities.speciality.fields.title")}
                name="title"
                rules={[
                    {
                        required: true,
                        message: t("entities.speciality.fields.titleRequired")
                    },
                    {
                        max: 100,
                        message: t("entities.speciality.fields.titleMaxLength")
                    }
                ]}/>
            <div className="entity-form__buttons">
                <Form.Item>
                    <Button className="entity-form__buttons__save" type="primary" htmlType="submit">
                        {t("inputForms.btn.submit")}
                    </Button>
                </Form.Item>
                <Button type="primary">
                    <>
                        {t("inputForms.btn.cancel")}
                        <Link to={{pathname: `/${DepartmentType.SPECIALITIES}`}}/>
                    </>
                </Button>
            </div>
        </Form>
    );
};

export default React.memo(SpecialityFormComponent);
