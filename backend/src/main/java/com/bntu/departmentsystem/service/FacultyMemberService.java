package com.bntu.departmentsystem.service;

import com.bntu.departmentsystem.model.dto.facultymember.EditFacultyMemberRequest;
import com.bntu.departmentsystem.model.entity.FacultyMember;

import java.util.List;

public interface FacultyMemberService {
    List<FacultyMember> getAll(Integer page, Integer count);

    FacultyMember getById(Long id);

    void add(EditFacultyMemberRequest facultyMemberRequest);

    void addAll(List<FacultyMember> facultyMembers);

    void edit(Long id, EditFacultyMemberRequest facultyMemberRequest);

    void deleteAll(List<Long> ids);

    List<FacultyMember> findByFullName(String query);
}
