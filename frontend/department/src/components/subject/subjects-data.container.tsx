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
import {useTranslation} from "react-i18next";

const SubjectsDataContainer: FC = () => {

    const dispatch = useDispatch();
    const subjects = useSelector(selectSubjects);
    const loading = useSelector(selectLoading);
    const totalCount = useSelector(selectTotalCount);

    const {t} = useTranslation();

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

    const handleDownloadError = useCallback(() => {
        message.error(t("entities.subject.validations.downloadContentError"), 1);
    }, [t]);

    const handleDownloadContent = useCallback((id: string, fileName: string) => {

        downloadDocument(
            `/${DepartmentType.SUBJECTS}/${id}/content`,
            fileName,
            {},
            handleDownloadError
        );
    }, [handleDownloadError]);

    const handleDisplay = useCallback((entity: Subject) => {
        return {
            title: entity.title,
            content: entity.contentExist &&
                <Button type="primary"
                        onClick={() => handleDownloadContent(entity.id, entity.contentName ? entity.contentName : "content.docx")}>
                    {t("entities.subject.fields.content")}
                </Button>
        }
    }, [handleDownloadContent, t]);

    return (
        <>
            <DataTableComponent<Subject>
                type={DepartmentType.SUBJECTS}
                dataSource={subjects}
                onDisplay={handleDisplay}
                columns={[
                    {
                        title: t("entities.subject.fields.title"),
                        dataIndex: "title",
                        key: "title"
                    },
                    {
                        title: t("entities.subject.fields.content"),
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