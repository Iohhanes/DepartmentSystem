import React, {FC, useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectAllData} from "../../utils/select-data.utils";
import {DepartmentType} from "../../model/department-type.model";
import {LoadingOutlined} from "@ant-design/icons";
import {Spin} from "antd";
import {FacultyMember} from "../../model/faculty-member/faculty-member.model";
import PgStudentFormComponent from "../pg-student/pg-student-form.component";
import {addGraduateStudent, selectLoadingOnAdd} from "../../store/graduate-student/graduate-students.slice";

const GraduateStudentAddFormContainer: FC = () => {

    const dispatch = useDispatch();

    const [facultyMembers, setFacultyMembers] = useState<FacultyMember[]>([]);

    const loading = useSelector(selectLoadingOnAdd)

    useEffect(() => {
        selectAllData<FacultyMember>(DepartmentType.FACULTY_MEMBERS)
            .then(data => setFacultyMembers(data))
            .catch(error => console.log(error));
    }, [setFacultyMembers]);

    const handleSubmit = useCallback((data) => {
        dispatch(addGraduateStudent({
            lastName: data.lastName,
            firstName: data.firstName,
            middleName: data.middleName,
            birthDate: data.birthDate,
            email: data.email,
            phone: data.phone,
            startDate: data.startDate,
            endDate: data.endDate,
            comment: data.comment,
            facultyMemberId: data.facultyMember
        }))
    }, [dispatch]);

    return (
        <Spin
            indicator={<LoadingOutlined style={{fontSize: 24}} spin/>} spinning={loading}>
            {!loading && <PgStudentFormComponent
                onSubmit={handleSubmit}
                type={DepartmentType.GRADUATE_STUDENTS}
                facultyMembers={facultyMembers}
            />}
        </Spin>
    )
};

export default GraduateStudentAddFormContainer;