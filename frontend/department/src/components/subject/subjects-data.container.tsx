import React, {FC, useCallback, useEffect, useState} from "react";
import {DepartmentType} from "../../model/department-type.model";
import DataTableComponent from "../entity/entity-table.component";
import {DEFAULT_PAGE_SIZE, FIRST_TABLE_PAGE_INDEX} from "../../utils/constants.utils";
import {useDispatch, useSelector} from "react-redux";
import {
    deleteSubjects, loadCount,
    loadSubjects,
    selectLoading,
    selectSubjects,
    selectTotalCount
} from "../../store/subject/subjects.slice";
import {Subject} from "../../model/subject/subject.model";
import {Button, message} from "antd";
import {downloadDocument} from "../../utils/report.utils";

const SubjectsDataContainer: FC = () => {

    const dispatch = useDispatch();
    const subjects = useSelector(selectSubjects);
    const loading = useSelector(selectLoading);
    const totalCount = useSelector(selectTotalCount);

    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        dispatch(loadCount())
    }, [dispatch]);

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
        }));
        setCurrentPage(page);
    }, [dispatch]);

    const handleDelete = useCallback((selectedRowKeys) => {
        dispatch(deleteSubjects({
            ids: selectedRowKeys,
            page: FIRST_TABLE_PAGE_INDEX,
            count: DEFAULT_PAGE_SIZE
        }));
    }, [dispatch]);

    const handleDownloadError = () => {
        message.error("Content download error", 1);
    }

    const handleDownloadContent = useCallback((id: string, fileName: string) => {

        downloadDocument(
            `/${DepartmentType.SUBJECTS}/${id}/content`,
            fileName,
            {},
            handleDownloadError
        );
    }, []);

    const handleDisplay = useCallback((entity: Subject) => {
        return {
            title: entity.title,
            content: entity.contentExist &&
                <Button type="primary"
                        onClick={() => handleDownloadContent(entity.id, entity.contentName ? entity.contentName : "content.docx")}>
                    Content
                </Button>
        }
    }, [handleDownloadContent]);

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
                    },
                    {
                        title: "Content",
                        dataIndex: "content",
                        key: "content"
                    }
                ]}
                onChangePagination={handleChangePagination}
                defaultPageSize={DEFAULT_PAGE_SIZE}
                currentPage={currentPage}
                totalCount={totalCount}
                onDelete={handleDelete}
                loading={loading}
            />
        </>
    )
}

export default SubjectsDataContainer;