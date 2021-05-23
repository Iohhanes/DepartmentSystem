import React, {FC, useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {LoadingOutlined} from "@ant-design/icons";
import {Spin} from "antd";
import {Entity} from "../../model/entity.model";
import {selectAllData} from "../../utils/select-data.utils";
import {DepartmentType} from "../../model/department-type.model";
import {FacultyMember} from "../../model/faculty-member/faculty-member.model";
import PgStudentFormComponent from "../pg-student/pg-student-form.component";
import {
    editGraduateStudent,
    loadGraduateStudent,
    selectCurrentGraduateStudent,
    selectLoadingOnEdit
} from "../../store/graduate-student/graduate-students.slice";

const GraduateStudentEditFormContainer: FC = () => {
    const dispatch = useDispatch();

    const {id} = useParams<Entity>();

    const currentGraduateStudent = useSelector(selectCurrentGraduateStudent);
    const loading = useSelector(selectLoadingOnEdit);

    const [facultyMembers, setFacultyMembers] = useState<FacultyMember[]>([]);

    useEffect(() => {
        dispatch(loadGraduateStudent(id));
    }, [dispatch, id]);

    useEffect(() => {
        selectAllData<FacultyMember>(DepartmentType.FACULTY_MEMBERS)
            .then(data => setFacultyMembers(data))
            .catch(error => console.log(error));
    }, [setFacultyMembers]);

    const handleSubmit = useCallback((data) => {
        dispatch(editGraduateStudent({
            id: id,
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
        }));
    }, [dispatch, id])

    return (
        <Spin
            indicator={<LoadingOutlined style={{fontSize: 24}} spin/>} spinning={loading}>
            {!loading && <PgStudentFormComponent
                onSubmit={handleSubmit}
                type={DepartmentType.GRADUATE_STUDENTS}
                current={currentGraduateStudent}
                facultyMembers={facultyMembers}
            />}
        </Spin>
    )
}

export default GraduateStudentEditFormContainer