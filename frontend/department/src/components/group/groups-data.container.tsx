import React, {FC, useCallback, useEffect, useState} from "react";
import {DepartmentType} from "../../model/department-type.model";
import DataTableComponent from "../entity/entity-table.component";
import {DEFAULT_PAGE_SIZE, FIRST_TABLE_PAGE_INDEX} from "../../utils/constants.utils";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {
    deleteGroups,
    loadCount,
    loadGroups,
    selectGroups,
    selectLoading,
    selectTotalCount
} from "../../store/group/groups.slice";
import {Group} from "../../model/group/group.model";
import {useTranslation} from "react-i18next";

const GroupsDataContainer: FC = () => {

    const {t} = useTranslation();

    const dispatch = useDispatch();
    const groups = useSelector(selectGroups);
    const loading = useSelector(selectLoading);
    const totalCount = useSelector(selectTotalCount);

    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        dispatch(loadCount())
    }, [dispatch]);

    useEffect(() => {
        dispatch(loadGroups({
            page: FIRST_TABLE_PAGE_INDEX,
            count: DEFAULT_PAGE_SIZE
        }))
    }, [dispatch]);

    const handleChangePagination = useCallback((page: number, count?: number) => {
        dispatch(loadGroups({
            page: page - 1,
            count: count ? count : DEFAULT_PAGE_SIZE
        }));
        setCurrentPage(page);
    }, [dispatch]);

    const handleDelete = useCallback((selectedRowKeys) => {
        dispatch(deleteGroups({
            ids: selectedRowKeys,
            page: FIRST_TABLE_PAGE_INDEX,
            count: DEFAULT_PAGE_SIZE
        }));
    }, [dispatch]);

    const handleDisplay = useCallback((entity: Group) => {
        return {
            number: entity.number,
            yearOfEntry: entity.yearOfEntry,
            speciality: <Link to={{pathname: `/${DepartmentType.SPECIALITIES}/${entity.speciality.id}`}}>
                {entity.speciality.code}</Link>
        }
    }, []);

    return (
        <>
            <DataTableComponent<Group>
                type={DepartmentType.GROUPS}
                dataSource={groups}
                onDisplay={handleDisplay}
                columns={[
                    {
                        title: t("entities.group.fields.number"),
                        dataIndex: "number",
                        key: "number"
                    },
                    {
                        title: t("entities.group.fields.yearOfEntry"),
                        dataIndex: "yearOfEntry",
                        key: "yearOfEntry"
                    },
                    {
                        title: t("entities.group.fields.speciality"),
                        dataIndex: "speciality",
                        key: "speciality"
                    },
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

export default GroupsDataContainer;