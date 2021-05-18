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
                hours: current.workload?.hours,
                support: current.workload?.support,
                hourly: current.workload?.hourly,
                position: current.workload?.position?.id,
                positionPT: current.workload?.positionPT.id
            }}>
            <TextFormComponent
                label="Last name"
                name="lastName"
                rules={[
                    {
                        required: true,
                        message: 'Please input last name'
                    },
                    {
                        max: 20,
                        message: 'Max 20 chars',
                    }
                ]}/>
            <TextFormComponent
                label="First name"
                name="firstName"
                rules={[
                    {
                        required: true,
                        message: 'Please input first name'
                    },
                    {
                        max: 20,
                        message: 'Max 20 chars',
                    },
                ]}/>
            <TextFormComponent
                label="Middle name"
                name="middleName"
                rules={[
                    {
                        max: 20,
                        message: 'Max 20 chars',
                    },
                ]}/>
            <DatePickerFormComponent
                label="Birth date"
                name="birthDate"
                rules={[
                    {
                        required: true,
                        message: 'Please input birth date'
                    },
                ]}/>
            <PhoneInputComponent/>
            <EmailFormComponent/>
            <SelectFormComponent
                label="Degree"
                name="degree"
                placeholder="Select degree"
                options={degrees?.map(degree => {
                    return {label: degree.title, value: degree.id}
                })}
            />
            <SelectFormComponent
                label="Rank"
                name="rank"
                placeholder="Select rank"
                options={ranks?.map(rank => {
                    return {label: rank.title, value: rank.id}
                })}
            />
            <div className="faculty-member-form__workload">
                <NumberFormComponent
                    label="Hours"
                    name="hours"
                    min={0}
                />
                <NumberFormComponent
                    label="Support"
                    name="support"
                    min={0}
                />
                <NumberFormComponent
                    label="Hourly"
                    name="hourly"
                    min={0}
                />
            </div>
            <SelectFormComponent
                label="Position"
                name="position"
                placeholder="Select position"
                options={positions?.map(position => {
                    return {label: position.title, value: position.id}
                })}
            />
            <SelectFormComponent
                label="Position PT"
                name="positionPT"
                placeholder="Select position PT"
                options={positions?.map(positionPT => {
                    return {label: positionPT.title, value: positionPT.id}
                })}
            />
            <div className="entity-form__buttons">
                <Form.Item>
                    <Button className="entity-form__buttons__save" type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
                <Button type="primary">
                    <>
                        {"Cancel"}
                        <Link to={{pathname: `/${DepartmentType.FACULTY_MEMBERS}/`}}/>
                    </>
                </Button>
            </div>
        </Form>
    );
};

export default React.memo(FacultyMemberFormComponent);
