package com.bntu.departmentsystem.service;

import com.bntu.departmentsystem.model.dto.progressinfo.EditProgressInfoRequest;
import com.bntu.departmentsystem.model.entity.Position;

import java.util.List;

public interface PositionService {
    List<Position> getAll(Integer page, Integer count);

    List<Position> getAll();

    Position getById(Long id);

    void add(EditProgressInfoRequest progressInfoRequest);

    void edit(Long id, EditProgressInfoRequest progressInfoRequest);

    void deleteAll(List<Long> ids);

    List<Position> findByTitle(String query);
}
