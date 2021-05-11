package com.bntu.departmentsystem.service.impl;

import com.bntu.departmentsystem.model.entity.Curriculum;
import com.bntu.departmentsystem.model.entity.CurriculumContent;
import com.bntu.departmentsystem.repository.CurriculumContentRepository;
import com.bntu.departmentsystem.service.CurriculumContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CurriculumContentServiceImpl implements CurriculumContentService {
    private final CurriculumContentRepository curriculumContentRepository;

    @Override
    public List<CurriculumContent> getAllByCurriculum(Curriculum curriculum) {
        return curriculum != null ? curriculumContentRepository.findByCurriculum(curriculum) : Collections.emptyList();
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public void addAll(List<CurriculumContent> curriculumContents) {
        if (!CollectionUtils.isEmpty(curriculumContents)) {
            curriculumContentRepository.saveAll(curriculumContents);
        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public void deleteAll(Curriculum curriculum) {
        List<Long> ids = curriculumContentRepository.findByCurriculum(curriculum)
                .stream()
                .map(CurriculumContent::getId)
                .collect(Collectors.toList());
        curriculumContentRepository.deleteByIdIn(ids);
    }
}
