package com.bntu.departmentsystem.service;

import com.bntu.departmentsystem.model.entity.Subject;
import com.bntu.departmentsystem.utils.exception.InvalidUploadFileException;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.util.List;

public interface SubjectService {
    List<Subject> getAll(Integer page, Integer count);

    List<Subject> getAll();

    Subject getById(Long id);

    void add(MultipartFile content, String title) throws InvalidUploadFileException;

    void edit(Long id, MultipartFile content, String title) throws InvalidUploadFileException;

    void deleteAll(List<Long> ids);

    List<Subject> findByTitle(String query);

    ByteArrayOutputStream downloadContent(Long id);

    long count();
}
