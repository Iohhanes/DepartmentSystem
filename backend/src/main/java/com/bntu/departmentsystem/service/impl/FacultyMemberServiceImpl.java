package com.bntu.departmentsystem.service.impl;

import com.bntu.departmentsystem.model.dto.facultymember.EditFacultyMemberRequest;
import com.bntu.departmentsystem.model.entity.FacultyMember;
import com.bntu.departmentsystem.repository.DegreeRepository;
import com.bntu.departmentsystem.repository.FacultyMemberRepository;
import com.bntu.departmentsystem.repository.RankRepository;
import com.bntu.departmentsystem.service.FacultyMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FacultyMemberServiceImpl implements FacultyMemberService {
    private final FacultyMemberRepository facultyMemberRepository;
    private final DegreeRepository degreeRepository;
    private final RankRepository rankRepository;

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public List<FacultyMember> getAll(Integer page, Integer count) {
        return facultyMemberRepository.findAll(PageRequest.of(page, count)).getContent();
    }

    @Override
    public FacultyMember getById(Long id) {
        return facultyMemberRepository.findById(id).orElse(null);
    }

    @Override
    public void add(EditFacultyMemberRequest facultyMemberRequest) {

    }

    @Override
    public void addAll(List<FacultyMember> facultyMembers) {
        facultyMemberRepository.saveAll(facultyMembers);
    }

    @Override
    public void edit(Long id, EditFacultyMemberRequest facultyMemberRequest) {

    }

    @Override
    @Transactional
    public void deleteAll(List<Long> ids) {
        facultyMemberRepository.deleteByIdIn(ids);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public List<FacultyMember> findByFullName(String query) {
        return (query != null && !query.isEmpty()) ?
                facultyMemberRepository.findAllByFullNameIsContaining(query) :
                Collections.emptyList();
    }
}
