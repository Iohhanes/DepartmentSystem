package com.bntu.departmentsystem.service.impl;

import com.bntu.departmentsystem.model.entity.*;
import com.bntu.departmentsystem.repository.CurriculumRepository;
import com.bntu.departmentsystem.repository.SpecialityRepository;
import com.bntu.departmentsystem.service.CurriculumService;
import com.bntu.departmentsystem.service.storage.FileStoreService;
import com.bntu.departmentsystem.utils.FileNameUtils;
import com.bntu.departmentsystem.utils.exception.InvalidUploadFileException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.util.*;

@Service
@RequiredArgsConstructor
@Log4j2
public class CurriculumServiceImpl implements CurriculumService {
    private static final String FILE_PREFIX = "curriculum";

    private final CurriculumRepository curriculumRepository;
    private final SpecialityRepository specialityRepository;
    private final FileStoreService fileStoreService;

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public List<Curriculum> getAll(Integer page, Integer count) {
        return curriculumRepository.findAll(PageRequest.of(page, count)).getContent();
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public long count() {
        return curriculumRepository.count();
    }

    @Override
    public Curriculum getById(Long id) {
        return curriculumRepository.findById(id).orElse(null);
    }

    @Override
    public void add(Integer yearOfEntry, Long specialityId, MultipartFile content) throws InvalidUploadFileException {
        Curriculum curriculum = curriculumRepository.save(Curriculum.builder()
                .yearOfEntry(yearOfEntry)
                .speciality(specialityId != null ?
                        specialityRepository.findById(specialityId).orElse(null) : null)
                .build());
        curriculum.setContentExist(fileStoreService.uploadFile(formContentName(curriculum), content));
        curriculumRepository.save(curriculum);
    }

    @Override
    public void edit(Long id, Integer yearOfEntry, Long specialityId, MultipartFile content) throws InvalidUploadFileException {
        Curriculum curriculum = curriculumRepository.findById(id).orElse(null);
        if (curriculum != null) {
            Optional.ofNullable(yearOfEntry).ifPresent(curriculum::setYearOfEntry);
            Optional.ofNullable(specialityId).ifPresent(speciality -> curriculum
                    .setSpeciality(specialityRepository.findById(speciality).orElse(null)));
            if (content != null) {
                curriculum.setContentName(content.getOriginalFilename());
                curriculum.setContentExist(fileStoreService.uploadFile(formContentName(curriculum, content.getOriginalFilename()), content));
            }
            curriculumRepository.save(curriculum);
        }
    }

    @Override
    @Transactional
    public void deleteAll(List<Long> ids) {
        ids.forEach(id -> fileStoreService.deleteFile(formContentName(id)));
        curriculumRepository.deleteByIdIn(ids);
    }

    @Override
    public ByteArrayOutputStream downloadContent(Long id) {
        return fileStoreService.findFile(formContentName(id));
    }

    private String formContentName(Curriculum curriculum) {
        return formContentName(curriculum, curriculum.getContentName());
    }

    private String formContentName(Long id) {
        Curriculum curriculum = id == null ? null : curriculumRepository.findById(id).orElse(null);
        return formContentName(curriculum);
    }

    private String formContentName(Curriculum curriculum, String contentName) {
        if (curriculum != null) {
            return FILE_PREFIX + curriculum.getId() + FileNameUtils.getExtensionByFileName(contentName);
        }
        return null;
    }
}
