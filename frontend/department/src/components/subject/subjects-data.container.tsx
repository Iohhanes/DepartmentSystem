import React, {FC, useCallback, useEffect} from "react";
import {DepartmentType} from "../../model/department-type.model";
import DataTableComponent from "../entity/entity-table.component";
import {DEFAULT_PAGE_SIZE, FIRST_TABLE_PAGE_INDEX} from "../../utils/constants.utils";
import {useDispatch, useSelector} from "react-redux";
import {deleteSubjects, loadSubjects, selectLoading, selectSubjects} from "../../store/subject/subjects.slice";
import {Subject} from "../../model/subject/subject.model";

const SubjectsDataContainer: FC = () => {

    const dispatch = useDispatch();
    const subjects = useSelector(selectSubjects);
    const loading = useSelector(selectLoading);

    useEffect(() => {
        dispatch(loadSubjects({
            page: FIRST_TABLE_PAGE_INDEX,
            count: DEFAULT_PAGE_SIZE
        }))
    }, [dispatch]);

    const handleChangePagination = useCallback((page: number, count?: number) => {
        dispatch(loadSubjects({
            page: page - 1,
            count: count ? count : DEFAULT_PAGE_SIZE
        }))
    }, [dispatch]);

    const handleDelete = useCallback((selectedRowKeys) => {
        dispatch(deleteSubjects({
            ids: selectedRowKeys,
            page: FIRST_TABLE_PAGE_INDEX,
            count: DEFAULT_PAGE_SIZE
        }));
    }, [dispatch]);

    const handleDisplay = useCallback((entity: Subject) => {
        return {
            title: entity.title,
        }
    }, []);

    return (
        <>
            <DataTableComponent<Subject>
                type={DepartmentType.SUBJECTS}
                dataSource={subjects}
                onDisplay={handleDisplay}
                columns={[
                    {
                        title: "Title",
                        dataIndex: "title",
                        key: "title"
                    }
                ]}
                onChangePagination={handleChangePagination}
                defaultPageSize={DEFAULT_PAGE_SIZE}
                onDelete={handleDelete}
                loading={loading}
            />
        </>
    )
}

export default SubjectsDataContainer;