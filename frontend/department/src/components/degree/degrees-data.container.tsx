import React, {FC, useCallback, useEffect, useState} from "react";
import {DepartmentType} from "../../model/department-type.model";
import DataTableComponent from "../entity/entity-table.component";
import {DEFAULT_PAGE_SIZE, FIRST_TABLE_PAGE_INDEX} from "../../utils/constants.utils";
import {useDispatch, useSelector} from "react-redux";
import {
    deleteDegrees,
    loadCount,
    loadDegrees,
    selectDegrees,
    selectLoading,
    selectTotalCount
} from "../../store/degree/degrees.slice";
import {ProgressInfo} from "../../model/progress-info/progress-info.model";
import {useTranslation} from "react-i18next";

const DegreesDataContainer: FC = () => {

    const {t} = useTranslation();

    const dispatch = useDispatch();
    const degrees = useSelector(selectDegrees);
    const loading = useSelector(selectLoading);
    const totalCount = useSelector(selectTotalCount);

    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        dispatch(loadCount())
    }, [dispatch]);

    useEffect(() => {
        dispatch(loadDegrees({
            page: FIRST_TABLE_PAGE_INDEX,
            count: DEFAULT_PAGE_SIZE
        }))
    }, [dispatch]);

    const handleChangePagination = useCallback((page: number, count?: number) => {
        dispatch(loadDegrees({
            page: page - 1,
            count: count ? count : DEFAULT_PAGE_SIZE
        }));
        setCurrentPage(page);
    }, [dispatch]);

    const handleDelete = useCallback((selectedRowKeys) => {
        dispatch(deleteDegrees({
            ids: selectedRowKeys,
            page: FIRST_TABLE_PAGE_INDEX,
            count: DEFAULT_PAGE_SIZE
        }));
    }, [dispatch]);

    const handleDisplay = useCallback((entity: ProgressInfo) => {
        return {
            title: entity.title,
            abbreviated: entity.abbreviated
        }
    }, []);

    return (
        <>
            <DataTableComponent<ProgressInfo>
                type={DepartmentType.DEGREES}
                dataSource={degrees}
                onDisplay={handleDisplay}
                columns={[
                    {
                        title: t("entities.progressInfo.fields.title"),
                        dataIndex: "title",
                        key: "title"
                    },
                    {
                        title: t("entities.progressInfo.fields.abbreviated"),
                        dataIndex: "abbreviated",
                        key: "abbreviated"
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

export default DegreesDataContainer;