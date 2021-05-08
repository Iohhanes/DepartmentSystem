import React, {FC, useCallback, useEffect} from "react";
import {DepartmentType} from "../../model/department-type.model";
import DataTableComponent from "../entity/entity-table.component";
import {DEFAULT_PAGE_SIZE, FIRST_TABLE_PAGE_INDEX} from "../../utils/constants.utils";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {deleteGroups, loadGroups, selectGroups, selectLoading} from "../../store/group/groups.slice";
import {Group} from "../../model/group/group.model";

const GroupsDataContainer: FC = () => {

    const dispatch = useDispatch();
    const groups = useSelector(selectGroups);
    const loading = useSelector(selectLoading);

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
        }))
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
                        title: "Number",
                        dataIndex: "number",
                        key: "number"
                    },
                    {
                        title: "Year of entry",
                        dataIndex: "yearOfEntry",
                        key: "yearOfEntry"
                    },
                    {
                        title: "Speciality",
                        dataIndex: "speciality",
                        key: "speciality"
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

export default GroupsDataContainer;