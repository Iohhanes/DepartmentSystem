import React, {FC, useCallback, useEffect, useState} from "react";
import {DepartmentType} from "../../model/department-type.model";
import DataTableComponent from "../entity/entity-table.component";
import {DEFAULT_PAGE_SIZE, FIRST_TABLE_PAGE_INDEX} from "../../utils/constants.utils";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {
    deleteCurriculums,
    loadCount,
    loadCurriculums,
    selectCurriculums,
    selectLoading,
    selectTotalCount
} from "../../store/curriculum/curriculums.slice";
import {Curriculum} from "../../model/curriculum/curriculum.model";
import {Button, message} from "antd";
import {downloadDocument} from "../../utils/report.utils";

const CurriculumsDataContainer: FC = () => {

    const dispatch = useDispatch();
    const curriculums = useSelector(selectCurriculums);
    const loading = useSelector(selectLoading);
    const totalCount = useSelector(selectTotalCount);

    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        dispatch(loadCount())
    }, [dispatch]);

    useEffect(() => {
        dispatch(loadCurriculums({
            page: FIRST_TABLE_PAGE_INDEX,
            count: DEFAULT_PAGE_SIZE
        }))
    }, [dispatch]);

    const handleChangePagination = useCallback((page: number, count?: number) => {
        dispatch(loadCurriculums({
            page: page - 1,
            count: count ? count : DEFAULT_PAGE_SIZE
        }));
        setCurrentPage(page);
    }, [dispatch]);

    const handleDelete = useCallback((selectedRowKeys) => {
        dispatch(deleteCurriculums({
            ids: selectedRowKeys,
            page: FIRST_TABLE_PAGE_INDEX,
            count: DEFAULT_PAGE_SIZE
        }));
    }, [dispatch]);

    const handleDownloadError = () => {
        message.error("Content download error", 1);
    }

    const handleDownloadContent = useCallback((id: string) => {

        downloadDocument(
            `/${DepartmentType.CURRICULUMS}/${id}/content`,
            "content.docx",
            {},
            handleDownloadError
        );
    }, []);

    const handleDisplay = useCallback((entity: Curriculum) => {
        return {
            yearOfEntry: entity.yearOfEntry,
            speciality: <Link to={{pathname: `/${DepartmentType.SPECIALITIES}/${entity.speciality.id}`}}>
                {entity.speciality.code}</Link>,
            content: entity.hasContent && <Button type="primary" onClick={() => handleDownloadContent(entity.id)}>
                Content
            </Button>
        }
    }, [handleDownloadContent]);

    return (
        <>
            <DataTableComponent<Curriculum>
                type={DepartmentType.CURRICULUMS}
                dataSource={curriculums}
                onDisplay={handleDisplay}
                columns={[
                    {
                        title: "Year of entry",
                        dataIndex: "yearOfEntry",
                        key: "yearOfEntry"
                    },
                    {
                        title: "Speciality",
                        dataIndex: "speciality",
                        key: "speciality"
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

export default CurriculumsDataContainer;