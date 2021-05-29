import React, {FC} from "react";
import {Button, Form} from "antd";
import PhoneInputComponent from "../input-form/phone-form.component";
import EmailFormComponent from "../input-form/email-form.component";
import TextFormComponent from "../input-form/text-form.component";
import DatePickerFormComponent from "../input-form/date-picker-form.component";
import SelectFormComponent from "../input-form/select-form.component";
import {Link} from "react-router-dom";
import {FacultyMember} from "../../model/faculty-member/faculty-member.model";
import moment from "moment";
import {ProgressInfo} from "../../model/progress-info/progress-info.model";
import NumberFormComponent from "../input-form/number-form.component";
import {DepartmentType} from "../../model/department-type.model";
import {useTranslation} from "react-i18next";

interface FacultyMemberFormComponentProps {
    current?: FacultyMember
    onSubmit: (data: any) => void;
    degrees?: ProgressInfo[]
    ranks?: ProgressInfo[]
    positions?: ProgressInfo[]
}

const FacultyMemberFormComponent: FC<FacultyMemberFormComponentProps> = ({
                                                                             current,
                                                                             onSubmit,
                                                                             degrees,
                                                                             ranks,
                                                                             positions
                                                                         }) => {

    const {t} = useTranslation();

    return (
        <Form
            className="faculty-member-form"
            name="faculty-member"
            onFinish={onSubmit}
            initialValues={current && {
                lastName: current.lastName,
                firstName: current.firstName,
                middleName: current.middleName,
                birthDate: moment(current.birthDate),
                phone: current.phone,
                email: current.email,
                degree: current.degree?.id,
                rank: current.rank?.id,
                rate: current.workload?.rate,
                support: current.workload?.support,
                hourly: current.workload?.hourly,
                position: current.workload?.position?.id,
                positionPT: current.workload?.positionPT?.id
            }}>
            <TextFormComponent
                label={t("entities.person.fields.lastName")}
                name="lastName"
                rules={[
                    {
                        required: true,
                        message: t("entities.person.validations.lastNameRequired")
                    },
                    {
                        max: 20,
                        message: t("entities.person.validations.lastNameMaxLength")
                    }
                ]}/>
            <TextFormComponent
                label={t("entities.person.fields.firstName")}
                name="firstName"
                rules={[
                    {
                        required: true,
                        message: t("entities.person.validations.firstNameRequired")
                    },
                    {
                        max: 20,
                        message: t("entities.person.validations.firstNameMaxLength")
                    },
                ]}/>
            <TextFormComponent
                label={t("entities.person.fields.middleName")}
                name="middleName"
                rules={[
                    {
                        max: 20,
                        message: t("entities.person.validations.middleNameMaxLength")
                    },
                ]}/>
            <DatePickerFormComponent
                label={t("entities.person.fields.birthDate")}
                name="birthDate"
                rules={[
                    {
                        required: true,
                        message: t("entities.person.validations.birthDateRequired")
                    },
                ]}/>
            <PhoneInputComponent/>
            <EmailFormComponent/>
            <SelectFormComponent
                label={t("entities.facultyMember.fields.degree")}
                name="degree"
                placeholder={t("entities.facultyMember.selectDegreePlaceholder")}
                options={degrees?.map(degree => {
                    return {label: degree.title, value: degree.id}
                })}
            />
            <SelectFormComponent
                label={t("entities.facultyMember.fields.rank")}
                name="rank"
                placeholder={t("entities.facultyMember.selectRankPlaceholder")}
                options={ranks?.map(rank => {
                    return {label: rank.title, value: rank.id}
                })}
            />
            <div className="faculty-member-form__workload">
                <NumberFormComponent
                    label={t("entities.facultyMember.fields.rate")}
                    name="rate"
                    min={0.1}
                    max={1}
                    strictMode={true}
                    step="0.1"
                    rules={[
                        {
                            required: true,
                            message: t("entities.facultyMember.validations.rateRequired")
                        }]}
                />
                <NumberFormComponent
                    label={t("entities.facultyMember.fields.support")}
                    name="support"
                    min={0}
                />
                <NumberFormComponent
                    label={t("entities.facultyMember.fields.hourly")}
                    name="hourly"
                    min={0}
                />
            </div>
            <SelectFormComponent
                label={t("entities.facultyMember.fields.position")}
                name="position"
                placeholder={t("entities.facultyMember.validations.positionRequired")}
                options={positions?.map(position => {
                    return {label: position.title, value: position.id}
                })}
                rules={[
                    {
                        required: true,
                        message: t("entities.facultyMember.validations.positionRequired")
                    },
                ]}
            />
            <SelectFormComponent
                label={t("entities.facultyMember.fields.positionPT")}
                name="positionPT"
                placeholder={t("entities.facultyMember.selectPositionPTPlaceholder")}
                options={positions?.map(positionPT => {
                    return {label: positionPT.title, value: positionPT.id}
                })}
            />
            <div className="entity-form__buttons">
                <Form.Item>
                    <Button className="entity-form__buttons__save" type="primary" htmlType="submit">
                        {t("inputForms.btn.submit")}
                    </Button>
                </Form.Item>
                <Button type="primary">
                    <>
                        {t("inputForms.btn.cancel")}
                        <Link to={{pathname: `/${DepartmentType.FACULTY_MEMBERS}`}}/>
                    </>
                </Button>
            </div>
        </Form>
    );
};

export default React.memo(FacultyMemberFormComponent);
