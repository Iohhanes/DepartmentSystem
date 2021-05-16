package com.bntu.departmentsystem.service;

import com.bntu.departmentsystem.model.dto.pgstudent.EditPGStudentRequest;
import com.bntu.departmentsystem.model.dto.pgstudent.PGStudentReportRequest;
import com.bntu.departmentsystem.model.entity.PGStudent;
import com.bntu.departmentsystem.utils.exception.InvalidUploadFileException;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.util.List;

public interface PGStudentService {
    List<PGStudent> getAll(Integer page, Integer count, boolean master);

    PGStudent getById(Long id, boolean master);

    void add(EditPGStudentRequest pgStudentRequest);

    void addAll(List<PGStudent> students);

    void edit(Long id, EditPGStudentRequest pgStudentRequest);

    void deleteAll(List<Long> ids);

    List<PGStudent> findByFullName(String query, boolean master);

    List<PGStudent> findByFacultyMember(Long facultyMemberId, boolean master);

    List<PGStudent> uploadData(MultipartFile excelFile) throws InvalidUploadFileException;

    ByteArrayOutputStream generateReport(PGStudentReportRequest reportRequest, boolean master);

    long count(boolean master);
}
