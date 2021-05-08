package com.bntu.departmentsystem.service;

import com.bntu.departmentsystem.model.dto.progressinfo.EditProgressInfoRequest;
import com.bntu.departmentsystem.model.entity.Degree;

import java.util.List;

public interface DegreeService {
    List<Degree> getAll(Integer page, Integer count);

    List<Degree> getAll();

    Degree getById(Long id);

    void add(EditProgressInfoRequest progressInfoRequest);

    void edit(Long id, EditProgressInfoRequest progressInfoRequest);

    void deleteAll(List<Long> ids);

    List<Degree> findByTitle(String query);
}
