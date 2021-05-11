import React, {FC, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import SubjectFormComponent from "./subject-form.component";
import {addSubject, selectLoadingOnAdd} from "../../store/subject/subjects.slice";

const SubjectAddContainer: FC = () => {

    const dispatch = useDispatch();

    const loading = useSelector(selectLoadingOnAdd);

    const handleSubmit = useCallback((data) => {
        dispatch(addSubject({
            title: data.title
        }))
    }, [dispatch]);

    return (
        <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>} spinning={loading}>
            {!loading && <SubjectFormComponent onSubmit={handleSubmit}/>}
        </Spin>
    )
};

export default SubjectAddContainer;