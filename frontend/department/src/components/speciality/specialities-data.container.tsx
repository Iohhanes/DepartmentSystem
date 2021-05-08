import React, {FC, useCallback, useEffect} from "react";
import {DepartmentType} from "../../model/department-type.model";
import DataTableComponent from "../entity/entity-table.component";
import {DEFAULT_PAGE_SIZE, FIRST_TABLE_PAGE_INDEX} from "../../utils/constants.utils";
import {useDispatch, useSelector} from "react-redux";
import {
    deleteSpecialities,
    loadSpecialities,
    selectLoading,
    selectSpecialities
} from "../../store/speciality/specialities.slice";
import {Speciality} from "../../model/speciality/speciality.model";

const SpecialitiesDataContainer: FC = () => {

    const dispatch = useDispatch();
    const specialities = useSelector(selectSpecialities);
    const loading = useSelector(selectLoading);

    useEffect(() => {
        dispatch(loadSpecialities({
            page: FIRST_TABLE_PAGE_INDEX,
            count: DEFAULT_PAGE_SIZE
        }))
    }, [dispatch]);

    const handleChangePagination = useCallback((page: number, count?: number) => {
        dispatch(loadSpecialities({
            page: page - 1,
            count: count ? count : DEFAULT_PAGE_SIZE
        }))
    }, [dispatch]);

    const handleDelete = useCallback((selectedRowKeys) => {
        dispatch(deleteSpecialities({
            ids: selectedRowKeys,
            page: FIRST_TABLE_PAGE_INDEX,
            count: DEFAULT_PAGE_SIZE
        }));
    }, [dispatch]);

    const handleDisplay = useCallback((entity: Speciality) => {
        return {
            code: entity.code,
            title: entity.title,
        }
    }, []);

    return (
        <>
            <DataTableComponent<Speciality>
                type={DepartmentType.SPECIALITIES}
                dataSource={specialities}
                onDisplay={handleDisplay}
                columns={[
                    {
                        title: "Code",
                        dataIndex: "code",
                        key: "code"
                    },
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

export default SpecialitiesDataContainer;