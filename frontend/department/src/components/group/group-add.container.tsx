import React, {FC, useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectAllData} from "../../utils/select-all-data.utils";
import {DepartmentType} from "../../model/department-type.model";
import {LoadingOutlined} from "@ant-design/icons";
import {Spin} from "antd";
import GroupFormComponent from "./group-form.component";
import {Speciality} from "../../model/speciality/speciality.model";
import {addGroup, selectLoadingOnAdd} from "../../store/group/groups.slice";

const GroupAddContainer: FC = () => {

    const dispatch = useDispatch();

    const [specialities, setSpecialities] = useState<Speciality[]>([]);

    const loading = useSelector(selectLoadingOnAdd);

    useEffect(() => {
        selectAllData<Speciality>(DepartmentType.SPECIALITIES)
            .then(data => setSpecialities(data))
            .catch(error => console.log(error));
    }, [setSpecialities]);

    const handleSubmit = useCallback((data) => {
        dispatch(addGroup({
            number: data.number,
            yearOfEntry: data.yearOfEntry,
            specialityId: data.speciality
        }))
    }, [dispatch]);

    return (
        <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>} spinning={loading}>
            {!loading && <GroupFormComponent onSubmit={handleSubmit} specialities={specialities}/>}
        </Spin>
    )
};

export default GroupAddContainer;