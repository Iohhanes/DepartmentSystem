import React, {FC, useCallback, useEffect} from "react";
import {DepartmentType} from "../../model/department-type.model";
import {Student} from "../../model/student/student.model";
import DataTableComponent from "../entity/entity-table.component";
import {DEFAULT_PAGE_SIZE, FIRST_TABLE_PAGE_INDEX} from "../../utils/constants.utils";
import {useDispatch, useSelector} from "react-redux";
import {
    deleteStudents,
    loadStudents,
    selectLoading,
    selectStudents,
} from "../../store/student/students.slice";
import {Link} from "react-router-dom";
import {DatePicker} from "antd";
import moment from "moment";

const StudentsDataContainer: FC = () => {

    const dispatch = useDispatch();
    const students = useSelector(selectStudents);
    const loading = useSelector(selectLoading);

    useEffect(() => {
        dispatch(loadStudents({
            page: FIRST_TABLE_PAGE_INDEX,
            count: DEFAULT_PAGE_SIZE
        }))
    }, [dispatch]);

    const handleChangePagination = useCallback((page: number, count?: number) => {
        dispatch(loadStudents({
            page: page - 1,
            count: count ? count : DEFAULT_PAGE_SIZE
        }))
    }, [dispatch]);

    const handleDelete = useCallback((selectedRowKeys) => {
        dispatch(deleteStudents({
            ids: selectedRowKeys,
            page: FIRST_TABLE_PAGE_INDEX,
            count: DEFAULT_PAGE_SIZE
        }));
    }, [dispatch]);

    const handleDisplay = useCallback((entity: Student) => {
        return {
            fullName: entity.fullName,
            birthDate: <DatePicker value={moment(entity.birthDate)} disabled format="DD/MM/YYYY"/>,
            group: <Link to={{pathname: `/${DepartmentType.GROUPS}/${entity.group.id}`}}>
                {entity.group.number}</Link>
        }
    }, []);

    return (
        <>
            <DataTableComponent<Student>
                type={DepartmentType.STUDENTS}
                dataSource={students}
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
                        title: "Group",
                        dataIndex: "group",
                        key: "group"
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

export default StudentsDataContainer;