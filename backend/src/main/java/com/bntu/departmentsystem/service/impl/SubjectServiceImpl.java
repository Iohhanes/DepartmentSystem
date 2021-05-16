package com.bntu.departmentsystem.service.impl;

import com.bntu.departmentsystem.model.dto.subject.EditSubjectRequest;
import com.bntu.departmentsystem.model.entity.Subject;
import com.bntu.departmentsystem.repository.SubjectRepository;
import com.bntu.departmentsystem.service.SubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SubjectServiceImpl implements SubjectService {
    private final SubjectRepository subjectRepository;

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
    public long count() {
        return subjectRepository.count();
    }

    @Override
    public Subject getById(Long id) {
        return subjectRepository.findById(id).orElse(null);
    }

    @Override
    public void add(EditSubjectRequest subjectRequest) {
        subjectRepository.save(Subject.builder()
                .title(subjectRequest.getTitle())
                .build());
    }

    @Override
    public void edit(Long id, EditSubjectRequest subjectRequest) {
        Subject subject = subjectRepository.findById(id).orElse(null);
        if (subject != null) {
            Optional.ofNullable(subject.getTitle()).ifPresent(subject::setTitle);
            subjectRepository.save(subject);
        }
    }

    @Override
    @Transactional
    public void deleteAll(List<Long> ids) {
        subjectRepository.deleteByIdIn(ids);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public List<Subject> findByTitle(String query) {
        return (query != null && !query.isEmpty()) ?
                subjectRepository.findByTitleIsContaining(query) :
                Collections.emptyList();
    }
}
