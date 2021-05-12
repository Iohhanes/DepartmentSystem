import React, {FC, useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addStudent, selectLoadingOnAdd} from "../../store/student/students.slice";
import StudentFormComponent from "./student-form.component";
import {Group} from "../../model/group/group.model";
import {selectAllData} from "../../utils/select-data.utils";
import {DepartmentType} from "../../model/department-type.model";
import {LoadingOutlined} from "@ant-design/icons";
import {Spin} from "antd";

const StudentAddContainer: FC = () => {

    const dispatch = useDispatch();

    const [groups, setGroups] = useState<Group[]>([]);

    const loading = useSelector(selectLoadingOnAdd)

    useEffect(() => {
        selectAllData<Group>(DepartmentType.GROUPS)
            .then(data => setGroups(data))
            .catch(error => console.log(error));
    }, [setGroups]);

    const handleSubmit = useCallback((data) => {
        dispatch(addStudent({
            lastName: data.lastName,
            firstName: data.firstName,
            middleName: data.middleName,
            birthDate: data.birthDate,
            email: data.email,
            phone: data.phone,
            groupId: data.group
        }))
    }, [dispatch]);

    return (
        <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>} spinning={loading}>
            {!loading && <StudentFormComponent onSubmit={handleSubmit} groups={groups}/>}
        </Spin>
    )
};

export default StudentAddContainer;