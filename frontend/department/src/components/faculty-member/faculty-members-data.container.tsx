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
import {useTranslation} from "react-i18next";

const FacultyMembersDataContainer: FC = () => {

    const {t} = useTranslation();

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
            degree: entity.degree ? <Link to={{pathname: `/${DepartmentType.DEGREES}/${entity.degree.id}`}}>
                {entity.degree.abbreviated}</Link> : "",
            rank: entity.rank ? <Link to={{pathname: `/${DepartmentType.RANKS}/${entity.rank.id}`}}>
                {entity.rank.abbreviated}</Link> : "",
            rate: entity.workload ? entity.workload.rate : "",
            position: entity.workload ?
                <Link to={{pathname: `/${DepartmentType.POSITIONS}/${entity.workload.position.id}`}}>
                    {entity.workload.position.abbreviated}</Link> : ""
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
                        title: t("entities.person.fields.fullName"),
                        dataIndex: "fullName",
                        key: "fullName"
                    },
                    {
                        title: t("entities.person.fields.birthDate"),
                        dataIndex: "birthDate",
                        key: "birthDate"
                    },
                    {
                        title: t("entities.facultyMember.fields.degree"),
                        dataIndex: "degree",
                        key: "degree"
                    },
                    {
                        title: t("entities.facultyMember.fields.rank"),
                        dataIndex: "rank",
                        key: "rank"
                    },
                    {
                        title: t("entities.facultyMember.fields.rate"),
                        dataIndex: "rate",
                        key: "rate"
                    },
                    {
                        title: t("entities.facultyMember.fields.position"),
                        dataIndex: "position",
                        key: "position"
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