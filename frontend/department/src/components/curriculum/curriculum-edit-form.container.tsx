import React, {FC, useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {LoadingOutlined} from "@ant-design/icons";
import {Spin} from "antd";
import {Entity} from "../../model/entity.model";
import {selectAllData} from "../../utils/select-data.utils";
import {DepartmentType} from "../../model/department-type.model";
import {Speciality} from "../../model/speciality/speciality.model";
import {RcFile} from "antd/es/upload";
import {
    editCurriculum,
    loadCurriculum, selectCurrentCurriculum,
    selectLoadingOnEdit,
    selectUploadStatus,
    setUploadStatus
} from "../../store/curriculum/curriculums.slice";
import {UploadStatus} from "../../model/upload-status.model";
import CurriculumFormComponent from "./curriculum-form.component";

const CurriculumEditFormContainer: FC = () => {
    const dispatch = useDispatch();

    const {id} = useParams<Entity>();

    const [specialities, setSpecialities] = useState<Speciality[]>([]);
    const [mainFile, setMainFile] = useState<RcFile>();

    const curriculum = useSelector(selectCurrentCurriculum);
    const loading = useSelector(selectLoadingOnEdit);
    const uploadStatus = useSelector(selectUploadStatus);

    useEffect(() => {
        dispatch(loadCurriculum(id));
    }, [dispatch, id]);

    useEffect(() => {
        selectAllData<Speciality>(DepartmentType.SPECIALITIES)
            .then(data => setSpecialities(data))
            .catch(error => console.log(error));
    }, [setSpecialities]);

    const handleSubmit = useCallback((data) => {
        dispatch(editCurriculum({
            id: id,
            yearOfEntry: data.yearOfEntry,
            specialityId: data.speciality,
            content: mainFile
        }))
    }, [dispatch, id, mainFile]);

    const handleSetMainFile = useCallback((file: RcFile | undefined) => {
        setMainFile(file);
    }, [])

    const handleCloseShowingUploadStatus = useCallback(() => {
        dispatch(setUploadStatus(UploadStatus.NO_UPLOADING))
    }, [dispatch]);

    return (
        <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>} spinning={loading}>
            {!loading && <CurriculumFormComponent
                onSubmit={handleSubmit}
                current={curriculum}
                specialities={specialities}
                onSetMainFile={handleSetMainFile}
                uploadStatus={uploadStatus}
                onCloseShowingUploadStatus={handleCloseShowingUploadStatus}/>}
        </Spin>
    )
}

export default CurriculumEditFormContainer;