import React, {FC, useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {LoadingOutlined} from "@ant-design/icons";
import {Spin} from "antd";
import {Entity} from "../../model/entity.model";
import {selectAllData} from "../../utils/select-data.utils";
import {DepartmentType} from "../../model/department-type.model";
import {
    editFacultyMember,
    loadFacultyMember,
    selectCurrentFacultyMember,
    selectLoadingOnEdit
} from "../../store/faculty-member/faculty-members.slice";
import {ProgressInfo} from "../../model/progress-info/progress-info.model";
import FacultyMemberFormComponent from "./faculty-member-form.component";

const FacultyMemberEditFormContainer: FC = () => {
    const dispatch = useDispatch();

    const {id} = useParams<Entity>();

    const currentFacultyMember = useSelector(selectCurrentFacultyMember);
    const loading = useSelector(selectLoadingOnEdit);

    const [degrees, setDegrees] = useState<ProgressInfo[]>([]);
    const [ranks, setRanks] = useState<ProgressInfo[]>([]);
    const [positions, setPositions] = useState<ProgressInfo[]>([]);

    useEffect(() => {
        dispatch(loadFacultyMember(id));
    }, [dispatch, id]);

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
        dispatch(editFacultyMember({
            id: id,
            lastName: data.lastName,
            firstName: data.firstName,
            middleName: data.middleName,
            birthDate: data.birthDate,
            email: data.email,
            phone: data.phone,
            degreeId: data.degree,
            rankId: data.rank,
            workloadRequest: {
                rate: data.rate,
                hourly: data.hourly,
                support: data.support,
                positionId: data.position,
                positionPTId: data.positionPT
            }
        }));
    }, [dispatch, id])

    return (
        <Spin
            indicator={<LoadingOutlined style={{fontSize: 24}} spin/>} spinning={loading}>
            {!loading && <FacultyMemberFormComponent
                onSubmit={handleSubmit}
                current={currentFacultyMember}
                degrees={degrees}
                ranks={ranks}
                positions={positions}/>}
        </Spin>
    )
}

export default FacultyMemberEditFormContainer