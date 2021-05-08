package com.bntu.departmentsystem.service.mapper;

import com.bntu.departmentsystem.model.entity.Student;
import com.bntu.departmentsystem.model.excel.ExcelStudent;
import com.bntu.departmentsystem.utils.exception.InvalidUploadFileException;

import java.util.List;

public interface ExcelStudentMapper {
    List<Student> from(List<ExcelStudent> excelStudents) throws InvalidUploadFileException;

    Student from(ExcelStudent excelStudent) throws InvalidUploadFileException;
}
