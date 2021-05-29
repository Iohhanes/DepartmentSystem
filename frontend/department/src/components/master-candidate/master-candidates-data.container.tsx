import React, {FC, useCallback, useEffect, useState} from "react";
import {DepartmentType} from "../../model/department-type.model";
import DataTableComponent from "../entity/entity-table.component";
import {DEFAULT_PAGE_SIZE, FIRST_TABLE_PAGE_INDEX} from "../../utils/constants.utils";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {DatePicker} from "antd";
import moment from "moment";
import {
    deleteMasterCandidates,
    loadCount, loadMasterCandidates,
    selectLoading,
    selectMasterCandidates, selectTotalCount
} from "../../store/master-candidate/master-candidates.slice";
import {PGStudent} from "../../model/pg-student/pg-student.model";
import {useTranslation} from "react-i18next";

const MasterCandidatesDataContainer: FC = () => {

    const {t} = useTranslation();

    const dispatch = useDispatch();
    const masterCandidates = useSelector(selectMasterCandidates);
    const loading = useSelector(selectLoading);
    const totalCount = useSelector(selectTotalCount);

    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        dispatch(loadCount())
    }, [dispatch]);

    useEffect(() => {
        dispatch(loadMasterCandidates({
            page: FIRST_TABLE_PAGE_INDEX,
            count: DEFAULT_PAGE_SIZE
        }))
    }, [dispatch]);

    const handleChangePagination = useCallback((page: number, count?: number) => {
        dispatch(loadMasterCandidates({
            page: page - 1,
            count: count ? count : DEFAULT_PAGE_SIZE
        }))
        setCurrentPage(page);
    }, [dispatch]);

    const handleDelete = useCallback((selectedRowKeys) => {
        dispatch(deleteMasterCandidates({
            ids: selectedRowKeys,
            page: FIRST_TABLE_PAGE_INDEX,
            count: DEFAULT_PAGE_SIZE
        }));
    }, [dispatch]);

    const handleDisplay = useCallback((entity: PGStudent) => {
        return {
            fullName: entity.fullName,
            birthDate: <DatePicker value={moment(entity.birthDate)} disabled format="DD/MM/YYYY"/>,
            startDate: entity.startDate ?
                <DatePicker value={moment(entity.startDate)} disabled format="DD/MM/YYYY"/> : "",
            endDate: entity.endDate ? <DatePicker value={moment(entity.endDate)} disabled format="DD/MM/YYYY"/> : "",
            facultyMember: entity.facultyMember ?
                <Link to={{pathname: `/${DepartmentType.FACULTY_MEMBERS}/${entity.facultyMember.id}`}}>
                    {entity.facultyMember.fullName}</Link> : ""
        }
    }, []);

    return (
        <>
            <DataTableComponent<PGStudent>
                type={DepartmentType.MASTER_CANDIDATES}
                dataSource={masterCandidates}
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
                        title: t("entities.pgStudent.fields.startDate"),
                        dataIndex: "startDate",
                        key: "startDate"
                    },
                    {
                        title: t("entities.pgStudent.fields.endDate"),
                        dataIndex: "endDate",
                        key: "endDate"
                    },
                    {
                        title: t("entities.pgStudent.fields.facultyMember"),
                        dataIndex: "facultyMember",
                        key: "facultyMember"
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

export default MasterCandidatesDataContainer;