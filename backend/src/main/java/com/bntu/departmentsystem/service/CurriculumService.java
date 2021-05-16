package com.bntu.departmentsystem.service;

import com.bntu.departmentsystem.model.entity.Curriculum;
import com.bntu.departmentsystem.utils.exception.InvalidUploadFileException;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.util.List;

public interface CurriculumService {
    List<Curriculum> getAll(Integer page, Integer count);

    Curriculum getById(Long id);

    void add(Integer yearOfEntry, Long specialityId, MultipartFile content) throws InvalidUploadFileException;

    void edit(Long id, Integer yearOfEntry, Long specialityId, MultipartFile content) throws InvalidUploadFileException;

    ByteArrayOutputStream downloadContent(Long id);

    void deleteAll(List<Long> ids);

    long count();
}
