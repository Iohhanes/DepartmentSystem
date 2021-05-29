import React, {FC} from "react";
import {Button, Form} from "antd";
import TextFormComponent from "../input-form/text-form.component";
import {Link} from "react-router-dom";
import {ProgressInfo} from "../../model/progress-info/progress-info.model";
import {DepartmentType} from "../../model/department-type.model";
import {useTranslation} from "react-i18next";

interface ProgressInfoFormComponentProps {
    type: DepartmentType
    current?: ProgressInfo;
    onSubmit: (data: any) => void;
}

const ProgressInfoFormComponent: FC<ProgressInfoFormComponentProps> = ({
                                                                           type,
                                                                           current,
                                                                           onSubmit
                                                                       }) => {

    const {t} = useTranslation();

    return (
        <Form
            className="progress-info-form"
            name="progress-info"
            onFinish={onSubmit}
            initialValues={current && {
                title: current.title,
                abbreviated: current.abbreviated
            }}>
            <TextFormComponent
                label={t("entities.progressInfo.fields.title")}
                name="title"
                rules={[
                    {
                        required: true,
                        message: t("entities.progressInfo.validations.titleRequired")
                    },
                    {
                        max: 150,
                        message: t("entities.progressInfo.validations.titleMaxLength")
                    }
                ]}/>
            <TextFormComponent
                label={t("entities.progressInfo.fields.abbreviated")}
                name="abbreviated"
                rules={[
                    {
                        required: true,
                        message: t("entities.progressInfo.validations.abbreviatedRequired")
                    },
                    {
                        max: 20,
                        message: t("entities.progressInfo.validations.abbreviatedMaxLength")
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
                        <Link to={{pathname: `/${type}`}}/>
                    </>
                </Button>
            </div>
        </Form>
    );
};

export default React.memo(ProgressInfoFormComponent);
