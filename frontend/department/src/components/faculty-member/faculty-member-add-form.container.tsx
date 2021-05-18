import React, {FC, useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectAllData} from "../../utils/select-data.utils";
import {DepartmentType} from "../../model/department-type.model";
import {LoadingOutlined} from "@ant-design/icons";
import {Spin} from "antd";
import {ProgressInfo} from "../../model/progress-info/progress-info.model";
import {addFacultyMember, selectLoadingOnAdd} from "../../store/faculty-member/faculty-members.slice";
import FacultyMemberFormComponent from "./faculty-member-form.component";

const FacultyMemberAddFormContainer: FC = () => {

    const dispatch = useDispatch();

    const [degrees, setDegrees] = useState<ProgressInfo[]>([]);
    const [ranks, setRanks] = useState<ProgressInfo[]>([]);
    const [positions, setPositions] = useState<ProgressInfo[]>([]);

    const loading = useSelector(selectLoadingOnAdd)

    useEffect(() => {
        selectAllData<ProgressInfo>(DepartmentType.DEGREES)
            .then(data => setDegrees(data))
            .catch(error => console.log(error));
    }, [setDegrees]);

    useEffect(() => {
        selectAllData<ProgressInfo>(DepartmentType.RANKS)
            .then(data => setRanks(data))
            .catch(error => console.log(error));
    }, [setRanks]);

    useEffect(() => {
        selectAllData<ProgressInfo>(DepartmentType.POSITIONS)
            .then(data => setPositions(data))
            .catch(error => console.log(error));
    }, [setPositions]);

    const handleSubmit = useCallback((data) => {
        dispatch(addFacultyMember({
            lastName: data.lastName,
            firstName: data.firstName,
            middleName: data.middleName,
            birthDate: data.birthDate,
            email: data.email,
            phone: data.phone,
            degreeId: data.degree,
            rankId: data.rank,
            workloadRequest: {
                hours: data.hours,
                hourly: data.hourly,
                support: data.support,
                positionId: data.position,
                positionPTId: data.positionPT
            }
        }))
    }, [dispatch]);

    return (
        <Spin
            indicator={<LoadingOutlined style={{fontSize: 24}} spin/>} spinning={loading}>
            {!loading && <FacultyMemberFormComponent
                onSubmit={handleSubmit}
                degrees={degrees}
                ranks={ranks}
                positions={positions}/>}
        </Spin>
    )
};

export default FacultyMemberAddFormContainer;