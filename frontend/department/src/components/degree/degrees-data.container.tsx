import React, {FC, useCallback, useEffect} from "react";
import {DepartmentType} from "../../model/department-type.model";
import DataTableComponent from "../entity/entity-table.component";
import {DEFAULT_PAGE_SIZE, FIRST_TABLE_PAGE_INDEX} from "../../utils/constants.utils";
import {useDispatch, useSelector} from "react-redux";
import {deleteDegrees, loadDegrees, selectDegrees, selectLoading} from "../../store/degree/degrees.slice";
import {ProgressInfo} from "../../model/progress-info/progress-info.model";

const DegreesDataContainer: FC = () => {

    const dispatch = useDispatch();
    const degrees = useSelector(selectDegrees);
    const loading = useSelector(selectLoading);

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
        }))
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
                        title: "Title",
                        dataIndex: "title",
                        key: "title"
                    },
                    {
                        title: "Abbreviated",
                        dataIndex: "abbreviated",
                        key: "abbreviated"
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

export default DegreesDataContainer;