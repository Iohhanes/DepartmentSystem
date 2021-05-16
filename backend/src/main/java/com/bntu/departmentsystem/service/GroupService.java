package com.bntu.departmentsystem.service;

import com.bntu.departmentsystem.model.dto.group.EditGroupRequest;
import com.bntu.departmentsystem.model.entity.Group;

import java.util.List;

public interface GroupService {
    List<Group> getAll(Integer page, Integer count);

    List<Group> getAll();

    Group getById(Long id);

    void add(EditGroupRequest groupRequest);

    void edit(Long id, EditGroupRequest groupRequest);

    void deleteAll(List<Long> ids);

    List<Group> findByNumber(String query);

    long count();
}
