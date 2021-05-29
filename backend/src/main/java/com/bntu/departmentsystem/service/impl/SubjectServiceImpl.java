package com.bntu.departmentsystem.service.impl;

import com.bntu.departmentsystem.model.entity.Subject;
import com.bntu.departmentsystem.repository.SubjectRepository;
import com.bntu.departmentsystem.service.SubjectService;
import com.bntu.departmentsystem.service.storage.FileStoreService;
import com.bntu.departmentsystem.utils.exception.InvalidUploadFileException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SubjectServiceImpl implements SubjectService {
    private static final String FILE_PREFIX = "subject";

    private final SubjectRepository subjectRepository;
    private final FileStoreService fileStoreService;

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public List<Subject> getAll(Integer page, Integer count) {
        return subjectRepository.findAll(PageRequest.of(page, count)).getContent();
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public List<Subject> getAll() {
        return subjectRepository.findAll();
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public long count() {
        return subjectRepository.count();
    }

    @Override
    public Subject getById(Long id) {
        return subjectRepository.findById(id).orElse(null);
    }

    @Override
    public void add(MultipartFile content, String title) throws InvalidUploadFileException {
        Subject subject = subjectRepository.save(Subject.builder()
                .title(title)
                .contentName(content.getOriginalFilename())
                .build());
        subject.setContentExist(fileStoreService.uploadFile(formContentName(subject.getId()), content));
        subjectRepository.save(subject);
    }

    @Override
    public void edit(Long id, MultipartFile content, String title) throws InvalidUploadFileException {
        Subject subject = subjectRepository.findById(id).orElse(null);
        if (subject != null) {
            Optional.ofNullable(subject.getTitle()).ifPresent(subject::setTitle);
            if (content != null) {
                subject.setContentExist(fileStoreService.uploadFile(formContentName(subject.getId()), content));
                if (subject.isContentExist()) {
                    subject.setContentName(content.getOriginalFilename());
                }
            }
            subjectRepository.save(subject);
        }
    }

    @Override
    @Transactional
    public void deleteAll(List<Long> ids) {
        ids.forEach(id -> fileStoreService.deleteFile(formContentName(id)));
        subjectRepository.deleteByIdIn(ids);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public List<Subject> findByTitle(String query) {
        return (query != null && !query.isEmpty()) ?
                subjectRepository.findByTitleIsContaining(query) :
                Collections.emptyList();
    }

    @Override
    public ByteArrayOutputStream downloadContent(Long id) {
        return fileStoreService.findFile(formContentName(id));
    }

    private String formContentName(Long id) {
        return FILE_PREFIX + id;
    }
}
