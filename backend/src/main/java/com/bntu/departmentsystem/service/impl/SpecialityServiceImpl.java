package com.bntu.departmentsystem.service.impl;

import com.bntu.departmentsystem.model.dto.speciality.EditSpecialityRequest;
import com.bntu.departmentsystem.model.entity.Speciality;
import com.bntu.departmentsystem.repository.SpecialityRepository;
import com.bntu.departmentsystem.service.SpecialityService;
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
public class SpecialityServiceImpl implements SpecialityService {
    private final SpecialityRepository specialityRepository;

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public List<Speciality> getAll(Integer page, Integer count) {
        return specialityRepository.findAll(PageRequest.of(page, count)).getContent();
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public List<Speciality> getAll() {
        return specialityRepository.findAll();
    }

    @Override
    public long count() {
        return specialityRepository.count();
    }

    @Override
    public Speciality getById(Long id) {
        return specialityRepository.findById(id).orElse(null);
    }

    @Override
    public void add(EditSpecialityRequest specialityRequest) {
        specialityRepository.save(Speciality.builder()
                .title(specialityRequest.getTitle())
                .code(specialityRequest.getCode())
                .build());
    }

    @Override
    public void edit(Long id, EditSpecialityRequest specialityRequest) {
        Speciality speciality = specialityRepository.findById(id).orElse(null);
        if (speciality != null) {
            Optional.ofNullable(specialityRequest.getCode()).ifPresent(speciality::setCode);
            Optional.ofNullable(specialityRequest.getTitle()).ifPresent(speciality::setTitle);
            specialityRepository.save(speciality);
        }
    }

    @Override
    @Transactional
    public void deleteAll(List<Long> ids) {
        specialityRepository.deleteByIdIn(ids);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public List<Speciality> findByCode(String query) {
        return (query != null && !query.isEmpty()) ?
                specialityRepository.findByCodeIsContaining(query) :
                Collections.emptyList();
    }
}
