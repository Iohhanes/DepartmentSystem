package com.bntu.departmentsystem.service;

import com.bntu.departmentsystem.model.dto.student.EditStudentRequest;
import com.bntu.departmentsystem.model.dto.student.StudentReportRequest;
import com.bntu.departmentsystem.model.entity.Student;
import com.bntu.departmentsystem.utils.exception.InvalidUploadFileException;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;;
import java.util.List;

public interface StudentService {
    List<Student> getAll(Integer page, Integer count);

    Student getById(Long id);

    void add(EditStudentRequest studentRequest);

    void addAll(List<Student> students);

    void edit(Long id, EditStudentRequest studentRequest);

    void deleteAll(List<Long> ids);

    List<Student> findByFullName(String query);

    List<Student> findByGroup(Long groupId);

    List<Student> uploadData(MultipartFile excelFile) throws InvalidUploadFileException;

    ByteArrayOutputStream generateWordReport(StudentReportRequest reportRequest);

    ByteArrayOutputStream generatePdfReport(StudentReportRequest reportRequest);

    long count();
}
