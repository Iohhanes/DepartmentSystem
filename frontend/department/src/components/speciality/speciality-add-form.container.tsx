import React, {FC, useCallback} from "react";
import SpecialityFormComponent from "./speciality-form.component";
import {useDispatch, useSelector} from "react-redux";
import {addSpeciality, selectLoadingOnAdd} from "../../store/speciality/specialities.slice";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

const SpecialityAddFormContainer: FC = () => {

    const dispatch = useDispatch();

    const loading = useSelector(selectLoadingOnAdd);

    const handleSubmit = useCallback((data) => {
        dispatch(addSpeciality({
            code: data.code,
            title: data.title
        }))
    }, [dispatch]);

    return (
        <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>} spinning={loading}>
            {!loading && <SpecialityFormComponent
                onSubmit={handleSubmit}/>}
        </Spin>
    )
};

export default SpecialityAddFormContainer;