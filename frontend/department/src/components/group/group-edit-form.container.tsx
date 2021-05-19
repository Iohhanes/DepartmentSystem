import React, {FC, useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {LoadingOutlined} from "@ant-design/icons";
import {Spin} from "antd";
import {Entity} from "../../model/entity.model";
import {selectAllData, selectStudentsByGroup} from "../../utils/select-data.utils";
import {DepartmentType} from "../../model/department-type.model";
import {editGroup, loadGroup, selectCurrentGroup, selectLoadingOnEdit} from "../../store/group/groups.slice";
import {Speciality} from "../../model/speciality/speciality.model";
import GroupFormComponent from "./group-form.component";
import {Student} from "../../model/student/student.model";

const GroupEditFormContainer: FC = () => {
    const dispatch = useDispatch();

    const {id} = useParams<Entity>();

    const currentGroup = useSelector(selectCurrentGroup);
    const loading = useSelector(selectLoadingOnEdit);

    const [specialities, setSpecialities] = useState<Speciality[]>([]);
    const [students, setStudents] = useState<Student[]>([]);

    useEffect(() => {
        dispatch(loadGroup(id));
    }, [dispatch, id]);

    useEffect(() => {
        selectAllData<Speciality>(DepartmentType.SPECIALITIES)
            .then(data => setSpecialities(data))
            .catch(error => console.log(error));
    }, [setSpecialities]);

    useEffect(() => {
        selectStudentsByGroup({id: id})
            .then(data => setStudents(data))
            .catch(error => console.log(error))
    }, [id])

    const handleSubmit = useCallback((data) => {
        dispatch(editGroup({
            id: id,
            number: data.number,
            yearOfEntry: data.yearOfEntry,
            specialityId: data.speciality
        }));
    }, [dispatch, id])

    return (
        <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>} spinning={loading}>
            {!loading &&
            <GroupFormComponent
                onSubmit={handleSubmit}
                current={currentGroup}
                specialities={specialities}
                students={students}/>}
        </Spin>
    )
}

export default GroupEditFormContainer;