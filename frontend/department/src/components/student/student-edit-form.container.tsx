import React, {FC, useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {LoadingOutlined} from "@ant-design/icons";
import {Spin} from "antd";
import {editStudent, loadStudent, selectCurrentStudent, selectLoadingOnEdit} from "../../store/student/students.slice";
import {Entity} from "../../model/entity.model";
import StudentFormComponent from "./student-form.component";
import {selectAllData} from "../../utils/select-data.utils";
import {Group} from "../../model/group/group.model";
import {DepartmentType} from "../../model/department-type.model";

const StudentEditFormContainer: FC = () => {
    const dispatch = useDispatch();

    const {id} = useParams<Entity>();

    const currentStudent = useSelector(selectCurrentStudent);
    const loading = useSelector(selectLoadingOnEdit);

    const [groups, setGroups] = useState<Group[]>([]);

    useEffect(() => {
        dispatch(loadStudent(id));
    }, [dispatch, id]);

    useEffect(() => {
        selectAllData<Group>(DepartmentType.GROUPS)
            .then(data => setGroups(data))
            .catch(error => console.log(error));
    }, [setGroups]);

    const handleSubmit = useCallback((data) => {
        dispatch(editStudent({
            id: id,
            lastName: data.lastName,
            firstName: data.firstName,
            middleName: data.middleName,
            birthDate: data.birthDate,
            phone: data.phone,
            email: data.email,
            groupId: data.group
        }));
    }, [dispatch, id])

    return (
        <Spin
            indicator={<LoadingOutlined style={{fontSize: 24}} spin/>} spinning={loading}>
            {!loading &&
            <StudentFormComponent
                onSubmit={handleSubmit}
                current={currentStudent}
                groups={groups}/>}
        </Spin>
    )
}

export default StudentEditFormContainer