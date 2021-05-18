import React, {FC, useCallback, useEffect, useState} from "react";
import {DepartmentType} from "../../model/department-type.model";
import DataTableComponent from "../entity/entity-table.component";
import {DEFAULT_PAGE_SIZE, FIRST_TABLE_PAGE_INDEX} from "../../utils/constants.utils";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {DatePicker} from "antd";
import moment from "moment";
import {
    deleteFacultyMembers,
    loadCount, loadFacultyMembers,
    selectFacultyMembers,
    selectLoading,
    selectTotalCount
} from "../../store/faculty-member/faculty-members.slice";
import {FacultyMember} from "../../model/faculty-member/faculty-member.model";

const FacultyMembersDataContainer: FC = () => {

    const dispatch = useDispatch();
    const facultyMembers = useSelector(selectFacultyMembers);
    const loading = useSelector(selectLoading);
    const totalCount = useSelector(selectTotalCount);

    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        dispatch(loadCount())
    }, [dispatch]);

    useEffect(() => {
        dispatch(loadFacultyMembers({
            page: FIRST_TABLE_PAGE_INDEX,
            count: DEFAULT_PAGE_SIZE
        }))
    }, [dispatch]);

    const handleChangePagination = useCallback((page: number, count?: number) => {
        dispatch(loadFacultyMembers({
            page: page - 1,
            count: count ? count : DEFAULT_PAGE_SIZE
        }))
        setCurrentPage(page);
    }, [dispatch]);

    const handleDelete = useCallback((selectedRowKeys) => {
        dispatch(deleteFacultyMembers({
            ids: selectedRowKeys,
            page: FIRST_TABLE_PAGE_INDEX,
            count: DEFAULT_PAGE_SIZE
        }));
    }, [dispatch]);

    const handleDisplay = useCallback((entity: FacultyMember) => {
        return {
            fullName: entity.fullName,
            birthDate: <DatePicker value={moment(entity.birthDate)} disabled format="DD/MM/YYYY"/>,
            degree: entity.degree ? entity.degree.abbreviated ?
                <Link to={{pathname: `/${DepartmentType.GROUPS}/${entity.degree.id}`}}>
                    {entity.degree.abbreviated}</Link> : "" : "",
            rank: entity.rank ? entity.rank.abbreviated ?
                <Link to={{pathname: `/${DepartmentType.GROUPS}/${entity.rank.id}`}}>
                    {entity.rank.abbreviated}</Link> : "" : "",
        }
    }, []);

    return (
        <>
            <DataTableComponent<FacultyMember>
                type={DepartmentType.FACULTY_MEMBERS}
                dataSource={facultyMembers}
                onDisplay={handleDisplay}
                columns={[
                    {
                        title: "Full name",
                        dataIndex: "fullName",
                        key: "fullName"
                    },
                    {
                        title: "Birth date",
                        dataIndex: "birthDate",
                        key: "birthDate"
                    },
                    {
                        title: "Degree",
                        dataIndex: "degree",
                        key: "degree"
                    },
                    {
                        title: "Rank",
                        dataIndex: "rank",
                        key: "rank"
                    }
                ]}
                onChangePagination={handleChangePagination}
                currentPage={currentPage}
                totalCount={totalCount}
                defaultPageSize={DEFAULT_PAGE_SIZE}
                onDelete={handleDelete}
                loading={loading}
            />
        </>
    )
}

export default FacultyMembersDataContainer;