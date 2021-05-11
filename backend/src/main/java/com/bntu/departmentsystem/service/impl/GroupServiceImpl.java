package com.bntu.departmentsystem.service.impl;

import com.bntu.departmentsystem.model.dto.group.EditGroupRequest;
import com.bntu.departmentsystem.model.entity.Group;
import com.bntu.departmentsystem.repository.GroupRepository;
import com.bntu.departmentsystem.repository.SpecialityRepository;
import com.bntu.departmentsystem.service.GroupService;
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
public class GroupServiceImpl implements GroupService {
    private final GroupRepository groupRepository;
    private final SpecialityRepository specialityRepository;

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public List<Group> getAll(Integer page, Integer count) {
        return groupRepository.findAll(PageRequest.of(page, count)).getContent();
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public List<Group> getAll() {
        return groupRepository.findAll();
    }

    @Override
    public Group getById(Long id) {
        return groupRepository.findById(id).orElse(null);
    }

    @Override
    public void add(EditGroupRequest groupRequest) {
        groupRepository.save(Group.builder()
                .number(groupRequest.getNumber())
                .yearOfEntry(groupRequest.getYearOfEntry())
                .speciality(groupRequest.getSpecialityId() != null ?
                        specialityRepository.findById(groupRequest.getSpecialityId()).orElse(null) : null)
                .build());
    }

    @Override
    public void edit(Long id, EditGroupRequest groupRequest) {
        Group group = groupRepository.findById(id).orElse(null);
        if (group != null) {
            Optional.ofNullable(groupRequest.getNumber()).ifPresent(group::setNumber);
            Optional.ofNullable(groupRequest.getYearOfEntry()).ifPresent(group::setYearOfEntry);
            Optional.ofNullable(groupRequest.getSpecialityId()).ifPresent(specialityId -> group
                    .setSpeciality(specialityRepository.findById(specialityId).orElse(null)));
            groupRepository.save(group);
        }

    }

    @Override
    @Transactional
    public void deleteAll(List<Long> ids) {
        groupRepository.deleteByIdIn(ids);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public List<Group> findByNumber(String query) {
        return (query != null && !query.isEmpty()) ?
                groupRepository.findByNumberIsContaining(query) :
                Collections.emptyList();
    }
}
