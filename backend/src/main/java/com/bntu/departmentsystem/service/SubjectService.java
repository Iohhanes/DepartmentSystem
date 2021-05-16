package com.bntu.departmentsystem.service;

import com.bntu.departmentsystem.model.dto.subject.EditSubjectRequest;
import com.bntu.departmentsystem.model.entity.Subject;

import java.util.List;

public interface SubjectService {
    List<Subject> getAll(Integer page, Integer count);

    List<Subject> getAll();

    Subject getById(Long id);

    void add(EditSubjectRequest subjectRequest);

    void edit(Long id, EditSubjectRequest subjectRequest);

    void deleteAll(List<Long> ids);

    List<Subject> findByTitle(String query);

    long count();
}
