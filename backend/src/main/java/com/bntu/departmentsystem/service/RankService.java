package com.bntu.departmentsystem.service;

import com.bntu.departmentsystem.model.dto.progressinfo.EditProgressInfoRequest;
import com.bntu.departmentsystem.model.entity.Rank;

import java.util.List;

public interface RankService {
    List<Rank> getAll(Integer page, Integer count);

    List<Rank> getAll();

    Rank getById(Long id);

    void add(EditProgressInfoRequest progressInfoRequest);

    void edit(Long id, EditProgressInfoRequest progressInfoRequest);

    void deleteAll(List<Long> ids);

    List<Rank> findByTitle(String query);

    long count();
}
