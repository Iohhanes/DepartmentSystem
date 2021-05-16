package com.bntu.departmentsystem.service;

import com.bntu.departmentsystem.model.dto.facultymember.EditFacultyMemberRequest;
import com.bntu.departmentsystem.model.dto.facultymember.FacultyMemberReportRequest;
import com.bntu.departmentsystem.model.entity.FacultyMember;
import com.bntu.departmentsystem.utils.exception.InvalidUploadFileException;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.util.List;

public interface FacultyMemberService {
    List<FacultyMember> getAll(Integer page, Integer count);

    FacultyMember getById(Long id);

    void add(EditFacultyMemberRequest facultyMemberRequest);

    void addAll(List<FacultyMember> facultyMembers);

    void edit(Long id, EditFacultyMemberRequest facultyMemberRequest);

    void deleteAll(List<Long> ids);

    List<FacultyMember> findByFullName(String query);

    List<FacultyMember> uploadData(MultipartFile excelFile) throws InvalidUploadFileException;

    ByteArrayOutputStream generateReport(FacultyMemberReportRequest reportRequest);

    long count();
}
