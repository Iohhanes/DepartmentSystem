import React, {FC, useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {LoadingOutlined} from "@ant-design/icons";
import {Spin} from "antd";
import {Entity} from "../../model/entity.model";
import {selectAllData} from "../../utils/select-data.utils";
import {DepartmentType} from "../../model/department-type.model";
import {
    editMasterCandidate,
    loadMasterCandidate,
    selectCurrentMasterCandidate,
    selectLoadingOnEdit
} from "../../store/master-candidate/master-candidates.slice";
import {FacultyMember} from "../../model/faculty-member/faculty-member.model";
import PgStudentFormComponent from "../pg-student/pg-student-form.component";

const MasterCandidateEditFormContainer: FC = () => {
    const dispatch = useDispatch();

    const {id} = useParams<Entity>();

    const currentMasterCandidate = useSelector(selectCurrentMasterCandidate);
    const loading = useSelector(selectLoadingOnEdit);

    const [facultyMembers, setFacultyMembers] = useState<FacultyMember[]>([]);

    useEffect(() => {
        dispatch(loadMasterCandidate(id));
    }, [dispatch, id]);

    useEffect(() => {
        selectAllData<FacultyMember>(DepartmentType.FACULTY_MEMBERS)
            .then(data => setFacultyMembers(data))
            .catch(error => console.log(error));
    }, [setFacultyMembers]);

    const handleSubmit = useCallback((data) => {
        dispatch(editMasterCandidate({
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
                type={DepartmentType.MASTER_CANDIDATES}
                current={currentMasterCandidate}
                facultyMembers={facultyMembers}
            />}
        </Spin>
    )
}

export default MasterCandidateEditFormContainer