package com.bntu.departmentsystem.service.impl;

import com.bntu.departmentsystem.model.dto.progressinfo.EditProgressInfoRequest;
import com.bntu.departmentsystem.model.entity.Degree;
import com.bntu.departmentsystem.repository.DegreeRepository;
import com.bntu.departmentsystem.service.DegreeService;
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
public class DegreeServiceImpl implements DegreeService {
    private final DegreeRepository degreeRepository;

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public List<Degree> getAll(Integer page, Integer count) {
        return degreeRepository.findAll(PageRequest.of(page, count)).getContent();
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public List<Degree> getAll() {
        return degreeRepository.findAll();
    }

    @Override
    public Degree getById(Long id) {
        return degreeRepository.findById(id).orElse(null);
    }

    @Override
    public void add(EditProgressInfoRequest progressInfoRequest) {
        degreeRepository.save(Degree.builder()
                .title(progressInfoRequest.getTitle())
                .abbreviated(progressInfoRequest.getAbbreviated())
                .build());
    }

    @Override
    public void edit(Long id, EditProgressInfoRequest progressInfoRequest) {
        Degree degree = degreeRepository.findById(id).orElse(null);
        if (degree != null) {
            Optional.ofNullable(progressInfoRequest.getTitle()).ifPresent(degree::setTitle);
            Optional.ofNullable(progressInfoRequest.getAbbreviated()).ifPresent(degree::setAbbreviated);
            degreeRepository.save(degree);
        }
    }

    @Override
    @Transactional
    public void deleteAll(List<Long> ids) {
        degreeRepository.deleteByIdIn(ids);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public List<Degree> findByTitle(String query) {
        return (query != null && !query.isEmpty()) ?
                degreeRepository.findByTitleIsContaining(query) :
                Collections.emptyList();
    }
}
