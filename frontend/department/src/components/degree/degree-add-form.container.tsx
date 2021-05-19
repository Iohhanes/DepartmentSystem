import React, {FC, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import ProgressInfoFormComponent from "../progress-info/progress-info-form.component";
import {addDegree, selectLoadingOnAdd} from "../../store/degree/degrees.slice";
import {DepartmentType} from "../../model/department-type.model";

const DegreeAddFormContainer: FC = () => {

    const dispatch = useDispatch();

    const loading = useSelector(selectLoadingOnAdd);

    const handleSubmit = useCallback((data) => {
        dispatch(addDegree({
            title: data.title,
            abbreviated: data.abbreviated
        }))
    }, [dispatch]);

    return (
        <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>} spinning={loading}>
            {!loading && <ProgressInfoFormComponent onSubmit={handleSubmit} type={DepartmentType.DEGREES}/>}
        </Spin>
    )
};

export default DegreeAddFormContainer;